import { NextResponse } from 'next/server';
import { EXTRAS, FREQUENCY, money, type ExtraId, type Frequency } from '@/lib/pricing';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

interface BookingPayload {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  town?: string;
  postcode?: string;
  access?: string;
  notes?: string;
  windows?: number;
  storeys?: string;
  frequency?: Frequency;
  extras?: Partial<Record<ExtraId, number>>;
  addons?: string[];
  startDate?: string;
  timeSlot?: string;
  perClean?: number;
  firstClean?: number;
}

/** Very small in-memory throttle. Enough to stop a bot hammering the form. */
const hits = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  rec.count += 1;
  return rec.count > 6;
}

function esc(v: unknown) {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Please ring us on ' + site.phone }, { status: 429 });
  }

  let body: BookingPayload;
  try {
    body = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ error: 'Could not read that booking.' }, { status: 400 });
  }

  const missing = (['name', 'phone', 'address', 'postcode'] as const).filter(
    (k) => !String(body[k] ?? '').trim(),
  );
  if (missing.length) {
    return NextResponse.json({ error: `Please fill in: ${missing.join(', ')}.` }, { status: 400 });
  }

  const extraLines = EXTRAS.filter((e) => body.extras?.[e.id])
    .map((e) => `${e.label}${(body.extras?.[e.id] ?? 0) > 1 ? ` x${body.extras?.[e.id]}` : ''}`);

  const freq = body.frequency && FREQUENCY[body.frequency] ? FREQUENCY[body.frequency].label : String(body.frequency);

  const rows: [string, string][] = [
    ['Name', String(body.name)],
    ['Phone', String(body.phone)],
    ['Email', String(body.email || 'Not given')],
    ['Address', `${body.address}, ${body.town || ''} ${body.postcode}`.replace(/\s+/g, ' ').trim()],
    ['Windows', `${body.windows} (${body.storeys} storey)`],
    ['Extras', extraLines.length ? extraLines.join(', ') : 'None'],
    ['Frequency', freq],
    ['Quoted price', body.perClean != null ? `${money(body.perClean)} per clean` : 'Not given'],
    ['First clean', body.firstClean != null ? money(body.firstClean) : 'Not given'],
    ['Preferred start', `${body.startDate} (${body.timeSlot})`],
    ['Rear access', String(body.access || 'Not given')],
    ['Also wants quoting', body.addons?.length ? body.addons.join(', ') : 'None'],
    ['Notes', String(body.notes || 'None')],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#173154">
      <h2 style="margin:0 0 4px">New booking request</h2>
      <p style="margin:0 0 18px;color:#5b6b85">${esc(body.postcode)} · ${esc(freq)} · ${
        body.perClean != null ? esc(money(body.perClean)) : ''
      } per clean</p>
      <table style="border-collapse:collapse;font-size:15px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 16px 6px 0;color:#5b6b85;vertical-align:top;white-space:nowrap">${esc(
                k,
              )}</td><td style="padding:6px 0;font-weight:600">${esc(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="margin-top:20px">
        <a href="tel:${esc(String(body.phone).replace(/\s/g, ''))}">Call ${esc(body.name)}</a>
      </p>
    </div>`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKINGS_TO || site.email;
  const from = process.env.BOOKINGS_FROM || 'Proper Window Cleaners <bookings@properwindowcleaners.co.uk>';

  if (!apiKey) {
    // Nothing configured yet, so be honest so the form shows the WhatsApp/email fallback
    // rather than pretending the booking landed somewhere.
    console.warn('[book] RESEND_API_KEY not set. Booking not delivered:\n' + text);
    return NextResponse.json(
      { error: 'Online booking is not switched on yet. Send it straight to us instead.' },
      { status: 503 },
    );
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: body.email ? [String(body.email)] : undefined,
        subject: `Booking: ${body.postcode}, ${freq}, ${body.perClean != null ? money(body.perClean) : ''}`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error('[book] Resend error', res.status, detail);
      return NextResponse.json({ error: 'We could not send that just now.' }, { status: 502 });
    }
  } catch (err) {
    console.error('[book] send failed', err);
    return NextResponse.json({ error: 'We could not send that just now.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

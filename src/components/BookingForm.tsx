'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  ADDON_SERVICES,
  CALL_OUT,
  EXTRAS,
  FREQUENCY,
  FREQUENCY_ORDER,
  INCLUDED,
  MINIMUM_CHARGE,
  money,
  quote,
  type ExtraId,
  type Frequency,
  type Storeys,
} from '@/lib/pricing';
import { site } from '@/lib/site';
import { areasAlphabetical } from '@/lib/areas';
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from './Icons';

const STOREY_OPTIONS: { value: Storeys; label: string; hint: string }[] = [
  { value: 'single', label: 'Single storey', hint: 'Bungalow, flat or dormer' },
  { value: 'double', label: 'Two storey', hint: 'Terrace, semi or detached' },
  { value: 'triple', label: 'Three storey', hint: 'Townhouse or converted loft' },
];

const TIME_SLOTS = [
  { value: 'morning', label: 'Morning', hint: '7:30am – 12pm' },
  { value: 'afternoon', label: 'Afternoon', hint: '12pm – 6pm' },
  { value: 'any', label: 'Any time', hint: 'Whatever suits the round' },
];

function isoToday(offsetDays = 2) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function BookingForm() {
  const params = useSearchParams();

  const [windows, setWindows] = useState(Number(params.get('windows')) || 12);
  const [storeys, setStoreys] = useState<Storeys>(
    (['single', 'double', 'triple'] as Storeys[]).includes(params.get('storeys') as Storeys)
      ? (params.get('storeys') as Storeys)
      : 'double',
  );
  const [frequency, setFrequency] = useState<Frequency>(
    FREQUENCY_ORDER.includes(params.get('frequency') as Frequency)
      ? (params.get('frequency') as Frequency)
      : 'monthly',
  );
  const [extras, setExtras] = useState<Partial<Record<ExtraId, number>>>({});
  const [addons, setAddons] = useState<string[]>([]);

  const [startDate, setStartDate] = useState(isoToday());
  const [timeSlot, setTimeSlot] = useState('any');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [town, setTown] = useState(params.get('area') ?? '');
  const [access, setAccess] = useState('');
  const [notes, setNotes] = useState('');

  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const result = useMemo(
    () => quote({ windows, storeys, frequency, extras }),
    [windows, storeys, frequency, extras],
  );

  const summaryText = useMemo(() => {
    const extraLines = EXTRAS.filter((e) => extras[e.id])
      .map((e) => `${e.label}${(extras[e.id] ?? 0) > 1 ? ` x${extras[e.id]}` : ''}`)
      .join(', ');
    return [
      `${windows} windows, ${storeys} storey`,
      extraLines ? `Extras: ${extraLines}` : null,
      addons.length ? `Also quote for: ${addons.join(', ')}` : null,
      `${FREQUENCY[frequency].label} — ${money(result.perClean)} per clean`,
      `Preferred start: ${startDate} (${timeSlot})`,
    ]
      .filter(Boolean)
      .join('\n');
  }, [windows, storeys, extras, addons, frequency, result.perClean, startDate, timeSlot]);

  const whatsappHref = `${site.whatsappHref}?text=${encodeURIComponent(
    `Hi Lewis, I'd like to book a window clean.\n\n${summaryText}\n\nName: ${name || '(name)'}\nAddress: ${address} ${postcode}`,
  )}`;

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Window cleaning booking — ${postcode || town || name || 'new enquiry'}`,
  )}&body=${encodeURIComponent(
    `${summaryText}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}, ${town} ${postcode}\nAccess: ${access}\nNotes: ${notes}`,
  )}`;

  function toggleExtra(id: ExtraId, perUnit?: boolean) {
    setExtras((prev) => {
      const next = { ...prev };
      if (perUnit) {
        next[id] = (next[id] ?? 0) + 1;
        if ((next[id] ?? 0) > 8) next[id] = 0;
      } else {
        next[id] = next[id] ? 0 : 1;
      }
      if (!next[id]) delete next[id];
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, email, address, town, postcode, access, notes,
          windows, storeys, frequency, extras, addons, startDate, timeSlot,
          perClean: result.perClean,
          firstClean: result.firstClean,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong sending your booking.');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="card mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-sky-700">
          <CheckIcon width={28} height={28} />
        </div>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold text-navy-950">
          Booking request sent
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-navy-900/75">
          Thanks {name.split(' ')[0] || 'very much'}. Lewis will text or ring you back to confirm the
          day, usually the same working day. Nothing is charged until the windows are done.
        </p>
        <div className="mt-5 rounded-xl bg-navy-50 p-4 text-left text-[14.5px] text-navy-900/80">
          <p className="font-semibold text-navy-950">What you asked for</p>
          <pre className="mt-2 whitespace-pre-wrap font-[inherit]">{summaryText}</pre>
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <a href={site.phoneHref} className="btn-ghost"><PhoneIcon width={17} height={17} /> {site.phone}</a>
          <a href={whatsappHref} className="btn-accent"><WhatsAppIcon width={17} height={17} /> Message on WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div className="space-y-8">
        {/* ---- 1. Property ---- */}
        <section className="card">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-600 text-sm font-bold text-white">1</span>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy-950">Your property</h2>
          </div>

          <div className="mt-6">
            <label htmlFor="windows" className="label">How many windows?</label>
            <div className="flex items-center gap-4">
              <input
                id="windows"
                type="range"
                min={3}
                max={40}
                value={windows}
                onChange={(e) => setWindows(Number(e.target.value))}
                className="flex-1 accent-navy-600"
              />
              <input
                type="number"
                min={1}
                max={80}
                value={windows}
                onChange={(e) => setWindows(Math.max(1, Number(e.target.value) || 1))}
                className="field !w-20 !px-3 !py-2 text-center tabular-nums"
                aria-label="Number of windows"
              />
            </div>
            <p className="mt-2 text-[13.5px] text-navy-900/60">
              Count each pane you can see from the outside, front and back. A three-bed semi is usually
              10 to 14. If you are miles out we will tell you before the first clean, not after.
            </p>
          </div>

          <fieldset className="mt-6">
            <legend className="label">Single or double storey?</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {STOREY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStoreys(opt.value)}
                  aria-pressed={storeys === opt.value}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                    storeys === opt.value ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-600' : 'border-navy-200 hover:border-navy-300'
                  }`}
                >
                  <span className="block text-[14.5px] font-semibold text-navy-950">{opt.label}</span>
                  <span className="block text-[12.5px] text-navy-900/55">{opt.hint}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="label">Anything else to clean?</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {EXTRAS.map((extra) => {
                const qty = extras[extra.id] ?? 0;
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggleExtra(extra.id, extra.perUnit)}
                    aria-pressed={qty > 0}
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                      qty > 0 ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-600' : 'border-navy-200 hover:border-navy-300'
                    }`}
                  >
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                      qty > 0 ? 'border-navy-600 bg-navy-600 text-white' : 'border-navy-300'
                    }`}>
                      {qty > 0 && (extra.perUnit ? <span className="text-[11px] font-bold">{qty}</span> : <CheckIcon width={13} height={13} />)}
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-semibold text-navy-950">
                        {extra.label} <span className="font-normal text-navy-700">+{money(extra.price)}</span>
                        {extra.perUnit && <span className="font-normal text-navy-900/50"> each</span>}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-navy-900/55">{extra.note}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[12.5px] text-navy-900/55">Tap Velux more than once to add more of them.</p>
          </fieldset>
        </section>

        {/* ---- 2. Frequency ---- */}
        <section className="card">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-600 text-sm font-bold text-white">2</span>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy-950">How often?</h2>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {FREQUENCY_ORDER.map((f) => {
              const opt = FREQUENCY[f];
              const price = quote({ windows, storeys, frequency: f, extras }).perClean;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  aria-pressed={frequency === f}
                  className={`relative rounded-xl border px-4 py-3.5 text-left transition-colors ${
                    frequency === f ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-600' : 'border-navy-200 hover:border-navy-300'
                  }`}
                >
                  {opt.popular && (
                    <span className="absolute right-3 top-3 rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-sky-800">
                      Most booked
                    </span>
                  )}
                  <span className="flex items-baseline gap-2">
                    <span className="text-[15px] font-bold text-navy-950">{opt.label}</span>
                    <span className="text-[12.5px] text-navy-900/55">{opt.short}</span>
                  </span>
                  <span className="mt-1 block text-[19px] font-extrabold text-navy-700">{money(price)}<span className="text-[13px] font-medium text-navy-900/55"> / clean</span></span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-navy-900/60">{opt.blurb}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ---- 3. When ---- */}
        <section className="card">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-600 text-sm font-bold text-white">3</span>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy-950">When would you like to start?</h2>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="startDate" className="label">Preferred first date</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                min={isoToday(1)}
                onChange={(e) => setStartDate(e.target.value)}
                className="field"
              />
              <p className="mt-1.5 text-[12.5px] text-navy-900/55">
                We will get as close as the round allows and confirm before turning up.
              </p>
            </div>
            <fieldset>
              <legend className="label">Preferred time</legend>
              <div className="space-y-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => setTimeSlot(slot.value)}
                    aria-pressed={timeSlot === slot.value}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left transition-colors ${
                      timeSlot === slot.value ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-600' : 'border-navy-200 hover:border-navy-300'
                    }`}
                  >
                    <span className="text-[14.5px] font-semibold text-navy-950">{slot.label}</span>
                    <span className="text-[12.5px] text-navy-900/55">{slot.hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        {/* ---- 4. Details ---- */}
        <section className="card">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-600 text-sm font-bold text-white">4</span>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy-950">Where are we coming?</h2>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label">Your name</label>
              <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="field" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="phone" className="label">Mobile number</label>
              <input id="phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="field" autoComplete="tel" placeholder="07…" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="label">Email <span className="font-normal text-navy-900/50">(optional)</span></label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" autoComplete="email" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className="label">Address</label>
              <input id="address" required value={address} onChange={(e) => setAddress(e.target.value)} className="field" autoComplete="street-address" placeholder="House number and street" />
            </div>
            <div>
              <label htmlFor="town" className="label">Town</label>
              <input id="town" list="towns" value={town} onChange={(e) => setTown(e.target.value)} className="field" autoComplete="address-level2" />
              <datalist id="towns">
                {areasAlphabetical.map((a) => <option key={a.slug} value={a.name} />)}
              </datalist>
            </div>
            <div>
              <label htmlFor="postcode" className="label">Postcode</label>
              <input id="postcode" required value={postcode} onChange={(e) => setPostcode(e.target.value.toUpperCase())} className="field uppercase" autoComplete="postal-code" placeholder="BL1 1AA" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="access" className="label">Rear access <span className="font-normal text-navy-900/50">(optional)</span></label>
              <input id="access" value={access} onChange={(e) => setAccess(e.target.value)} className="field" placeholder="Side gate, unlocked in the day / through the ginnel / no rear access" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="notes" className="label">Anything else? <span className="font-normal text-navy-900/50">(optional)</span></label>
              <textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="field resize-y" placeholder="Dog in the yard, conservatory roof needs a look at, please text before you come…" />
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="label">Want a price for anything else while we are there?</legend>
            <div className="flex flex-wrap gap-2">
              {ADDON_SERVICES.map((s) => {
                const on = addons.includes(s.name);
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => setAddons((prev) => (on ? prev.filter((x) => x !== s.name) : [...prev, s.name]))}
                    aria-pressed={on}
                    className={`rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors ${
                      on ? 'border-navy-600 bg-navy-600 text-white' : 'border-navy-200 text-navy-800 hover:border-navy-300'
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[12.5px] text-navy-900/55">
              These are quoted separately once Lewis has seen the job. Nothing is added to your window price.
            </p>
          </fieldset>

          {status === 'error' && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-[14.5px] text-red-800">
              <p className="font-semibold">{errorMsg}</p>
              <p className="mt-1">
                No problem — send it straight to Lewis instead:{' '}
                <a className="font-semibold underline" href={whatsappHref}>WhatsApp</a>,{' '}
                <a className="font-semibold underline" href={mailtoHref}>email</a> or ring{' '}
                <a className="font-semibold underline" href={site.phoneHref}>{site.phone}</a>.
              </p>
            </div>
          )}

          <button type="submit" disabled={status === 'sending'} className="btn-primary mt-6 w-full !py-4 !text-base disabled:opacity-60">
            {status === 'sending' ? 'Sending…' : <>Request this booking <ArrowIcon width={18} height={18} /></>}
          </button>
          <p className="mt-3 text-center text-[12.5px] text-navy-900/55">
            No card details, no contract, no cancellation fee. We confirm by text before the first visit.
          </p>
        </section>
      </div>

      {/* ---- Sticky summary ---- */}
      <aside className="lg:sticky lg:top-28">
        <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-[0_10px_40px_-20px_rgba(23,49,84,.4)]">
          <div className="bg-navy-950 p-6 text-white">
            <p className="text-[13px] uppercase tracking-wider text-white/60">Your price</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-5xl font-extrabold leading-none">
              {money(result.perClean)}
            </p>
            <p className="mt-1.5 text-[14px] text-white/70">
              per clean, {FREQUENCY[frequency].short.toLowerCase()}
            </p>
            {result.perMonth !== null && frequency !== 'oneoff' && (
              <p className="mt-4 border-t border-white/15 pt-4 text-[14px] text-white/75">
                Works out around <strong className="font-semibold text-white">{money(result.perMonth)} a month</strong>
                {result.perYear !== null && <> · {money(result.perYear)} a year</>}
              </p>
            )}
          </div>

          <div className="space-y-3 bg-white p-6 text-[14px]">
            <div className="flex justify-between text-navy-900/70">
              <span>Call-out</span><span className="tabular-nums">{money(CALL_OUT)}</span>
            </div>
            <div className="flex justify-between text-navy-900/70">
              <span>{windows} windows ({storeys} storey)</span>
              <span className="tabular-nums">{money(Math.round(result.windowsSubtotal * 100) / 100)}</span>
            </div>
            {result.extrasSubtotal > 0 && (
              <div className="flex justify-between text-navy-900/70">
                <span>Extras</span><span className="tabular-nums">{money(result.extrasSubtotal)}</span>
              </div>
            )}
            {FREQUENCY[frequency].multiplier !== 1 && (
              <div className="flex justify-between text-navy-900/70">
                <span>{FREQUENCY[frequency].label} rate</span>
                <span className="tabular-nums">
                  {FREQUENCY[frequency].multiplier < 1 ? '−' : '+'}
                  {Math.round(Math.abs(1 - FREQUENCY[frequency].multiplier) * 100)}%
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-navy-100 pt-3 text-[15px] font-bold text-navy-950">
              <span>Per clean</span><span className="tabular-nums">{money(result.perClean)}</span>
            </div>
            {result.hitMinimum && (
              <p className="text-[12.5px] text-navy-900/55">Our minimum charge is {money(MINIMUM_CHARGE)}.</p>
            )}
            {!result.firstCleanWaived && frequency !== 'oneoff' && (
              <p className="text-[12.5px] text-navy-900/55">
                First clean {money(result.firstClean)} — there is always more to shift the first time.
                Go weekly, fortnightly or monthly and we waive it.
              </p>
            )}
            {result.firstCleanWaived && (
              <p className="rounded-lg bg-sky-50 px-3 py-2 text-[12.5px] font-medium text-sky-900">
                First-clean surcharge waived on this round.
              </p>
            )}

            <ul className="mt-4 space-y-2 border-t border-navy-100 pt-4">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13.5px] text-navy-900/75">
                  <CheckIcon width={15} height={15} className="mt-0.5 shrink-0 text-sky-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-navy-100 bg-navy-50/60 p-5">
          <p className="text-[14px] font-semibold text-navy-950">Rather just talk to someone?</p>
          <div className="mt-3 flex flex-col gap-2">
            <a href={site.phoneHref} className="btn-ghost !py-2.5 !text-sm"><PhoneIcon width={16} height={16} /> {site.phone}</a>
            <a href={whatsappHref} className="btn-accent !py-2.5 !text-sm"><WhatsAppIcon width={16} height={16} /> Send it on WhatsApp</a>
          </div>
        </div>
      </aside>
    </form>
  );
}

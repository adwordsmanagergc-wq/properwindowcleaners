import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import QuickQuote from '@/components/QuickQuote';
import {
  ArrowIcon, CalendarIcon, CheckIcon, DropletIcon, PhoneIcon, PinIcon, WhatsAppIcon,
} from '@/components/Icons';
import { areas, getArea, nearbyAreas } from '@/lib/areas';
import { ADDON_SERVICES, FREQUENCY, FREQUENCY_ORDER, INCLUDED, PROPERTY_EXAMPLES, money, quote } from '@/lib/pricing';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export function generateMetadata({ params }: { params: { area: string } }): Metadata {
  const area = getArea(params.area);
  if (!area) return {};
  const pc = area.postcodes.join(', ');
  const description = `Window cleaning in ${area.name} (${pc}). Family-run, Bolton based. Instant online price, weekly to monthly rounds, frames and sills included.`;
  return {
    title: { absolute: `Window Cleaners in ${area.name} | Proper Window Cleaners` },
    description,
    alternates: { canonical: `/window-cleaning/${area.slug}` },
    openGraph: {
      title: `Window Cleaners in ${area.name}`,
      description,
      url: `${site.url}/window-cleaning/${area.slug}`,
      images: [{ url: '/hero.jpg', width: 1264, height: 848 }],
    },
  };
}

export default function AreaPage({ params }: { params: { area: string } }) {
  const area = getArea(params.area);
  if (!area) notFound();

  const nearby = nearbyAreas(area);
  const semi = PROPERTY_EXAMPLES[3];
  const semiPrice = quote({ windows: semi.windows, storeys: semi.storeys, frequency: 'monthly', extras: {} }).perClean;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Areas', url: '/areas' },
            { name: area.name, url: `/window-cleaning/${area.slug}` },
          ]),
          serviceSchema({
            name: `Window cleaning in ${area.name}`,
            description: area.intro,
            areaName: area.name,
            url: `${site.url}/window-cleaning/${area.slug}`,
          }),
          faqSchema(area.faqs),
        ]}
      />

      {/* HERO */}
      <section className="border-b border-navy-100 bg-gradient-to-b from-navy-50/70 to-white">
        <div className="container-page py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-5 text-[13.5px] text-navy-900/55">
            <Link href="/" className="hover:text-navy-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/areas" className="hover:text-navy-700">Areas</Link>
            <span className="mx-2">/</span>
            <span className="text-navy-900/80">{area.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-navy-800">
                <PinIcon width={14} height={14} className="text-sky-600" />
                {area.postcodes.join(' · ')} · {area.county}
              </p>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-[34px] font-extrabold leading-[1.1] tracking-tight text-navy-950 sm:text-[46px]">
                Window cleaners in {area.name}
              </h1>
              <p className="mt-5 max-w-2xl text-[18px] leading-[1.65] text-navy-900/78">{area.intro}</p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={`/book?area=${encodeURIComponent(area.name)}`} className="btn-primary !px-7 !py-3.5">
                  Price my house <ArrowIcon width={18} height={18} />
                </Link>
                <a href={site.phoneHref} className="btn-ghost !px-7 !py-3.5">
                  <PhoneIcon width={18} height={18} /> {site.phone}
                </a>
              </div>

              <dl className="mt-9 grid gap-5 sm:grid-cols-3">
                <div className="rounded-xl border border-navy-100 bg-white p-4">
                  <dt className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-navy-900/50">
                    <CalendarIcon width={15} height={15} /> On the round
                  </dt>
                  <dd className="mt-1.5 text-[15px] font-semibold text-navy-950">{area.roundDay}</dd>
                </div>
                <div className="rounded-xl border border-navy-100 bg-white p-4">
                  <dt className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-navy-900/50">
                    <PinIcon width={15} height={15} /> From base
                  </dt>
                  <dd className="mt-1.5 text-[15px] font-semibold text-navy-950">{area.travel}</dd>
                </div>
                <div className="rounded-xl border border-navy-100 bg-white p-4">
                  <dt className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-navy-900/50">
                    <DropletIcon width={15} height={15} /> Three-bed semi
                  </dt>
                  <dd className="mt-1.5 text-[15px] font-semibold text-navy-950">{money(semiPrice)} monthly</dd>
                </div>
              </dl>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <QuickQuote areaName={area.name} />
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL CONTENT */}
      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          {/* min-w-0: a grid item defaults to min-width:auto, so without this the
              wide price table below refuses to shrink and widens the whole page. */}
          <div className="min-w-0 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy-950 sm:text-3xl">
              The houses we clean in {area.name}
            </h2>
            <div className="prose-local mt-5"><p>{area.housing}</p></div>

            <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy-950 sm:text-3xl">
              Knowing the area helps
            </h2>
            <div className="prose-local mt-5"><p>{area.local}</p></div>

            <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy-950 sm:text-3xl">
              What actually dirties glass round here
            </h2>
            <div className="prose-local mt-5"><p>{area.challenge}</p></div>

            <div className="mt-12 rounded-2xl border border-navy-100 bg-navy-50/50 p-7">
              <h2 className="text-[18px] font-bold text-navy-950">
                Streets and neighbourhoods we cover in {area.name}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {area.neighbourhoods.map((n) => (
                  <li key={n} className="rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-[13.5px] font-medium text-navy-800">
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14.5px] leading-relaxed text-navy-900/70">
                Not on the list? Ring anyway. If we already have a job on your street it is nearly
                always a yes, and if not we will tell you straight rather than string you along.
              </p>
              {area.landmarks.length > 0 && (
                <p className="mt-4 text-[14px] text-navy-900/60">
                  If it helps to place us: we are regularly working near {area.landmarks.slice(0, 3).join(', ')}.
                </p>
              )}
            </div>

            {/* Local price table */}
            <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy-950 sm:text-3xl">
              Window cleaning prices in {area.name}
            </h2>
            <p className="mt-3 text-[16.5px] leading-relaxed text-navy-900/72">
              Same prices whether you are in {area.name} or anywhere else on the round. We do not
              charge more for postcodes that look like they can take it.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
                <caption className="sr-only">Window cleaning prices in {area.name} by property type</caption>
                <thead>
                  <tr className="border-b border-navy-200">
                    <th scope="col" className="px-4 py-3 text-[13px] font-semibold uppercase tracking-wider text-navy-900/60">Property</th>
                    {(['fortnightly', 'monthly', 'eightweekly', 'oneoff'] as const).map((f) => (
                      <th key={f} scope="col" className={`px-4 py-3 text-right text-[13px] font-semibold uppercase tracking-wider ${FREQUENCY[f].popular ? 'text-sky-700' : 'text-navy-900/60'}`}>
                        {FREQUENCY[f].label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {PROPERTY_EXAMPLES.slice(1, 6).map((ex) => (
                    <tr key={ex.id}>
                      <th scope="row" className="px-4 py-3.5 text-left font-semibold text-navy-950">{ex.name}</th>
                      {(['fortnightly', 'monthly', 'eightweekly', 'oneoff'] as const).map((f) => (
                        <td key={f} className={`px-4 py-3.5 text-right font-bold tabular-nums ${FREQUENCY[f].popular ? 'text-sky-700' : 'text-navy-800'}`}>
                          {money(quote({ windows: ex.windows, storeys: ex.storeys, frequency: f, extras: {} }).perClean)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[13.5px] text-navy-900/55">
              Guide prices per clean. <Link href="/prices" className="font-semibold text-navy-700 underline">Full price list</Link> ·{' '}
              <Link href={`/book?area=${encodeURIComponent(area.name)}`} className="font-semibold text-navy-700 underline">price your own house</Link>.
            </p>

            <div className="mt-14">
              <Faq items={area.faqs} title={`Window cleaning in ${area.name} — your questions`} />
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-navy-100">
              <Image
                src="/hero-sm.jpg"
                alt={`The ${site.name} van, which covers ${area.name}`}
                width={632}
                height={424}
                sizes="320px"
                className="h-auto w-full"
              />
              <div className="p-5">
                <p className="text-[15px] font-bold text-navy-950">{site.name}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-navy-900/70">
                  Bolton born and bred, {site.yearsExperience} years on the glass.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a href={site.phoneHref} className="btn-primary !py-2.5 !text-sm"><PhoneIcon width={16} height={16} /> {site.phone}</a>
                  <a href={site.whatsappHref} className="btn-ghost !py-2.5 !text-sm"><WhatsAppIcon width={16} height={16} /> WhatsApp</a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-6">
              <h2 className="text-[16.5px] font-bold text-navy-950">Always included</h2>
              <ul className="mt-3 space-y-2">
                {INCLUDED.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-navy-900/78">
                    <CheckIcon width={15} height={15} className="mt-0.5 shrink-0 text-sky-600" /> {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-navy-100 p-6">
              <h2 className="text-[16.5px] font-bold text-navy-950">Other jobs in {area.name}</h2>
              <ul className="mt-3 space-y-2.5">
                {ADDON_SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="flex items-center justify-between gap-3 text-[14.5px] hover:text-navy-700">
                      <span className="font-medium text-navy-900">{s.name}</span>
                      <span className="shrink-0 font-bold text-navy-700">{money(s.from)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {nearby.length > 0 && (
              <div className="rounded-2xl border border-navy-100 p-6">
                <h2 className="text-[16.5px] font-bold text-navy-950">Nearby on the round</h2>
                <ul className="mt-3 space-y-2">
                  {nearby.map((n) => (
                    <li key={n.slug}>
                      <Link href={`/window-cleaning/${n.slug}`} className="flex items-center gap-2 text-[14.5px] font-medium text-navy-800 hover:text-navy-600">
                        <PinIcon width={14} height={14} className="text-sky-600" /> Window cleaning in {n.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/areas" className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-700">
                  All {areas.length} areas <ArrowIcon width={14} height={14} />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CtaBand
        title={`Get a price for your ${area.name} home`}
        body={`Windows, storeys, how often — thirty seconds and you have got the figure. We then text back to confirm which ${area.roundDay.toLowerCase().includes('day') ? 'day' : 'week'} suits.`}
        href={`/book?area=${encodeURIComponent(area.name)}`}
      />
      <div className="pb-16" />
    </>
  );
}

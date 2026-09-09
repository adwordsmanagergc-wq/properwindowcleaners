import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import QuickQuote from '@/components/QuickQuote';
import { ArrowIcon, CheckIcon } from '@/components/Icons';
import {
  ADDON_SERVICES, CALL_OUT, EXTRAS, FREQUENCY, FREQUENCY_ORDER, INCLUDED,
  MINIMUM_CHARGE, PROPERTY_EXAMPLES, WINDOW_RATE, money, quote,
} from '@/lib/pricing';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Window Cleaning Prices, Bolton & NW | Proper Window Cleaners' },
  description:
    'What a terrace, semi, detached or bungalow costs to clean in the North West, on weekly, fortnightly, monthly or one-off rounds. No hidden extras.',
  alternates: { canonical: '/prices' },
};

const PRICE_FAQS = [
  {
    q: 'Why is the first clean sometimes more?',
    a: 'Glass that has not been touched for a while takes longer. Old soap film in the corners, cobwebs behind the frames, bird mess baked on. That first visit is real extra work, so it carries a surcharge. Sign up weekly, fortnightly or monthly and we waive it entirely.',
  },
  {
    q: 'Why does a less frequent clean cost more per visit?',
    a: 'Because there is more on the glass each time we come. Every window cleaner works this way. A monthly house takes a fraction of the time an eight-weekly one does, so it is priced accordingly. If you want the lowest price per clean, go more often, not less.',
  },
  {
    q: 'Are frames and sills really included?',
    a: 'Yes, on every clean, every time. A lot of firms quote for glass only and then charge extra for frames. We have never understood that, because the frames get wet anyway when the glass is rinsed, so leaving them dirty is just doing half a job.',
  },
  {
    q: 'What is the minimum you will come out for?',
    a: `Our minimum charge is ${money(MINIMUM_CHARGE)}. That covers the van, the water and the time it takes to pull over and set up. Small flats and single-storey properties often land on that figure.`,
  },
  {
    q: 'Do prices go up?',
    a: 'Rarely, and never without telling you first. If fuel or water costs force a rise you get a text before it happens, not a surprise on the invoice. Plenty of houses on the round are paying what they were quoted years ago.',
  },
  {
    q: 'How do I pay?',
    a: 'Bank transfer after each clean suits most people, and we text when the job is done and the details are on the message. Cash left with a neighbour or through the door is fine too. No standing orders, no card on file.',
  },
];

export default function PricesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Prices', url: '/prices' }]),
          faqSchema(PRICE_FAQS),
        ]}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-navy-50/70 to-white">
        <div className="container-page py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Prices</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[34px] font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-[48px]">
              What window cleaning costs with us
            </h1>
            <p className="mt-4 text-[17.5px] leading-[1.65] text-navy-900/75">
              No &ldquo;prices from&rdquo;, no ringing round, no waiting for a quote. Three things set the
              price: how many windows you have, how high they go, and how often you want them doing.
              Everything on this page is worked out from those.
            </p>
          </div>
        </div>
      </section>

      {/* Price grid */}
      <section className="container-page py-14 sm:py-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy-950 sm:text-3xl">
          Guide prices by property
        </h2>
        <p className="mt-3 max-w-2xl text-[16.5px] leading-relaxed text-navy-900/72">
          Exterior glass, frames and sills, front and back. Find the house nearest yours, then read
          across to the round you fancy.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
            <caption className="sr-only">Window cleaning price per clean by property type and frequency</caption>
            <thead>
              <tr className="border-b border-navy-200">
                <th scope="col" className="px-4 py-3 text-[13px] font-semibold uppercase tracking-wider text-navy-900/60">Property</th>
                {FREQUENCY_ORDER.map((f) => (
                  <th key={f} scope="col" className={`px-4 py-3 text-right text-[13px] font-semibold uppercase tracking-wider ${FREQUENCY[f].popular ? 'text-sky-700' : 'text-navy-900/60'}`}>
                    {FREQUENCY[f].label}
                    {FREQUENCY[f].popular && <span className="ml-1 text-[10px]">★</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {PROPERTY_EXAMPLES.map((ex) => (
                <tr key={ex.id} className="hover:bg-navy-50/50">
                  <th scope="row" className="px-4 py-4 text-left">
                    <span className="block font-bold text-navy-950">{ex.name}</span>
                    <span className="block text-[13px] font-normal text-navy-900/55">{ex.detail}</span>
                  </th>
                  {FREQUENCY_ORDER.map((f) => {
                    const p = quote({ windows: ex.windows, storeys: ex.storeys, frequency: f, extras: {} }).perClean;
                    return (
                      <td key={f} className={`px-4 py-4 text-right font-bold tabular-nums ${FREQUENCY[f].popular ? 'text-sky-700' : 'text-navy-800'}`}>
                        {money(p)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[13.5px] leading-relaxed text-navy-900/55">
          Prices per clean. Window counts are typical for each property type, and your own count sets your
          actual price, and you can put it in below. Minimum charge {money(MINIMUM_CHARGE)}.
        </p>
      </section>

      {/* How the maths works + calculator */}
      <section className="border-y border-navy-100 bg-navy-50/40 py-14 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14">
          <div>
            <p className="eyebrow">Nothing hidden</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy-950 sm:text-3xl">
              Exactly how your price is worked out
            </h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-navy-900/72">
              Here is the whole formula. There is nothing else in it.
            </p>

            <div className="mt-7 space-y-4">
              <div className="rounded-2xl border border-navy-100 bg-white p-6">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-navy-900/50">Step one</p>
                <p className="mt-1.5 text-[17px] font-bold text-navy-950">
                  {money(CALL_OUT)} call-out
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-navy-900/70">
                  Covers pulling the van over, the purified water and the setup. The same for everyone.
                </p>
              </div>

              <div className="rounded-2xl border border-navy-100 bg-white p-6">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-navy-900/50">Step two</p>
                <p className="mt-1.5 text-[17px] font-bold text-navy-950">Plus a rate per window</p>
                <ul className="mt-3 space-y-2 text-[15px] text-navy-900/75">
                  <li className="flex justify-between border-b border-navy-100 pb-2"><span>Single storey</span><span className="font-semibold tabular-nums">£{WINDOW_RATE.single.toFixed(2)} each</span></li>
                  <li className="flex justify-between border-b border-navy-100 pb-2"><span>Two storey</span><span className="font-semibold tabular-nums">£{WINDOW_RATE.double.toFixed(2)} each</span></li>
                  <li className="flex justify-between"><span>Three storey</span><span className="font-semibold tabular-nums">£{WINDOW_RATE.triple.toFixed(2)} each</span></li>
                </ul>
              </div>

              <div className="rounded-2xl border border-navy-100 bg-white p-6">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-navy-900/50">Step three</p>
                <p className="mt-1.5 text-[17px] font-bold text-navy-950">Adjusted for how often we come</p>
                <ul className="mt-3 space-y-2 text-[15px] text-navy-900/75">
                  {FREQUENCY_ORDER.map((f) => {
                    const m = FREQUENCY[f].multiplier;
                    return (
                      <li key={f} className="flex justify-between border-b border-navy-100 pb-2 last:border-0 last:pb-0">
                        <span>{FREQUENCY[f].label}</span>
                        <span className="font-semibold tabular-nums">
                          {m === 1 ? 'standard rate' : m < 1 ? `${Math.round((1 - m) * 100)}% less` : `${Math.round((m - 1) * 100)}% more`}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-2xl border border-navy-100 bg-white p-6">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-navy-900/50">Optional</p>
                <p className="mt-1.5 text-[17px] font-bold text-navy-950">Extras, if you have them</p>
                <ul className="mt-3 space-y-2 text-[15px] text-navy-900/75">
                  {EXTRAS.map((e) => (
                    <li key={e.id} className="flex justify-between gap-4 border-b border-navy-100 pb-2 last:border-0 last:pb-0">
                      <span>{e.label}{e.perUnit && ', each'}</span>
                      <span className="shrink-0 font-semibold tabular-nums">+{money(e.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-sky-200 bg-sky-50 p-6">
              <h3 className="text-[17px] font-bold text-navy-950">Always in the price</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {INCLUDED.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-[15px] text-navy-900/80">
                    <CheckIcon width={16} height={16} className="mt-1 shrink-0 text-sky-600" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <QuickQuote />
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="container-page py-14 sm:py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Other jobs</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy-950 sm:text-3xl">
            Gutters, fascias, conservatory roofs and panels
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-navy-900/72">
            These are quoted per job rather than per round, because a bungalow gutter and a
            four-bed detached gutter are not the same afternoon. Book two together and it comes down
            again, because most of the cost is having somebody there in the first place.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ADDON_SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-2xl border border-navy-100 p-6 transition-all hover:border-navy-300 hover:shadow-[0_8px_30px_-16px_rgba(23,49,84,.4)]">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-navy-900/50">From</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-700">{money(s.from)}</p>
              <h3 className="mt-3 text-[16.5px] font-bold text-navy-950">{s.name}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-navy-900/70">{s.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-700">
                More detail <ArrowIcon width={15} height={15} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="mx-auto max-w-3xl">
          <Faq items={PRICE_FAQS} title="Questions about pricing" />
        </div>
      </section>

      <CtaBand
        title="Put your own numbers in"
        body={`The calculator takes about thirty seconds and gives you the real figure for your house, not a range. Or ring us and we will price it over the phone.`}
      />
      <div className="pb-16" />
    </>
  );
}

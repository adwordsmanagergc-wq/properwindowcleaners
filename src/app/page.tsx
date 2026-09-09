import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AreaLinks from '@/components/AreaLinks';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import QuickQuote from '@/components/QuickQuote';
import ServiceGrid from '@/components/ServiceGrid';
import {
  ArrowIcon, CalendarIcon, CheckIcon, ClockIcon, DropletIcon,
  PhoneIcon, PinIcon, ShieldIcon, StarIcon,
} from '@/components/Icons';
import { areas } from '@/lib/areas';
import { INCLUDED, PROPERTY_EXAMPLES, examplePrice, money } from '@/lib/pricing';
import { faqSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Window Cleaners Bolton & North West | Proper Window Cleaners' },
  description:
    'Family-run window cleaners covering Bolton, Bury, Wigan, Manchester, Chorley and Preston. Instant online price. Weekly, fortnightly or monthly rounds.',
  alternates: { canonical: '/' },
};

const HOME_FAQS = [
  {
    q: 'How much do you charge to clean windows?',
    a: `It depends on how many windows you have and how high they go, so we put the calculator on the site rather than making you ring for a number. A three-bed semi on a monthly round is ${money(examplePrice(PROPERTY_EXAMPLES[3]))}. Frames, sills and door glass are in that price, not bolted on afterwards.`,
  },
  {
    q: 'Do I have to be in when you clean?',
    a: 'No. Everything is done from the ground with a pole, so as long as we can get to the back of the house we can crack on whether you are in or not. If your gate is locked, tell us on the booking form and we will work round it.',
  },
  {
    q: 'What if it rains?',
    a: 'We still clean. Purified water leaves nothing behind for rain to mark, so a shower afterwards makes no difference to the finish. We only stop for high winds or ice, when working a pole is not safe.',
  },
  {
    q: 'Am I tied into a contract?',
    a: 'Never. Regular rounds are a handshake, not a direct debit. If you want to stop, or move from monthly to eight-weekly, send a text and it is done.',
  },
  {
    q: 'How do I pay?',
    a: 'Bank transfer after each clean is what most people do. Cash is fine too. We text you when the job is done, and you pay when you are happy with it.',
  },
  {
    q: 'Do you clean the insides as well?',
    a: 'The regular round is exterior only, which is what causes the mucky glass you actually notice. We do interiors as a separate booked job for end of tenancy, before a viewing or after building work.',
  },
];

const STEPS = [
  { icon: CalendarIcon, title: 'Price it yourself', body: 'Slide the number of windows, pick single or double storey, choose how often. The price updates as you go — no waiting on a callback.' },
  { icon: PhoneIcon, title: 'We confirm the day', body: 'You get a text or a call back, usually the same working day, with the day we will be on your street and a rough time.' },
  { icon: DropletIcon, title: 'We turn up and clean', body: 'Pole and purified water, ground level, front and back. You get a text when it is done and pay by transfer or cash.' },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/70 to-white">
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-navy-800">
              <span className="flex h-2 w-2 rounded-full bg-sky-500" />
              Family-run in {site.baseTown} · {site.yearsExperience} years on the glass
            </p>

            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[38px] font-extrabold leading-[1.08] tracking-tight text-navy-950 sm:text-[52px]">
              Window cleaners who
              <span className="text-navy-600"> do a proper job</span>
            </h1>

            <p className="mt-5 max-w-xl text-[18px] leading-[1.65] text-navy-900/75">
              Proper Window Cleaners covers Bolton and the wider North West. Price your own house
              in under a minute, pick weekly, fortnightly or monthly, and book a date that suits you.
              Frames and sills included, never an extra.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="btn-primary !px-7 !py-3.5 !text-base">
                Get my instant price <ArrowIcon width={18} height={18} />
              </Link>
              <a href={site.phoneHref} className="btn-ghost !px-7 !py-3.5 !text-base">
                <PhoneIcon width={18} height={18} /> {site.phone}
              </a>
            </div>

            <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {[
                'No contract, cancel with a text',
                'Fully insured, public liability',
                'Pure water — no soap, no streaks',
                'We clean rain or shine',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[15px] font-medium text-navy-900/85">
                  <CheckIcon width={17} height={17} className="shrink-0 text-sky-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-[0_24px_70px_-30px_rgba(23,49,84,.55)]">
              <Image
                src="/hero.jpg"
                alt={`The ${site.name} van outside Bolton Town Hall`}
                width={1264}
                height={848}
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -bottom-5 left-4 rounded-2xl border border-navy-100 bg-white px-5 py-3.5 shadow-lg sm:left-6">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-navy-900/50">Three-bed semi, monthly</p>
              <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy-950">
                {money(examplePrice(PROPERTY_EXAMPLES[3]))}
                <span className="ml-1 text-[13px] font-medium text-navy-900/55">per clean</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TRUST BAR ---------- */}
      <section className="border-y border-navy-100 bg-navy-50/40">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: StarIcon, title: `${site.yearsExperience} years' experience`, body: 'We have been cleaning windows round these streets for twenty years.' },
            { icon: ShieldIcon, title: 'Fully insured', body: 'Public liability cover in place on every job, domestic and commercial.' },
            { icon: PinIcon, title: `${areas.length} towns covered`, body: 'From Bolton and Bury out to Preston, Blackburn and Manchester.' },
            { icon: ClockIcon, title: 'Text before we come', body: 'You always know which day we are on your street. No surprise knocks.' },
          ].map((item) => (
            <div key={item.title} className="flex gap-3.5">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-navy-600 shadow-sm">
                <item.icon width={20} height={20} />
              </span>
              <div>
                <p className="text-[15px] font-bold text-navy-950">{item.title}</p>
                <p className="mt-1 text-[14px] leading-snug text-navy-900/65">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CALCULATOR ---------- */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14">
          <div>
            <p className="eyebrow">Straight prices</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950 sm:text-4xl">
              You should not have to ring round for a price
            </h2>
            <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-navy-900/75">
              Most window cleaners make you wait for a callback before you find out what it costs.
              We would rather show you. Every price on this site comes from the same three things:
              how many windows, how high they are, and how often you want them cleaning.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100">
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">Example monthly window cleaning prices by property type</caption>
                <thead className="bg-navy-50/70 text-[13px] uppercase tracking-wider text-navy-900/60">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Property</th>
                    <th scope="col" className="hidden px-5 py-3 font-semibold sm:table-cell">Typical</th>
                    <th scope="col" className="px-5 py-3 text-right font-semibold">Monthly round</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {PROPERTY_EXAMPLES.map((ex) => (
                    <tr key={ex.id}>
                      <th scope="row" className="px-5 py-3.5 font-semibold text-navy-950">{ex.name}</th>
                      <td className="hidden px-5 py-3.5 text-[14px] text-navy-900/60 sm:table-cell">{ex.detail}</td>
                      <td className="px-5 py-3.5 text-right font-bold tabular-nums text-navy-700">
                        {money(examplePrice(ex))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[13.5px] text-navy-900/55">
              Guide prices for a monthly exterior clean. Conservatories, extensions and Velux windows
              are added on the booking page. <Link href="/prices" className="font-semibold text-navy-700 underline">See the full price list</Link>.
            </p>
          </div>

          <div className="lg:sticky lg:top-28">
            <QuickQuote />
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="bg-navy-50/40 py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950 sm:text-4xl">
              Three steps and it is off your list
            </h2>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-navy-100 bg-white p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-600 text-white">
                    <step.icon width={21} height={21} />
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-100">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-[18px] font-bold text-navy-950">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-900/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- INCLUDED + SERVICES ---------- */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">What you get</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950 sm:text-4xl">
              A proper clean, not a quick wipe
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-navy-900/75">
              Water-fed pole, deionised water, brushed and rinsed from the ground. No ladders leaning on
              your gutters, no soapy film left in the corners to run down the glass the next time it rains.
              Every clean on the round includes the lot:
            </p>
            <ul className="mt-6 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] text-navy-900/85">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <CheckIcon width={14} height={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/services" className="btn-ghost mt-8">
              All our services <ArrowIcon width={17} height={17} />
            </Link>
          </div>

          <div className="rounded-3xl border border-navy-100 bg-navy-50/50 p-8">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy-950">
              While the van is on your street
            </h3>
            <p className="mt-2 text-[15.5px] leading-relaxed text-navy-900/70">
              Gutters, fascias, conservatory roofs and solar panels are all done off the same pole
              system. Booking them together is cheaper than having somebody out twice.
            </p>
            <div className="mt-6 space-y-3">
              {[
                'Gutter clearing with a camera so you see it emptied',
                'Fascias and soffits brought back to white',
                'Conservatory roofs, glazing bars and box gutters',
                'Solar panels cleaned with deionised water only',
              ].map((line) => (
                <p key={line} className="flex items-start gap-2.5 text-[15px] text-navy-900/85">
                  <CheckIcon width={16} height={16} className="mt-1 shrink-0 text-sky-600" /> {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <ServiceGrid />
        </div>
      </section>

      {/* ---------- ABOUT TEASER ---------- */}
      <section className="border-y border-navy-100 bg-navy-50/40 py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-3xl shadow-[0_20px_60px_-30px_rgba(23,49,84,.5)]">
            <Image
              src="/hero.jpg"
              alt={`The ${site.name} van outside Bolton Town Hall`}
              width={1264}
              height={848}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="eyebrow">Who you are booking</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950 sm:text-4xl">
              A local round, not a call centre
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-navy-900/75">
              Bolton born and bred, twenty years on the glass, and we would rather keep a customer
              for ten years than squeeze an extra fiver out of them once. Ring the number and you get
              somebody who knows the round.
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-navy-900/75">
              That is the whole business, really. Come when we said we would, do the job properly,
              and charge what we quoted.
            </p>
            <Link href="/about" className="btn-ghost mt-7">
              Read our story <ArrowIcon width={17} height={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- AREAS ---------- */}
      <div className="py-16 sm:py-20">
        <AreaLinks
          heading={`Window cleaning across ${areas.length} North West towns`}
          intro="We are Bolton based, so the round starts here and works outwards. Pick your town to see what we cover, which day we are usually on your side of the map, and what it costs."
        />
      </div>

      {/* ---------- FAQ ---------- */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          <Faq items={HOME_FAQS} />
        </div>
      </section>

      <CtaBand />
      <div className="pb-16" />
    </>
  );
}

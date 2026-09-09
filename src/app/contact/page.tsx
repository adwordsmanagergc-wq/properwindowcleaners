import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { CalendarIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/Icons';
import { areas } from '@/lib/areas';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Contact | Proper Window Cleaners, Bolton' },
  description: `Ring us on ${site.phone}, message on WhatsApp or email ${site.email}. Window cleaning across Bolton and the North West.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])} />

      <section className="border-b border-navy-100 bg-gradient-to-b from-navy-50/70 to-white">
        <div className="container-page py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Contact</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[34px] font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-[48px]">
              Get hold of us
            </h1>
            <p className="mt-4 text-[17.5px] leading-[1.65] text-navy-900/75">
              One number, one inbox. If it rings out we are up a pole somewhere, so leave a
              message or send a text and you will get a reply the same day.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a href={site.phoneHref} className="group rounded-2xl border border-navy-100 p-7 transition-all hover:border-navy-300 hover:shadow-[0_8px_30px_-16px_rgba(23,49,84,.4)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-600 text-white">
              <PhoneIcon width={21} height={21} />
            </span>
            <h2 className="mt-4 text-[17px] font-bold text-navy-950">Ring or text</h2>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy-700">{site.phone}</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-navy-900/70">
              Quickest way to get an answer. Texts are fine and often faster if we are working.
            </p>
          </a>

          <a href={site.whatsappHref} className="group rounded-2xl border border-navy-100 p-7 transition-all hover:border-navy-300 hover:shadow-[0_8px_30px_-16px_rgba(23,49,84,.4)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-white">
              <WhatsAppIcon width={21} height={21} />
            </span>
            <h2 className="mt-4 text-[17px] font-bold text-navy-950">WhatsApp</h2>
            <p className="mt-2 text-[17px] font-bold text-navy-700">Send a message</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-navy-900/70">
              Handy if you want to send a photo of the house or the bit you want quoting.
            </p>
          </a>

          <a href={site.emailHref} className="group rounded-2xl border border-navy-100 p-7 transition-all hover:border-navy-300 hover:shadow-[0_8px_30px_-16px_rgba(23,49,84,.4)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-white">
              <MailIcon width={21} height={21} />
            </span>
            <h2 className="mt-4 text-[17px] font-bold text-navy-950">Email</h2>
            <p className="mt-2 break-all text-[15.5px] font-bold text-navy-700">{site.email}</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-navy-900/70">
              Best for commercial enquiries, invoices and anything a managing agent needs in writing.
            </p>
          </a>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-7 lg:col-span-2">
            <h2 className="text-[18px] font-bold text-navy-950">Would you rather just book it?</h2>
            <p className="mt-2 text-[15.5px] leading-relaxed text-navy-900/72">
              The booking form gives you a price straight away and lets you pick a start date and a
              preferred time. It takes about thirty seconds and there are no card details involved.
            </p>
            <Link href="/book" className="btn-primary mt-5">Get my instant price</Link>
          </div>

          <div className="rounded-2xl border border-navy-100 p-7">
            <h2 className="flex items-center gap-2 text-[17px] font-bold text-navy-950">
              <ClockIcon width={19} height={19} className="text-sky-600" /> Hours
            </h2>
            <dl className="mt-4 space-y-3 text-[14.5px]">
              {site.hours.map((h) => (
                <div key={h.days}>
                  <dt className="font-semibold text-navy-900">{h.days}</dt>
                  <dd className="text-navy-900/65">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 p-7">
            <h2 className="flex items-center gap-2 text-[17px] font-bold text-navy-950">
              <PinIcon width={19} height={19} className="text-sky-600" /> Where we are
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy-900/72">
              Based in {site.baseTown}, {site.baseCounty}. There is no shop or office to call in at —
              the van is the business — but we are on the road across {areas.length} towns in{' '}
              {site.region}.
            </p>
            <Link href="/areas" className="mt-4 inline-block text-[14.5px] font-semibold text-navy-700 underline">
              See every area we cover
            </Link>
          </div>
          <div className="rounded-2xl border border-navy-100 p-7">
            <h2 className="flex items-center gap-2 text-[17px] font-bold text-navy-950">
              <CalendarIcon width={19} height={19} className="text-sky-600" /> Already a customer?
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy-900/72">
              Need to skip a clean, change how often we come, or add the conservatory roof on next
              time? A text to {site.phone} does it. No forms, no notice period, no arguing.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
      <div className="pb-16" />
    </>
  );
}

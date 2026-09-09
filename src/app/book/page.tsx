import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';
import JsonLd from '@/components/JsonLd';
import { CheckIcon } from '@/components/Icons';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Book a Window Clean | Proper Window Cleaners' },
  description:
    'Price your windows and book a weekly, fortnightly, monthly or one-off clean across Bolton and the North West. No card details, no contract.',
  alternates: { canonical: '/book' },
};

export default function BookPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Book', url: '/book' }])} />

      <section className="border-b border-navy-100 bg-gradient-to-b from-navy-50/70 to-white">
        <div className="container-page py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Book in</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[34px] font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-[46px]">
              Price your windows and pick your date
            </h1>
            <p className="mt-4 text-[17.5px] leading-[1.65] text-navy-900/75">
              Four short steps. The price updates as you go, so there are no surprises and nothing to
              wait for. We confirm the day by text, usually the same working day.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {['No card details', 'No contract', 'Pay after the clean', 'Cancel with a text'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-[15px] font-medium text-navy-900/85">
                  <CheckIcon width={16} height={16} className="text-sky-600" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <Suspense fallback={<div className="card">Loading the calculator…</div>}>
          <BookingForm />
        </Suspense>
      </section>

      <section className="container-page pb-16">
        <p className="mx-auto max-w-3xl text-center text-[14px] leading-relaxed text-navy-900/60">
          Prefer to talk it through? Ring us on{' '}
          <a className="font-semibold text-navy-700 underline" href={site.phoneHref}>{site.phone}</a> or email{' '}
          <a className="font-semibold text-navy-700 underline" href={site.emailHref}>{site.email}</a>.
          We answer between jobs, so if it rings out leave a message and you will get a call back.
        </p>
      </section>
    </>
  );
}

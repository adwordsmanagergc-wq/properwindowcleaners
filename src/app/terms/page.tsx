import type { Metadata } from 'next';
import { MINIMUM_CHARGE, money } from '@/lib/pricing';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The straightforward terms we work to at ${site.name}.`,
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl prose-local">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950 sm:text-4xl">
          Terms of service
        </h1>
        <p className="mt-3 text-[14px] text-navy-900/55">Last updated: September 2026</p>

        <h2 className="mt-10 text-2xl font-bold text-navy-950">Quotes and prices</h2>
        <p className="mt-3">
          The price the calculator gives you is based on what you tell us: the number of windows, the
          number of storeys and any extras. If the property turns out to be materially different when
          we arrive, we will tell you the corrected price before doing the work, not after. Our
          minimum charge is {money(MINIMUM_CHARGE)}.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-950">Booking</h2>
        <p className="mt-3">
          Submitting the form is a request, not a confirmed appointment. A booking is confirmed once
          Lewis has come back to you with a date. No payment details are taken online.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-950">Access</h2>
        <p className="mt-3">
          You do not need to be home. We do need reasonable access to the areas being cleaned,
          including the rear where that is part of the job. If we cannot get to the back on the day,
          we will clean the front and charge accordingly rather than skip the visit entirely.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-950">Weather</h2>
        <p className="mt-3">
          We work in the rain — purified water leaves no residue for rain to mark. We do not work in
          high winds or ice, when a pole is not safe. If weather stops us you are moved to the next
          available day and you are not charged for a missed visit.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-950">Payment</h2>
        <p className="mt-3">
          Payment is due after each clean, by bank transfer or cash. There is no contract, no standing
          order and no cancellation fee. Regular rounds can be paused or stopped by text at any time.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-950">If something is not right</h2>
        <p className="mt-3">
          Tell us within 48 hours and we will come back and put it right at no charge. That is easier
          for everyone than arguing about it. Ring {site.phone} or email {site.email}.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-950">Insurance and limits</h2>
        <p className="mt-3">
          We hold public liability insurance and work from ground level using water-fed poles. We
          cannot accept responsibility for pre-existing faults such as failed double-glazing seals,
          loose or rotten frames, cracked panes or defective guttering, and we will point these out to
          you rather than work on them.
        </p>
      </div>
    </section>
  );
}

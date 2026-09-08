import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} handles the information you send through the booking form.`,
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl prose-local">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950 sm:text-4xl">
          Privacy policy
        </h1>
        <p className="mt-3 text-[14px] text-navy-900/55">Last updated: September 2026</p>

        <h2 className="mt-10 text-2xl font-bold text-navy-950">What we collect</h2>
        <p className="mt-3">
          When you use the booking form we collect your name, phone number, address and postcode, and
          optionally your email address and any notes you add. We collect this because we cannot clean
          your windows without knowing who you are and where you live.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-950">What we do with it</h2>
        <p className="mt-3">
          It is emailed to {site.email} so Lewis can contact you and put the job on the round. If you
          become a regular customer we keep your details for as long as you are on the round, plus a
          reasonable period afterwards for our records. We do not sell it, rent it, or pass it to
          anybody for marketing.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-950">Who else sees it</h2>
        <p className="mt-3">
          The booking email is delivered by an email service provider on our behalf, and this website
          is hosted by a third-party hosting provider. Both process the data only to provide that
          service to us.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-950">Cookies</h2>
        <p className="mt-3">
          This site does not set advertising or tracking cookies, and there is no analytics profiling
          of individual visitors.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-950">Your rights</h2>
        <p className="mt-3">
          Under UK GDPR you can ask what we hold about you, ask us to correct it, or ask us to delete
          it. Email {site.email} or ring {site.phone} and we will sort it. If you are not happy with
          how we have handled your data you can complain to the Information Commissioner&rsquo;s Office
          at ico.org.uk.
        </p>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import ServiceGrid from '@/components/ServiceGrid';
import { ArrowIcon, CheckIcon } from '@/components/Icons';
import { INCLUDED, PROPERTY_EXAMPLES, examplePrice, money } from '@/lib/pricing';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Window, Gutter & Fascia Cleaning | Proper Window Cleaners' },
  description:
    'Domestic and commercial window cleaning, gutter clearing, fascia and soffit cleaning, conservatory roofs and solar panels across the North West.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]),
          serviceSchema({
            name: 'Window cleaning',
            description: 'Exterior window cleaning by water-fed pole for homes and businesses across the North West.',
            url: `${site.url}/services`,
          }),
        ]}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-navy-50/70 to-white">
        <div className="container-page py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Services</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[34px] font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-[48px]">
              Everything that can be reached off a pole
            </h1>
            <p className="mt-4 text-[17.5px] leading-[1.65] text-navy-900/75">
              Windows are the bread and butter, but the same van and the same water do gutters,
              fascias, conservatory roofs and solar panels. Booking them together saves a visit and
              saves you money.
            </p>
          </div>
        </div>
      </section>

      {/* Domestic */}
      <section className="container-page py-14 sm:py-16" id="domestic">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">The main job</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950">
              Domestic window cleaning
            </h2>
            <div className="prose-local mt-5">
              <p>
                A water-fed pole, a tank of purified water and a soft brush. The glass is scrubbed,
                the frames are washed and the whole lot is rinsed with water so pure there is nothing
                left in it to dry as a mark. That is why we do not need to leather off, and why the
                windows still look right a fortnight later.
              </p>
              <p>
                Everything is done from ground level. No ladder on your gutter, nobody at your bedroom
                window, no need for you to be home. If we can get to the back you get the back done,
                and if the gate is locked you tell us on the booking form and we work around it.
              </p>
              <p>
                Rounds run weekly, fortnightly, monthly, eight-weekly or quarterly, and one-off cleans
                are fine too — end of tenancy, before a viewing, after the builders have gone.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="btn-primary">Get my price <ArrowIcon width={17} height={17} /></Link>
              <Link href="/prices" className="btn-ghost">See the price list</Link>
            </div>
          </div>

          <div className="rounded-3xl border border-navy-100 bg-navy-50/50 p-8">
            <h3 className="text-[18px] font-bold text-navy-950">In every single clean</h3>
            <ul className="mt-4 space-y-3">
              {INCLUDED.map((i) => (
                <li key={i} className="flex items-start gap-3 text-[16px] text-navy-900/85">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <CheckIcon width={14} height={14} />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-navy-200/60 pt-6">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-navy-900/50">Typical monthly price</p>
              <dl className="mt-3 space-y-2 text-[15px]">
                {PROPERTY_EXAMPLES.slice(1, 6).map((ex) => (
                  <div key={ex.id} className="flex justify-between border-b border-navy-200/50 pb-2 last:border-0">
                    <dt className="text-navy-900/75">{ex.name}</dt>
                    <dd className="font-bold tabular-nums text-navy-700">{money(examplePrice(ex))}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial */}
      <section className="border-y border-navy-100 bg-navy-50/40 py-14 sm:py-16" id="commercial">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">For businesses</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950">
              Commercial window cleaning
            </h2>
            <div className="prose-local mt-5">
              <p>
                Shopfronts, salons, dental practices, offices, pubs, schools and small industrial units.
                Most commercial customers go weekly or fortnightly, because a shopfront on a main road
                looks tired within days and it is the first thing a customer sees.
              </p>
              <p>
                We work early where that suits, so the glass is done before you open. Invoicing is
                monthly, public liability cover is in place, and we will send the certificate straight
                over if your landlord or managing agent wants it on file.
              </p>
              <p>
                Anything above roughly three storeys is outside what a pole can reach safely, and we
                will say so rather than take the booking. For low-rise, we are usually a lot cheaper
                than a firm running a cherry picker.
              </p>
            </div>
            <div className="mt-7">
              <a href={site.phoneHref} className="btn-primary">Talk to Lewis about a contract</a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: 'Before you open', b: 'Early starts on request so nobody is working round a pole in the doorway.' },
              { t: 'Monthly invoicing', b: 'One invoice, one payment, proper records for the books.' },
              { t: 'Insurance on file', b: 'Public liability certificate sent over without you having to chase.' },
              { t: 'No long tie-in', b: 'A month either way. If it stops working for you, it stops.' },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-navy-100 bg-white p-6">
                <h3 className="text-[16px] font-bold text-navy-950">{c.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-navy-900/70">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">While we are there</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950">
            The other jobs
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-navy-900/72">
            All done off the same pole system, all quoted per job. Two together is cheaper than two
            separate visits, every time.
          </p>
        </div>
        <div className="mt-8"><ServiceGrid /></div>
      </section>

      <CtaBand />
      <div className="pb-16" />
    </>
  );
}

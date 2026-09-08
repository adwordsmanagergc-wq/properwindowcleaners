import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import { ArrowIcon, CheckIcon, PhoneIcon } from '@/components/Icons';
import { areasAlphabetical } from '@/lib/areas';
import { money } from '@/lib/pricing';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { getService, serviceDetails } from '@/lib/services';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: { absolute: `${service.title} | Proper Window Cleaners` },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = serviceDetails.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.name, url: `/services/${service.slug}` },
          ]),
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            url: `${site.url}/services/${service.slug}`,
          }),
          faqSchema(service.faqs),
        ]}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-navy-50/70 to-white">
        <div className="container-page py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-5 text-[13.5px] text-navy-900/55">
            <Link href="/" className="hover:text-navy-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-navy-700">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-navy-900/80">{service.name}</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-[34px] font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-[46px]">
                {service.name}
              </h1>
              <p className="mt-4 max-w-2xl text-[17.5px] leading-[1.65] text-navy-900/75">{service.lead}</p>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-navy-900/50">Prices from</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-4xl font-extrabold text-navy-700">
                {money(service.from)}
              </p>
              <p className="text-[13.5px] text-navy-900/55">{service.unit}</p>
              <Link href="/book" className="btn-primary mt-4 w-full !py-3">Get a quote</Link>
              <a href={site.phoneHref} className="btn-ghost mt-2 w-full !py-3 !text-sm">
                <PhoneIcon width={16} height={16} /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div>
            <div className="prose-local max-w-2xl">
              {service.body.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.bullets.map((b) => (
                <div key={b.title} className="rounded-2xl border border-navy-100 p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                      <CheckIcon width={15} height={15} />
                    </span>
                    <h2 className="text-[16.5px] font-bold text-navy-950">{b.title}</h2>
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-navy-900/72">{b.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 max-w-2xl">
              <Faq items={service.faqs} title={`${service.name} — common questions`} />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-6">
              <h2 className="text-[16.5px] font-bold text-navy-950">Book two, pay less</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-navy-900/72">
                Most of the cost of these jobs is having somebody there at all. Put two together and
                the second one comes down.
              </p>
              <ul className="mt-4 space-y-2.5">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="group flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 transition-colors hover:bg-white/70">
                      <span className="text-[14.5px] font-semibold text-navy-900">{s.name}</span>
                      <span className="shrink-0 text-[13.5px] font-bold text-navy-700">{money(s.from)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-navy-100 p-6">
              <h2 className="text-[16.5px] font-bold text-navy-950">Where we do it</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-navy-900/72">
                Across all {areasAlphabetical.length} towns on the round.
              </p>
              <Link href="/areas" className="mt-3 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-navy-700">
                See every area <ArrowIcon width={15} height={15} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title={`Want a price for ${service.name.toLowerCase()}?`}
        body="Tick it on the booking form and Lewis will come back with a firm figure once he has seen what is involved. No obligation either way."
      />
      <div className="pb-16" />
    </>
  );
}

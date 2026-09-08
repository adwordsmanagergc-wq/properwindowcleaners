import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { ArrowIcon, PinIcon } from '@/components/Icons';
import { allPostcodes, areas, areasByCounty } from '@/lib/areas';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Areas We Cover | Proper Window Cleaners' },
  description: `Window cleaning across ${areas.length} North West towns including Bolton, Bury, Wigan, Manchester, Chorley and Preston. Find your town for local prices.`,
  alternates: { canonical: '/areas' },
};

export default function AreasPage() {
  const groups = areasByCounty();
  const postcodes = allPostcodes();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Areas', url: '/areas' }])} />

      <section className="border-b border-navy-100 bg-gradient-to-b from-navy-50/70 to-white">
        <div className="container-page py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Areas covered</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[34px] font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-[48px]">
              {areas.length} towns across the North West
            </h1>
            <p className="mt-4 text-[17.5px] leading-[1.65] text-navy-900/75">
              The round is based in {site.baseTown} and works outwards. Local streets get done early in
              the week, and the longer runs into Lancashire happen on set days so the travelling makes
              sense. Pick your town to see what we cover and what it costs.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        {groups.map((group) => (
          <div key={group.county} className="mb-14 last:mb-0">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy-950">
              {group.county}
            </h2>
            <p className="mt-2 text-[15.5px] text-navy-900/65">{group.areas.length} towns on the round</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/window-cleaning/${a.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-navy-100 p-5 transition-all hover:border-navy-300 hover:shadow-[0_8px_30px_-16px_rgba(23,49,84,.4)]"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-[17px] font-bold text-navy-950">{a.name}</span>
                      <span className="shrink-0 rounded-full bg-navy-50 px-2.5 py-1 text-[12px] font-semibold text-navy-700">
                        {a.postcodes.join(' ')}
                      </span>
                    </span>
                    <span className="mt-2 flex-1 text-[14px] leading-relaxed text-navy-900/65">
                      {a.neighbourhoods.slice(0, 4).join(' · ')}
                    </span>
                    <span className="mt-3 flex items-center gap-1.5 border-t border-navy-100 pt-3 text-[13.5px] font-semibold text-navy-700">
                      <PinIcon width={14} height={14} className="text-sky-600" />
                      {a.roundDay}
                      <ArrowIcon width={14} height={14} className="ml-auto transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-7">
          <h2 className="text-[18px] font-bold text-navy-950">Postcodes on the round</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-navy-900/70">
            If your postcode district is in this list we are almost certainly already on your side of
            the map.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {postcodes.map((pc) => (
              <li key={pc} className="rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-[13.5px] font-semibold text-navy-800">
                {pc}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[15px] leading-relaxed text-navy-900/70">
            Not listed? It is still worth a call on{' '}
            <a href={site.phoneHref} className="font-semibold text-navy-700 underline">{site.phone}</a>.
            New areas usually start because one person asked.
          </p>
        </div>
      </section>

      <CtaBand />
      <div className="pb-16" />
    </>
  );
}

import Link from 'next/link';
import { areasAlphabetical, type Area } from '@/lib/areas';
import { PinIcon } from './Icons';

export default function AreaLinks({
  areas = areasAlphabetical,
  heading = 'Where we clean',
  intro,
}: {
  areas?: Area[];
  heading?: string;
  intro?: string;
}) {
  return (
    <section className="container-page">
      <div className="max-w-2xl">
        <p className="eyebrow">Areas covered</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950 sm:text-4xl">
          {heading}
        </h2>
        {intro && <p className="mt-4 text-[17px] leading-relaxed text-navy-900/75">{intro}</p>}
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {areas.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/window-cleaning/${a.slug}`}
              className="group flex items-center gap-2 rounded-xl border border-navy-100 px-3.5 py-3 transition-colors hover:border-navy-300 hover:bg-navy-50"
            >
              <PinIcon width={16} height={16} className="shrink-0 text-sky-600" />
              <span className="text-[14.5px] font-semibold text-navy-900 group-hover:text-navy-700">{a.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

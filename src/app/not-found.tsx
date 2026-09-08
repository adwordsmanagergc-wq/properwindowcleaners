import Link from 'next/link';
import { areasAlphabetical } from '@/lib/areas';
import { site } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="container-page py-20 text-center sm:py-28">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold text-navy-950">
        That page has been cleaned away
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-navy-900/72">
        Whatever you were after is not here. Try the price calculator, or pick your town below.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/book" className="btn-primary">Get my price</Link>
        <a href={site.phoneHref} className="btn-ghost">Ring {site.phone}</a>
      </div>
      <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2">
        {areasAlphabetical.map((a) => (
          <li key={a.slug}>
            <Link href={`/window-cleaning/${a.slug}`} className="rounded-full border border-navy-200 px-3.5 py-1.5 text-[13.5px] font-medium text-navy-800 hover:bg-navy-50">
              {a.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

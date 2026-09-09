import Image from 'next/image';
import Link from 'next/link';
import { areasAlphabetical } from '@/lib/areas';
import { ADDON_SERVICES } from '@/lib/pricing';
import { site } from '@/lib/site';
import { MailIcon, PhoneIcon, WhatsAppIcon } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-navy-950 text-white/70">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo-transparent.png"
              alt={site.name}
              width={640}
              height={556}
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed">
              Family-run window cleaners based in {site.baseTown}, working across {site.region}.
              Family-run, {site.yearsExperience} years on the glass.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={site.phoneHref} className="btn-white !px-4 !py-2 !text-sm">
                <PhoneIcon width={16} height={16} /> {site.phone}
              </a>
              <a href={site.whatsappHref} className="btn !border !border-white/25 !px-4 !py-2 !text-sm text-white hover:bg-white/10">
                <WhatsAppIcon width={16} height={16} /> WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li><Link className="hover:text-sky-300" href="/services">Domestic window cleaning</Link></li>
              <li><Link className="hover:text-sky-300" href="/services#commercial">Commercial window cleaning</Link></li>
              {ADDON_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link className="hover:text-sky-300" href={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li><Link className="hover:text-sky-300" href="/about">About us</Link></li>
              <li><Link className="hover:text-sky-300" href="/prices">Prices &amp; quote calculator</Link></li>
              <li><Link className="hover:text-sky-300" href="/book">Book a clean</Link></li>
              <li><Link className="hover:text-sky-300" href="/areas">All areas covered</Link></li>
              <li><Link className="hover:text-sky-300" href="/contact">Contact</Link></li>
            </ul>
            <h2 className="mt-7 text-sm font-semibold uppercase tracking-wider text-white">Opening hours</h2>
            <ul className="mt-3 space-y-1.5 text-[14px]">
              {site.hours.map((h) => (
                <li key={h.days}>
                  <span className="text-white/90">{h.days}</span><br />{h.time}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Areas we cover</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
              {areasAlphabetical.map((a) => (
                <li key={a.slug}>
                  <Link className="hover:text-sky-300" href={`/window-cleaning/${a.slug}`}>{a.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-[13.5px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. Family-run in {site.baseTown}.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a className="inline-flex items-center gap-2 hover:text-sky-300" href={site.emailHref}>
              <MailIcon width={15} height={15} /> {site.email}
            </a>
            <Link className="hover:text-sky-300" href="/privacy">Privacy</Link>
            <Link className="hover:text-sky-300" href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

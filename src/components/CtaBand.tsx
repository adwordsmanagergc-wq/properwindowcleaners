import Link from 'next/link';
import { site } from '@/lib/site';
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from './Icons';

export default function CtaBand({
  title = 'Get your price in about thirty seconds',
  body = 'Tell us how many windows you have and how often you want them doing. No card details, no contract, and nothing to pay until the job is done.',
  href = '/book',
  cta = 'Get my price',
}: {
  title?: string;
  body?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section className="container-page">
      <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-14 text-center sm:px-12">
        <div className="shine pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-white/70">{body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={href} className="btn-accent !px-7 !py-3.5">
              {cta} <ArrowIcon width={18} height={18} />
            </Link>
            <a href={site.phoneHref} className="btn-white !px-7 !py-3.5">
              <PhoneIcon width={18} height={18} /> {site.phone}
            </a>
            <a href={site.whatsappHref} className="btn !border !border-white/25 !px-7 !py-3.5 text-white hover:bg-white/10">
              <WhatsAppIcon width={18} height={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

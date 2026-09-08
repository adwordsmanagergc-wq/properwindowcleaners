import Link from 'next/link';
import { ADDON_SERVICES, money } from '@/lib/pricing';
import { ArrowIcon, DropletIcon, HomeIcon, PoleIcon, ShieldIcon } from './Icons';

const ICONS = [DropletIcon, PoleIcon, HomeIcon, ShieldIcon];

export default function ServiceGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ADDON_SERVICES.map((s, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex flex-col rounded-2xl border border-navy-100 p-6 transition-all hover:border-navy-300 hover:shadow-[0_8px_30px_-16px_rgba(23,49,84,.4)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
              <Icon width={22} height={22} />
            </span>
            <h3 className="mt-4 text-[17px] font-bold text-navy-950">{s.name}</h3>
            <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-navy-900/70">{s.blurb}</p>
            <span className="mt-4 flex items-center justify-between border-t border-navy-100 pt-4">
              <span className="text-[15px] font-bold text-navy-700">
                From {money(s.from)}
                <span className="ml-1 text-[12.5px] font-medium text-navy-900/50">{s.unit}</span>
              </span>
              <ArrowIcon width={17} height={17} className="text-navy-400 transition-transform group-hover:translate-x-0.5 group-hover:text-navy-600" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

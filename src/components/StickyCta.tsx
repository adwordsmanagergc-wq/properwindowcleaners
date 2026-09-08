import Link from 'next/link';
import { site } from '@/lib/site';
import { PhoneIcon } from './Icons';

export default function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 p-3 backdrop-blur sm:hidden">
      <div className="flex gap-2">
        <a href={site.phoneHref} className="btn-ghost flex-1 !py-3">
          <PhoneIcon width={17} height={17} /> Call Lewis
        </a>
        <Link href="/book" className="btn-primary flex-1 !py-3">
          Get my price
        </Link>
      </div>
    </div>
  );
}

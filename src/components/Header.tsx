'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';
import { CloseIcon, MenuIcon, PhoneIcon } from './Icons';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="hidden bg-navy-900 text-white lg:block">
        <div className="container-page flex h-9 items-center justify-between text-[13px]">
          <p className="text-white/75">
            Family-run window cleaners covering Bolton and the North West · Fully insured
          </p>
          <div className="flex items-center gap-5">
            <a className="hover:text-sky-300" href={site.emailHref}>{site.email}</a>
            <a className="font-semibold hover:text-sky-300" href={site.phoneHref}>{site.phone}</a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-[80px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
          <Image
            src="/logo.png"
            alt={site.name}
            width={640}
            height={556}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors ${
                  active ? 'bg-navy-50 text-navy-700' : 'text-navy-900/80 hover:bg-navy-50 hover:text-navy-700'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="btn-ghost hidden !px-4 !py-2.5 sm:inline-flex">
            <PhoneIcon width={17} height={17} />
            <span className="hidden xl:inline">{site.phone}</span>
            <span className="xl:hidden">Call</span>
          </a>
          <Link href="/book" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Get my price
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-navy-800 hover:bg-navy-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-navy-100 bg-white lg:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-[16px] font-medium text-navy-900 hover:bg-navy-50"
              >
                {item.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="btn-ghost mt-3">
              <PhoneIcon width={17} height={17} /> {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

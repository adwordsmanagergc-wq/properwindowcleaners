'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { CloseIcon, WhatsAppIcon } from './Icons';

/**
 * Floating WhatsApp button with a small chat panel. The panel is a launcher,
 * not a real inbox. Every path out of it opens WhatsApp with the message
 * already written, so we get context instead of a bare "hi".
 */

const QUICK_MESSAGES = [
  'Hi, can I get a price for my house please?',
  'Hi, when are you next cleaning in my area?',
  'Hi, can I book a one-off clean?',
];

const chatHref = (message: string) => `${site.whatsappHref}?text=${encodeURIComponent(message)}`;

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    /* Clears the mobile sticky CTA bar, and sits under the intro overlay. */
    <div className="wa-dock fixed bottom-[84px] right-4 z-40 sm:bottom-6 sm:right-6">
      {open && (
        <div
          ref={panelRef}
          id="wa-chat-panel"
          role="dialog"
          aria-label="Chat on WhatsApp"
          className="wa-panel absolute bottom-full right-0 mb-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-[0_18px_50px_-12px_rgba(23,49,84,.45)]"
        >
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
              <WhatsAppIcon width={19} height={19} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] font-semibold leading-tight">{site.name}</span>
              <span className="block text-[12.5px] text-white/75">Replies between jobs</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="-mr-1 rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <CloseIcon width={16} height={16} />
            </button>
          </div>

          <div className="bg-[#ece5dd] px-4 py-4">
            <p className="relative max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[14px] leading-[1.5] text-navy-900 shadow-sm">
              Hiya. Send us a message and we will get back to you between jobs. What do you
              need?
            </p>
          </div>

          <div className="space-y-2 border-t border-navy-100 p-3">
            {QUICK_MESSAGES.map((message) => (
              <a
                key={message}
                href={chatHref(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-xl border border-navy-200 px-3.5 py-2.5 text-[13.5px] font-medium text-navy-800 transition-colors hover:border-navy-300 hover:bg-navy-50"
              >
                {message.replace('Hi, ', '').replace(/^./, (c) => c.toUpperCase())}
              </a>
            ))}
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn w-full !bg-[#25D366] !py-2.5 text-white hover:!bg-[#1eb958]"
            >
              <WhatsAppIcon width={17} height={17} /> Write my own message
            </a>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="wa-chat-panel"
        aria-label={open ? 'Close WhatsApp chat' : 'Chat on WhatsApp'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(37,211,102,.7)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075E54] active:scale-95"
      >
        {open ? <CloseIcon width={24} height={24} /> : <WhatsAppIcon width={28} height={28} />}
      </button>
    </div>
  );
}

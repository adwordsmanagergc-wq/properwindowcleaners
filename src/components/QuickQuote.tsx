'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  FREQUENCY,
  MINIMUM_CHARGE,
  STOREY_LABEL,
  money,
  quote,
  type Frequency,
  type Storeys,
} from '@/lib/pricing';
import { ArrowIcon } from './Icons';

const STOREY_OPTIONS: { value: Storeys; label: string; hint: string }[] = [
  { value: 'single', label: 'Single storey', hint: 'Bungalow or flat' },
  { value: 'double', label: 'Two storey', hint: 'Terrace, semi, detached' },
  { value: 'triple', label: 'Three storey', hint: 'Townhouse or loft' },
];

const FREQ_OPTIONS: Frequency[] = ['fortnightly', 'monthly', 'eightweekly', 'oneoff'];

export default function QuickQuote({ areaName }: { areaName?: string }) {
  const [windows, setWindows] = useState(12);
  const [storeys, setStoreys] = useState<Storeys>('double');
  const [frequency, setFrequency] = useState<Frequency>('monthly');

  const result = useMemo(
    () => quote({ windows, storeys, frequency, extras: {} }),
    [windows, storeys, frequency],
  );

  const href = `/book?windows=${windows}&storeys=${storeys}&frequency=${frequency}${
    areaName ? `&area=${encodeURIComponent(areaName)}` : ''
  }`;

  return (
    <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-[0_10px_40px_-18px_rgba(23,49,84,.35)]">
      <div className="border-b border-navy-100 bg-navy-50/60 px-6 py-4">
        <p className="eyebrow">Instant price</p>
        <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-navy-950">
          {areaName ? `What will it cost in ${areaName}?` : 'What will your windows cost?'}
        </h2>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="qq-windows" className="label !mb-0">How many windows?</label>
            <span className="text-sm font-semibold tabular-nums text-navy-700">{windows}</span>
          </div>
          <input
            id="qq-windows"
            type="range"
            min={3}
            max={35}
            value={windows}
            onChange={(e) => setWindows(Number(e.target.value))}
            className="w-full accent-navy-600"
          />
          <p className="mt-1.5 text-[13px] text-navy-900/55">
            Count every pane you can see from outside. Not sure? Guess high — we confirm on the first visit.
          </p>
        </div>

        <fieldset>
          <legend className="label">How high does it go?</legend>
          <div className="grid grid-cols-3 gap-2">
            {STOREY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStoreys(opt.value)}
                aria-pressed={storeys === opt.value}
                className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  storeys === opt.value
                    ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-600'
                    : 'border-navy-200 hover:border-navy-300'
                }`}
              >
                <span className="block text-[13.5px] font-semibold text-navy-950">{opt.label}</span>
                <span className="block text-[12px] text-navy-900/55">{opt.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="label">How often?</legend>
          <div className="grid grid-cols-2 gap-2">
            {FREQ_OPTIONS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFrequency(f)}
                aria-pressed={frequency === f}
                className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  frequency === f
                    ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-600'
                    : 'border-navy-200 hover:border-navy-300'
                }`}
              >
                <span className="block text-[13.5px] font-semibold text-navy-950">{FREQUENCY[f].label}</span>
                <span className="block text-[12px] text-navy-900/55">{FREQUENCY[f].short}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="rounded-2xl bg-navy-950 p-5 text-white">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[13px] uppercase tracking-wider text-white/60">Your price</p>
              <p className="mt-0.5 font-[family-name:var(--font-display)] text-4xl font-extrabold">
                {money(result.perClean)}
                <span className="ml-1.5 text-base font-medium text-white/60">per clean</span>
              </p>
            </div>
            {result.perMonth !== null && frequency !== 'oneoff' && (
              <p className="pb-1.5 text-right text-[13px] leading-tight text-white/70">
                about<br />
                <span className="text-base font-semibold text-white">{money(result.perMonth)}</span> a month
              </p>
            )}
          </div>
          {result.hitMinimum && (
            <p className="mt-2.5 text-[12.5px] text-white/60">
              That is our {money(MINIMUM_CHARGE)} minimum charge for pulling the van over.
            </p>
          )}
          {result.firstCleanWaived && frequency !== 'oneoff' && (
            <p className="mt-2.5 text-[12.5px] text-sky-300">
              No first-clean surcharge on a {FREQUENCY[frequency].label.toLowerCase()} round.
            </p>
          )}
          <Link href={href} className="btn-accent mt-4 w-full">
            Book this clean <ArrowIcon width={17} height={17} />
          </Link>
        </div>

        <p className="text-[12.5px] leading-relaxed text-navy-900/55">
          Covers {STOREY_LABEL[storeys].toLowerCase()} exterior glass, frames and sills. Conservatories,
          extensions and Velux windows are added on the booking page.
        </p>
      </div>
    </div>
  );
}

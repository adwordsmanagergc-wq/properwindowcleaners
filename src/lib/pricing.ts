/**
 * Proper Window Cleaning: pricing engine.
 *
 * Calibrated in Sept 2026 against published North West window cleaning
 * tariffs (Merseyside / Greater Manchester / Lancashire round prices for a
 * regular 4-weekly exterior clean). Our rates are set deliberately BELOW the
 * regional going rate for every property size.
 *
 * Everything below is intentionally in one file: change a number here and
 * the calculator, the price tables and the area pages all follow.
 */

export type Storeys = 'single' | 'double' | 'triple';
export type Frequency = 'weekly' | 'fortnightly' | 'monthly' | 'eightweekly' | 'quarterly' | 'oneoff';

/** Fixed call-out element of every visit (travel, water, wear). */
export const CALL_OUT = 5;

/** Absolute minimum we will pull the van over for. */
export const MINIMUM_CHARGE = 10;

/** Per-window rate, by how high we have to reach. */
export const WINDOW_RATE: Record<Storeys, number> = {
  single: 0.85,
  double: 1.0,
  triple: 1.15,
};

export const STOREY_LABEL: Record<Storeys, string> = {
  single: 'Single storey (bungalow, flat, dormer)',
  double: 'Two storey (terrace, semi, detached)',
  triple: 'Three storey (townhouse, converted loft)',
};

export const FREQUENCY: Record<
  Frequency,
  { label: string; short: string; multiplier: number; blurb: string; popular?: boolean }
> = {
  weekly: {
    label: 'Weekly',
    short: 'Every week',
    multiplier: 0.9,
    blurb: 'Our lowest per-clean rate. Popular with shops, salons and busy family homes on main roads.',
  },
  fortnightly: {
    label: 'Fortnightly',
    short: 'Every 2 weeks',
    multiplier: 0.95,
    blurb: 'Glass never gets chance to go green. Best value if you back onto a main road or the coast.',
  },
  monthly: {
    label: 'Monthly',
    short: 'Every 4 weeks',
    multiplier: 1.0,
    blurb: 'The classic window round. Keeps a house looking cared for all year without thinking about it.',
    popular: true,
  },
  eightweekly: {
    label: '8-weekly',
    short: 'Every 8 weeks',
    multiplier: 1.2,
    blurb: 'Lighter touch for quiet cul-de-sacs and sheltered properties. Costs a bit more per visit.',
  },
  quarterly: {
    label: 'Quarterly',
    short: 'Every 3 months',
    multiplier: 1.45,
    blurb: 'Four visits a year. More work each time, so the per-clean price reflects that.',
  },
  oneoff: {
    label: 'One-off',
    short: 'Just the once',
    multiplier: 1.85,
    blurb: 'End of tenancy, pre-viewing, after the builders. No contract, no comeback.',
  },
};

export const FREQUENCY_ORDER: Frequency[] = [
  'weekly',
  'fortnightly',
  'monthly',
  'eightweekly',
  'quarterly',
  'oneoff',
];

/** Frequencies where we waive the first-clean surcharge as a sign-up offer. */
export const FIRST_CLEAN_SURCHARGE = 0.5;
export const FIRST_CLEAN_WAIVED_FOR: Frequency[] = ['weekly', 'fortnightly', 'monthly'];

export type ExtraId =
  | 'conservatory'
  | 'extension'
  | 'velux'
  | 'garage'
  | 'patio'
  | 'porch';

export const EXTRAS: { id: ExtraId; label: string; price: number; note: string; perUnit?: boolean }[] = [
  { id: 'conservatory', label: 'Conservatory (glass sides)', price: 6, note: 'Sides, frames and door glass every visit. Roof is a separate job.' },
  { id: 'extension', label: 'Rear or side extension', price: 4, note: 'Bi-folds, picture windows and the glass on a newer build-out.' },
  { id: 'velux', label: 'Velux / roof windows', price: 2, note: 'Per window, reached from the pole.', perUnit: true },
  { id: 'garage', label: 'Garage door + windows', price: 2, note: 'Up-and-over or side garage glass.' },
  { id: 'patio', label: 'Patio / French doors', price: 2, note: 'Full-height door glass both sides of the frame.' },
  { id: 'porch', label: 'Porch', price: 2, note: 'Glass porch or storm porch, inside and out.' },
];

/** Frames, sills and doors are included in every clean, never an upsell. */
export const INCLUDED = [
  'All reachable exterior glass',
  'Frames wiped down',
  'Sills and ledges',
  'Front and back door glass',
  'Purified water, no soap residue',
];

/**
 * One-off add-on services, priced per visit rather than per round.
 * Typical North West quotes for these sit well above our "from" prices.
 */
export const ADDON_SERVICES = [
  { slug: 'gutter-clearing', name: 'Gutter clearing', from: 65, unit: 'per house', blurb: 'Vacuumed out from the ground with a camera on the pole, so you see the before and after.' },
  { slug: 'fascia-soffit-cleaning', name: 'Fascia & soffit cleaning', from: 99, unit: 'per house', blurb: 'White uPVC brought back from grey-green. Done alongside a gutter clear it is quicker and cheaper.' },
  { slug: 'conservatory-roof-cleaning', name: 'Conservatory roof cleaning', from: 119, unit: 'per roof', blurb: 'Panels, glazing bars, box gutters and finials. Makes more difference to a room than anything else.' },
  { slug: 'solar-panel-cleaning', name: 'Solar panel cleaning', from: 85, unit: 'per array', blurb: 'Deionised water only, no detergents or abrasives that would void a panel warranty.' },
];

export interface QuoteInput {
  windows: number;
  storeys: Storeys;
  frequency: Frequency;
  extras: Partial<Record<ExtraId, number>>;
}

export interface QuoteResult {
  windowsSubtotal: number;
  extrasSubtotal: number;
  callOut: number;
  beforeFrequency: number;
  perClean: number;
  firstClean: number;
  firstCleanWaived: boolean;
  perMonth: number | null;
  perYear: number | null;
  visitsPerYear: number | null;
  hitMinimum: boolean;
}

const VISITS_PER_YEAR: Record<Frequency, number | null> = {
  weekly: 52,
  fortnightly: 26,
  monthly: 13,
  eightweekly: 6.5,
  quarterly: 4,
  oneoff: null,
};

export function round50(n: number): number {
  return Math.round(n * 2) / 2;
}

export function money(n: number): string {
  return n % 1 === 0 ? `£${n.toFixed(0)}` : `£${n.toFixed(2)}`;
}

export function quote(input: QuoteInput): QuoteResult {
  const windows = Math.max(0, Math.round(input.windows));
  const windowsSubtotal = windows * WINDOW_RATE[input.storeys];

  const extrasSubtotal = EXTRAS.reduce((sum, extra) => {
    const qty = input.extras[extra.id] ?? 0;
    return sum + extra.price * qty;
  }, 0);

  const beforeFrequency = CALL_OUT + windowsSubtotal + extrasSubtotal;
  const raw = beforeFrequency * FREQUENCY[input.frequency].multiplier;

  const hitMinimum = raw < MINIMUM_CHARGE;
  const perClean = round50(Math.max(raw, MINIMUM_CHARGE));

  const firstCleanWaived = FIRST_CLEAN_WAIVED_FOR.includes(input.frequency);
  const firstClean = firstCleanWaived ? perClean : round50(perClean * (1 + FIRST_CLEAN_SURCHARGE));

  const visitsPerYear = VISITS_PER_YEAR[input.frequency];
  const perYear = visitsPerYear ? round50(perClean * visitsPerYear) : null;
  const perMonth = perYear ? round50(perYear / 12) : null;

  return {
    windowsSubtotal,
    extrasSubtotal,
    callOut: CALL_OUT,
    beforeFrequency,
    perClean,
    firstClean,
    firstCleanWaived,
    perMonth,
    perYear,
    visitsPerYear,
    hitMinimum,
  };
}

/** Worked examples used on the prices page and every area page. */
export interface PropertyExample {
  id: string;
  name: string;
  detail: string;
  windows: number;
  storeys: Storeys;
}

export const PROPERTY_EXAMPLES: PropertyExample[] = [
  { id: 'flat', name: 'Flat or apartment', detail: 'Ground or first floor, 5–6 windows', windows: 6, storeys: 'single' },
  { id: 'bungalow', name: 'Bungalow', detail: 'Two-bed, everything at ground level, 8 windows', windows: 8, storeys: 'single' },
  { id: 'terrace', name: 'Two-bed terrace', detail: 'Front and back, 8 windows', windows: 8, storeys: 'double' },
  { id: 'semi', name: 'Three-bed semi', detail: 'The most common house on our round, 12 windows', windows: 12, storeys: 'double' },
  { id: 'detached4', name: 'Four-bed detached', detail: 'Windows on all four elevations, 16 windows', windows: 16, storeys: 'double' },
  { id: 'detached5', name: 'Five-bed detached', detail: 'Larger plot, 22 windows', windows: 22, storeys: 'double' },
  { id: 'townhouse', name: 'Three-storey townhouse', detail: 'Newer estate build, 14 windows', windows: 14, storeys: 'triple' },
];

export function examplePrice(example: PropertyExample, frequency: Frequency = 'monthly'): number {
  return quote({ windows: example.windows, storeys: example.storeys, frequency, extras: {} }).perClean;
}

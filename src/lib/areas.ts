import type { Area } from './areas-schema';
import batch1 from '../../data/areas-1.json';
import batch2 from '../../data/areas-2.json';
import batch3 from '../../data/areas-3.json';

export type { Area, AreaFaq } from './areas-schema';

export const areas: Area[] = [...batch1, ...batch2, ...batch3] as Area[];

export const areasAlphabetical: Area[] = [...areas].sort((a, b) => a.name.localeCompare(b.name));

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

export function areaSlugs(): string[] {
  return areas.map((a) => a.slug);
}

export function nearbyAreas(area: Area): Area[] {
  return area.nearby.map(getArea).filter((a): a is Area => Boolean(a));
}

/** Group by county for the areas index page. */
export function areasByCounty(): { county: string; areas: Area[] }[] {
  const map = new Map<string, Area[]>();
  for (const a of areasAlphabetical) {
    const list = map.get(a.county) ?? [];
    list.push(a);
    map.set(a.county, list);
  }
  return [...map.entries()]
    .map(([county, list]) => ({ county, areas: list }))
    .sort((a, b) => b.areas.length - a.areas.length);
}

/** Every postcode district we mention, de-duplicated, for the footer + schema. */
export function allPostcodes(): string[] {
  return [...new Set(areas.flatMap((a) => a.postcodes))].sort();
}

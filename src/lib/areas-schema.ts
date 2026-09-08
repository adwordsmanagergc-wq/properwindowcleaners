export interface AreaFaq {
  q: string;
  a: string;
}

export interface Area {
  /** URL segment: /window-cleaning/<slug> */
  slug: string;
  /** Display name, e.g. "Westhoughton" */
  name: string;
  /** e.g. "Greater Manchester" | "Lancashire" */
  county: string;
  /** Postcode districts we actually cover here, e.g. ["BL5"] */
  postcodes: string[];
  /** Which day of the week the round is in this area */
  roundDay: string;
  /** Human sentence about getting there from the Bolton base */
  travel: string;
  /** H1-adjacent lead paragraph. 2-3 sentences. Must be unique to this town. */
  intro: string;
  /** Paragraph on the local housing stock and what it means for cleaning */
  housing: string;
  /** Paragraph anchored in real local geography, roads, landmarks, character */
  local: string;
  /** Paragraph on what actually dirties glass here (weather, roads, trees, industry, coast) */
  challenge: string;
  /** Named neighbourhoods, estates and villages covered */
  neighbourhoods: string[];
  /** Real local landmarks used as orientation points */
  landmarks: string[];
  /** 3 FAQs written specifically for this town */
  faqs: AreaFaq[];
  /** Slugs of neighbouring areas for internal linking */
  nearby: string[];
}

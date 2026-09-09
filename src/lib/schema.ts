import { areas } from './areas';
import { site } from './site';

const ID = `${site.url}/#business`;

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': ID,
    name: site.name,
    alternateName: 'Proper Window Cleaning',
    description: `Family-run window cleaners based in ${site.baseTown}, covering ${site.region}. Water-fed pole cleaning for homes and businesses, on weekly, fortnightly, monthly and one-off rounds.`,
    url: site.url,
    telephone: '+44 7406 849859',
    email: site.email,
    image: `${site.url}/hero.jpg`,
    logo: `${site.url}/logo.png`,
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.baseTown,
      addressRegion: site.baseCounty,
      addressCountry: 'GB',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: areas.map((a) => ({ '@type': 'City', name: a.name })),
    openingHoursSpecification: site.openingHoursSpec.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    knowsAbout: [
      'Window cleaning',
      'Water-fed pole cleaning',
      'Gutter clearing',
      'Fascia and soffit cleaning',
      'Conservatory roof cleaning',
      'Solar panel cleaning',
    ],
  };
}

export function serviceSchema(opts: { name: string; description: string; areaName?: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { '@id': ID },
    areaServed: opts.areaName ? { '@type': 'City', name: opts.areaName } : { '@type': 'AdministrativeArea', name: site.region },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}

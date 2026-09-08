export const site = {
  name: 'Proper Window Cleaning',
  legalName: 'Proper Window Cleaning',
  owner: 'Lewis Mac',
  tagline: 'Streak-free windows across the North West',
  /** Override per-environment with NEXT_PUBLIC_SITE_URL (used for canonicals, sitemap and schema). */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.properwindowcleaning.co.uk',
  phone: '07405 538 996',
  phoneHref: 'tel:+447405538996',
  whatsappHref: 'https://wa.me/447405538996',
  email: 'bookings@properwindowcleaning.co.uk',
  emailHref: 'mailto:bookings@properwindowcleaning.co.uk',
  baseTown: 'Bolton',
  baseCounty: 'Greater Manchester',
  region: 'North West England',
  yearsExperience: 20,
  hours: [
    { days: 'Monday – Friday', time: '7:30am – 6:00pm' },
    { days: 'Saturday', time: '8:00am – 4:00pm' },
    { days: 'Sunday', time: 'Closed (answerphone + WhatsApp)' },
  ],
  openingHoursSpec: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '16:00' },
  ],
  geo: { lat: 53.5769, lng: -2.4282 },
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/prices', label: 'Prices' },
  { href: '/areas', label: 'Areas' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

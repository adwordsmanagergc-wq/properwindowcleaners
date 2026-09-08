# Proper Window Cleaners

Marketing and booking site for **Proper Window Cleaners** — a family-run window cleaning
business run by Lewis Mac, based in Bolton and covering 30 towns across the North West.

Built with Next.js 14 (App Router), TypeScript and Tailwind CSS. Every page is statically
generated apart from the booking API route.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project → import the repo**. The framework is detected automatically;
   no build settings need changing.
3. Add the environment variables below under **Settings → Environment Variables**.
4. Point `properwindowcleaning.co.uk` and `www.properwindowcleaning.co.uk` at the project
   under **Settings → Domains**.

## Environment variables

Copy `.env.example` to `.env.local` for local work, and add the same keys in Vercel.

| Variable | What it does |
| --- | --- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com). **Until this is set, the booking form deliberately fails over to WhatsApp / email / phone rather than silently swallowing bookings.** |
| `BOOKINGS_TO` | Where booking emails land. Defaults to `bookings@properwindowcleaning.co.uk`. |
| `BOOKINGS_FROM` | Sender address. Must be on a domain verified in Resend. |

To switch bookings on: create a Resend account, verify `properwindowcleaning.co.uk`
(add the DNS records Resend gives you), create an API key, and paste it into Vercel.
Nothing else needs changing.

---

## Where to change things

Almost everything you would want to edit lives in three files.

### Prices — `src/lib/pricing.ts`

This is the single source of truth. The calculator, the price tables on the home page,
the prices page and all 30 area pages read from it, so changing a number here updates
the whole site.

```
CALL_OUT            fixed element of every visit
MINIMUM_CHARGE      lowest we will pull the van over for
WINDOW_RATE         per-window rate for single / double / triple storey
FREQUENCY           the multiplier for each round frequency
EXTRAS              conservatory, extension, Velux, garage, patio, porch
ADDON_SERVICES      "from" prices for gutters, fascias, roofs, solar
FIRST_CLEAN_SURCHARGE / FIRST_CLEAN_WAIVED_FOR
```

The formula is: `(CALL_OUT + windows × rate + extras) × frequency multiplier`, floored at
`MINIMUM_CHARGE` and rounded to the nearest 50p.

### Business details — `src/lib/site.ts`

Phone, email, opening hours, base town, years of experience, nav links.

### Area page content — `data/areas-1.json`, `areas-2.json`, `areas-3.json`

One object per town. The shape is documented in `src/lib/areas-schema.ts`. To add a town,
add an object to any of the three files and it appears in the nav, the footer, the areas
index, the sitemap and its own page automatically.

**The `roundDay` and `travel` values are placeholders** — they describe which day the round
is in each town, and they were written to be plausible rather than accurate. Go through and
set them to your real week before launch.

---

## Structure

```
src/app/
  page.tsx                       home
  about/                         Lewis's story
  prices/                        full price list + calculator
  book/                          4-step booking flow
  services/                      services index
  services/[slug]/               gutters, fascias, conservatory roofs, solar
  areas/                         index of all 30 towns
  window-cleaning/[area]/        one SEO page per town
  contact/, privacy/, terms/
  api/book/route.ts              booking email endpoint
  sitemap.ts, robots.ts
src/components/                  header, footer, calculator, booking form, etc.
src/lib/                         pricing, site config, areas, schema.org helpers
data/                            area page content
public/                          logo, hero image, favicons
```

## SEO notes

- One `<h1>` per page, unique titles and meta descriptions throughout, canonical URLs set.
- `HomeAndConstructionBusiness`, `Service`, `FAQPage`, `BreadcrumbList` and `Person`
  structured data.
- The 30 area pages were written individually rather than templated. Measured six-word
  phrase overlap between any two of them is under 1%, which is what stops Google treating
  them as doorway pages.
- Fonts are self-hosted (`@fontsource-variable`), so there is no Google Fonts request.

## Deliberately not included

- **No customer reviews or testimonials.** Inventing them would be both dishonest and a
  CMA/ASA problem. Add real ones once you have them — a Google review widget is the
  easiest route.
- **No competitor comparison table.** Prices are set below the regional going rate, but
  publishing a "them vs us" table invites a challenge you would have to evidence.

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { ArrowIcon, CheckIcon, PhoneIcon, PinIcon } from '@/components/Icons';
import { areas } from '@/lib/areas';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'About Us, Bolton Window Cleaners | Proper Window Cleaners' },
  description:
    'Born and bred in Bolton with 20 years cleaning windows across the North West. Family-run, fully insured, and no contracts.',
  alternates: { canonical: '/about' },
};

const VALUES = [
  { title: 'We turn up', body: 'If we said Tuesday, it is Tuesday. If the weather beats us, you get a text the same morning telling you when we are coming instead. Nobody should have to wonder whether their window cleaner still exists.' },
  { title: 'The price is the price', body: 'What the calculator says is what you pay. No first-clean shock, no quiet increase after six months, no charge for frames and sills that should have been in the price all along.' },
  { title: 'One number you can ring', body: 'There is no call centre and no ticket number. The mobile on the van is the mobile we answer. If something is not right, you tell us and we come back and sort it.' },
  { title: 'Look after the house, not just the glass', body: 'No ladders dragged up against your gutters, no boots through the borders, gates shut behind us every time. If your dog is out in the yard, we wait.' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]),
        ]}
      />

      <section className="bg-gradient-to-b from-navy-50/70 to-white">
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow">About us</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[36px] font-extrabold leading-[1.1] tracking-tight text-navy-950 sm:text-[50px]">
              Bolton born, Bolton based, twenty years on the glass
            </h1>
            <p className="mt-5 text-[18px] leading-[1.65] text-navy-900/75">
              Proper Window Cleaners is a family-run round, born and bred in Bolton. We have been
              cleaning windows round these streets for twenty years and have no plans to do anything
              else.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="btn-primary !px-7 !py-3.5">
                Get my price <ArrowIcon width={18} height={18} />
              </Link>
              <a href={site.phoneHref} className="btn-ghost !px-7 !py-3.5">
                <PhoneIcon width={18} height={18} /> {site.phone}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-[0_24px_70px_-30px_rgba(23,49,84,.55)]">
            <Image
              src="/hero.jpg"
              alt={`The ${site.name} van outside Bolton Town Hall`}
              width={1264}
              height={848}
              priority
              sizes="(max-width: 1024px) 100vw, 580px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-3xl prose-local">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950">
            How it started
          </h2>
          <p className="mt-5">
            The first bucket got picked up at sixteen, on a round that covered the terraced streets
            off Chorley Old Road. It was ladders and a squeegee back then, freezing hands in January,
            and a book of names and house numbers kept in the glovebox. The trade got learned the way
            it did for most window cleaners of that generation: badly paid, outdoors, and entirely by
            doing it.
          </p>
          <p>
            Twenty years on, the ladders have gone. The van carries a tank of purified water and a
            carbon pole that reaches the top of most houses from the middle of the drive, which is
            safer for us and a lot less nerve-racking for anyone watching their conservatory roof.
            The book in the glovebox has gone too, replaced by the booking system on this website.
            What has not changed is the round itself. A lot of the houses cleaned twenty years ago
            are still on it.
          </p>

          <h2 className="mt-12 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950">
            Why start Proper Window Cleaners
          </h2>
          <p className="mt-5">
            Anyone who has ever tried to book a window cleaner knows the problem. You ask around, you
            get a number off a neighbour, you send a message, and then you wait. Sometimes nobody
            answers. Sometimes somebody turns up once and you never see them again. And almost nobody
            will tell you what it costs before they have been out to look at the house.
          </p>
          <p>
            That is the whole reason this business exists in the shape it does. We wanted a window
            cleaning round where you can find out the price yourself, at eleven o&rsquo;clock at night
            if that is when you remember, pick the week you want to start, and get a text back
            confirming it. The trade has been run on scraps of paper and missed calls for long enough.
          </p>
          <p>
            The name came out of a conversation at home. Everything gets called professional or
            premium these days. In Bolton, if a job has been done properly, you say it has been done
            proper. That felt closer to the mark.
          </p>

          <h2 className="mt-12 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950">
            The family bit
          </h2>
          <p className="mt-5">
            This is a family business, and the round is built around that. The van is out early so
            everyone is back for teatime and the school run gets done. Saturdays are for catching up
            on the houses that rain lost during the week, and Sundays the phone goes on the side.
          </p>
          <p>
            It also shapes how the work gets priced. A family business does not need to squeeze every
            job for the maximum it will take. It needs the same houses to still be on the round in ten
            years&rsquo; time. That is why the prices on this site are set to be genuinely cheap for
            the North West rather than clever, and why nobody is ever tied into a contract. If you want
            to stop, you send a text and that is the end of it, no hard feelings.
          </p>

          <h2 className="mt-12 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950">
            Where you will find us
          </h2>
          <p className="mt-5">
            The round starts in Bolton and works outwards. Horwich, Westhoughton, Farnworth and Little
            Lever early in the week, Bury and Radcliffe mid-week, and the longer runs out to Chorley,
            Preston, Blackburn and Darwen on set days so the travelling makes sense. Altogether we are
            on {areas.length} towns across Greater Manchester and Lancashire.
          </p>
          <p>
            If you are just outside the list, ring anyway. If there is already a job on your street it
            is usually a yes.
          </p>
        </div>
      </section>

      <section className="border-y border-navy-100 bg-navy-50/40 py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">What we stand on</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-navy-950 sm:text-4xl">
              Four things we do not budge on
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-navy-100 bg-white p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                    <CheckIcon width={18} height={18} />
                  </span>
                  <h3 className="text-[18px] font-bold text-navy-950">{v.title}</h3>
                </div>
                <p className="mt-3 text-[15.5px] leading-relaxed text-navy-900/72">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        {/* min-w-0 on each item: grid items default to min-width:auto, so the long
            email address below would otherwise force the column wider than a phone. */}
        <div className="grid gap-8 rounded-3xl border border-navy-100 p-6 sm:p-10 lg:grid-cols-3">
          <div className="min-w-0">
            <PinIcon width={22} height={22} className="text-sky-600" />
            <h3 className="mt-3 text-[17px] font-bold text-navy-950">Based in {site.baseTown}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-navy-900/70">
              {site.baseCounty}, working across {site.region}. No shop, no office, just the van.
            </p>
          </div>
          <div className="min-w-0">
            <CheckIcon width={22} height={22} className="text-sky-600" />
            <h3 className="mt-3 text-[17px] font-bold text-navy-950">Fully insured</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-navy-900/70">
              Public liability cover on every job, domestic and commercial. Happy to send the certificate
              over if a managing agent needs it.
            </p>
          </div>
          <div className="min-w-0">
            <PhoneIcon width={22} height={22} className="text-sky-600" />
            <h3 className="mt-3 text-[17px] font-bold text-navy-950">One number</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-navy-900/70">
              <a className="font-semibold text-navy-700 underline" href={site.phoneHref}>{site.phone}</a> rings
              us. <a className="font-semibold text-navy-700 underline" href={site.emailHref}>{site.email}</a> reaches
              the same place.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Fancy having it off your list?"
        body="Price your house on the calculator, pick a start date, and we will text you back to confirm the day."
      />
      <div className="pb-16" />
    </>
  );
}

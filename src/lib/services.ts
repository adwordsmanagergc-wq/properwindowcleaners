import { ADDON_SERVICES } from './pricing';

export interface ServiceDetail {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  from: number;
  unit: string;
  lead: string;
  body: string[];
  bullets: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

const DETAIL: Record<string, Omit<ServiceDetail, 'from' | 'unit' | 'name' | 'slug'>> = {
  'gutter-clearing': {
    title: 'Gutter Clearing Bolton & North West',
    metaDescription:
      'Gutter clearing from the ground with a vacuum and camera. Bolton and across the North West. See the before and after on your own phone. From £65.',
    lead:
      'Blocked gutters are the cheapest expensive problem a house has. Left long enough, water runs down the wall instead of the downpipe, and what starts as a bit of moss ends up as a damp patch in the back bedroom.',
    body: [
      'We clear gutters from the ground using a vacuum system on a carbon pole, with a camera on the end. Nothing is dragged across your roof and nobody is stood on a ladder over your conservatory. The debris comes out into the machine rather than down the wall, so there is no mess left in the borders.',
      'The camera matters more than it sounds. Most people have never actually seen inside their own gutters, and a lot of the time the problem is not what they assumed. We show you the footage before we start and again when it is clear, so you know what you paid for. If the run turns out to be sound and only needs a nudge, we say so.',
      'Autumn is the busy season, particularly on the older streets round Bolton and Bury where the trees are mature and the gutters are cast iron. If you back onto anything with leaves on it, once a year is usually the right rhythm. Newer estates with nothing overhanging can often go two or three.',
    ],
    bullets: [
      { title: 'Cleared, not just poked', body: 'Vacuumed out along the full run, including the corners and behind the brackets where compacted silt sits.' },
      { title: 'Camera footage both ways', body: 'You see the state of it before we start and again once it is clear. No taking our word for it.' },
      { title: 'Downpipes checked', body: 'A clear gutter feeding a blocked downpipe is no use to anybody, so we check the flow before we pack up.' },
      { title: 'No ladders on your house', body: 'Everything from the ground. Nothing leaning on your gutters, fascias or conservatory frame.' },
    ],
    faqs: [
      { q: 'How often should gutters be cleared?', a: 'Once a year for most houses, and that is best done in late autumn once the leaves are actually down. If you have mature trees close to the roof, or a lot of moss coming off the tiles, twice a year is more realistic.' },
      { q: 'Can you reach a three-storey or an awkward back?', a: 'Usually yes. The pole reaches around three storeys from firm level ground. Where access is genuinely impossible from below, we will tell you straight rather than take the booking and cause a problem on the day.' },
      { q: 'Do you fix leaks or replace gutters?', a: 'We clear and we diagnose, but we do not fit new guttering. If the camera shows a split length, a dropped bracket or a joint that has failed, you get the footage and can pass it to a roofer knowing exactly what needs doing.' },
    ],
  },
  'fascia-soffit-cleaning': {
    title: 'Fascia & Soffit Cleaning',
    metaDescription:
      'Fascia, soffit and uPVC cleaning across Bolton and the North West. Green algae and road grime removed, no bleach, no ladders. From £99.',
    lead:
      'White uPVC does not stay white in this part of the world. Between the damp, the road film and the green algae that grows on anything north-facing, most fascias are a decent few shades off what they were when they were fitted.',
    body: [
      'The good news is that almost all of it comes off. What looks like permanent staining is generally a layer of algae and traffic film sitting on the surface, and it lifts with the right brush, the right cleaner and enough patience. We work along the whole run — fascia board, soffit underside, the bargeboards on the gable and the exterior of the gutter itself, which is the bit most people forget.',
      'No bleach goes near your plants. Household bleach is what a lot of people reach for and it will strip the colour out of shrubs underneath while doing nothing much for the plastic. We use a uPVC-safe cleaner, rinse it off with purified water and leave the beds alone.',
      'It is worth pairing with a gutter clear if you are having one. The pole and the machine are already up there, so doing both in a single visit is quicker than two separate jobs and the price reflects that.',
    ],
    bullets: [
      { title: 'Fascia, soffit and bargeboards', body: 'The full run, including the gable ends and the underside where the spiders live.' },
      { title: 'Gutter exterior included', body: 'Cleaning the fascia and leaving a green gutter line under it looks worse than not bothering.' },
      { title: 'uPVC-safe, plant-safe', body: 'No bleach, no abrasive pads, nothing that will chalk the plastic or kill what is growing below it.' },
      { title: 'Cheaper alongside gutters', body: 'Booked with a gutter clear it is one visit instead of two, and we knock the difference off.' },
    ],
    faqs: [
      { q: 'Will it definitely come back white?', a: 'Nearly always, but be realistic about very old plastic. uPVC that has been up twenty-odd years can be chalked and slightly yellowed by UV, and no amount of cleaning reverses that. We will tell you honestly what we think it will come up like before you commit.' },
      { q: 'Do you do cladding and porches too?', a: 'Yes. Vertical cladding, porch roofs, dormer cheeks, garage fascia — anything uPVC we can reach from the ground. Mention it on the booking form and we will price the lot together.' },
      { q: 'How long does it stay clean?', a: 'Two to three years for most houses. North-facing runs and anything under trees go green quicker. A regular window round helps, because we can see it happening and give you a nudge before it gets bad again.' },
    ],
  },
  'conservatory-roof-cleaning': {
    title: 'Conservatory Roof Cleaning',
    metaDescription:
      'Conservatory roof cleaning across Bolton and the North West. Panels, glazing bars, box gutters and finials. Glass or polycarbonate. From £119.',
    lead:
      'Nothing changes a room as much as a clean conservatory roof. People spend years thinking their conservatory is dark and then discover the problem was two centimetres of green film sitting above their heads.',
    body: [
      'A roof clean is a proper job rather than a five-minute add-on. The panels themselves are the easy part. What takes the time is the glazing bars, the box gutter where the roof meets the house, the finials and ridge, and the crevices at the eaves where moss packs in hard. Skip those and the roof looks streaky within a fortnight because every shower washes the dirt back down over the clean panels.',
      'Glass and polycarbonate are treated differently. Polycarbonate scratches if you go at it wrong, so it gets a soft brush and a lot of purified water rather than anything aggressive. Self-cleaning glass gets no detergent at all, since that is exactly what ruins the coating. We ask which you have when you book, and if you are not sure we can tell on the day.',
      'Box gutters are worth a specific mention. On most conservatories they are the first thing to block and the last thing anybody looks at, and when they overflow the water goes back into the house wall rather than out. We clear them as part of the roof clean, not as an extra.',
    ],
    bullets: [
      { title: 'Panels, bars, ridge and finials', body: 'The whole roof structure, not just the flat bits you can see from the garden.' },
      { title: 'Box gutter cleared', body: 'Included every time. It is the part most likely to cause a real problem and the part most often skipped.' },
      { title: 'Right method for the material', body: 'Soft brush and pure water on polycarbonate, no detergent on self-cleaning glass.' },
      { title: 'Frames and outside glass too', body: 'The conservatory sides come up with it, so the whole thing matches when we leave.' },
    ],
    faqs: [
      { q: 'Do you clean the inside of the roof?', a: 'We can, but it is a separate job and it depends on the height and what is underneath. Furniture needs moving and the floor covering. Ask when you book and we will have a look at what is involved before quoting.' },
      { q: 'My roof is green all over. Will it come off?', a: 'Almost certainly. Green algae on polycarbonate looks alarming and comes off with surprisingly little drama. What does not fully recover is polycarbonate that has gone brittle and crazed with age, and we would rather warn you about that up front than take your money and disappoint you.' },
      { q: 'How often does a conservatory roof need doing?', a: 'Once a year suits most, and spring is the sensible time — it clears the winter build-up just as you start using the room again. Under overhanging trees you might want it twice.' },
    ],
  },
  'solar-panel-cleaning': {
    title: 'Solar Panel Cleaning',
    metaDescription:
      'Solar panel cleaning across Bolton and the North West. Deionised water only, no detergents or abrasives, cleaned from the ground. From £85.',
    lead:
      'Solar panels are self-cleaning in the same way that a car is self-cleaning: rain shifts the loose stuff and leaves a film of everything else. On a shallow-pitched roof, or anywhere near trees or a main road, that film builds.',
    body: [
      'We clean panels with deionised water and a soft brush from the ground, and nothing else goes on them. No detergents, no polish, no abrasive pads. That is not fussiness — the anti-reflective coating on the panel surface is exactly what those things damage, and most panel warranties are specific about it.',
      'The edges matter as much as the middle. Dirt and moss collect along the bottom frame of each panel, and because a panel array is wired in series, a shaded strip along one row can drag down more output than its size suggests. We work the frame edges properly rather than just sweeping the glass.',
      'Be sensible about what to expect. Cleaning panels is worth doing, but anyone promising you a specific percentage gain is guessing — it depends entirely on how dirty they were, the pitch, and the time of year. What we can tell you is that visibly filmed panels are not doing their best work, and getting them clear costs less than most people assume.',
    ],
    bullets: [
      { title: 'Deionised water only', body: 'Nothing that could void a panel warranty or leave a residue that attracts more dirt.' },
      { title: 'Frame edges done properly', body: 'Where the moss and grime actually collects, and where shading does the most damage to output.' },
      { title: 'From the ground', body: 'Nobody walking on your roof, nothing leaning on the array or the mounting rails.' },
      { title: 'Honest about the benefit', body: 'We will tell you if yours look fine and are not worth doing yet. Plenty are.' },
    ],
    faqs: [
      { q: 'How often should panels be cleaned?', a: 'Once a year is plenty for most domestic arrays in the North West. If you are close to a farm, a main road, or under trees that drop sap, you may want it more often. Shallow-pitched roofs hold dirt more than steep ones.' },
      { q: 'Will it definitely improve my output?', a: 'If they are visibly dirty, yes, but nobody can tell you by how much in advance and we will not pretend otherwise. If they are basically clean already, you are better off saving your money and asking us again next year.' },
      { q: 'Is it safe for my warranty?', a: 'Deionised water and a soft brush is the method most manufacturers specify. We do not use detergents, jet washes or anything abrasive. If your installer has particular instructions, send them over and we will follow them.' },
    ],
  },
};

export const serviceDetails: ServiceDetail[] = ADDON_SERVICES.map((s) => ({
  slug: s.slug,
  name: s.name,
  from: s.from,
  unit: s.unit,
  ...DETAIL[s.slug],
}));

export function getService(slug: string) {
  return serviceDetails.find((s) => s.slug === slug);
}

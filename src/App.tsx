import { useEffect, useRef, useState, type ReactNode } from 'react'

/* Shared primitives. Scroll reveal uses IntersectionObserver, never a scroll
   listener, and collapses to fully visible under prefers-reduced-motion. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Headings stack vertically. Never a split header. */
function SectionHead({ title, body }: { title: string; body?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="display display-md">{title}</h2>
      {body ? <p className="lede mt-6">{body}</p> : null}
    </div>
  )
}

/* Real reef sites we work. Depths and bottom time are the numbers a diver
   actually plans around, so they are stated rather than implied. */
const SITES = [
  {
    name: 'The Slot',
    where: 'Cocos Island, Costa Rica',
    depth: 'to 24 m',
    time: '45 min bottom time',
    drift: 'Gentle current, north to south',
    img: 'https://picsum.photos/id/446/1100/1400',
    alt: 'A diver swimming face down through deep blue water with fine particles rising past the camera',
    w: 1100,
    h: 1400,
  },
  {
    name: 'Blue Hole',
    where: 'Cocos Island, Costa Rica',
    depth: 'to 40 m',
    time: '20 min bottom time',
    drift: 'None, controlled descent',
    img: 'https://picsum.photos/id/537/1200/900',
    alt: 'A bright white streak of surface light cutting across a field of drifting particles in dark blue water',
    w: 1200,
    h: 900,
  },
  {
    name: 'Punta Fee',
    where: 'Cocos Island, Costa Rica',
    depth: 'to 18 m',
    time: '50 min bottom time',
    drift: 'Slack water only',
    img: 'https://picsum.photos/id/581/1200/900',
    alt: 'Several translucent jellyfish drifting through pale blue water against a bright surface',
    w: 1200,
    h: 900,
  },
  {
    name: 'Underwater Falls',
    where: 'Little Cayman',
    depth: 'to 30 m',
    time: '40 min bottom time',
    drift: 'Variable, ask the guide',
    img: 'https://picsum.photos/id/890/1100/1400',
    alt: 'A white wave crashing hard over dark flat rock with spray blowing back across the frame',
    w: 1100,
    h: 1400,
  },
  {
    name: 'Trench Wall',
    where: 'Koh Tao, Thailand',
    depth: 'to 36 m',
    time: '30 min bottom time',
    drift: 'Mild, follows the wall',
    img: 'https://picsum.photos/id/603/1200/900',
    alt: 'A rocky headland of pale weathered stone running out into clear turquoise sea under a blue sky',
    w: 1200,
    h: 900,
  },
  {
    name: 'Shark Point',
    where: 'Koh Tao, Thailand',
    depth: 'to 18 m',
    time: '45 min bottom time',
    drift: 'Gentle, west to east',
    img: 'https://picsum.photos/id/1015/1200/900',
    alt: 'A high view over a wide deep blue bay ringed by steep grey cliffs with a crowd of people on the near cliff edge',
    w: 1200,
    h: 900,
  },
  {
    name: 'Cathedral',
    where: 'Komodo, Indonesia',
    depth: 'to 30 m',
    time: '35 min bottom time',
    drift: 'Strong, only on the right tide',
    img: 'https://picsum.photos/id/874/1200/900',
    alt: 'A black and white photograph of a long haired man swimming underwater above a rippled sand floor',
    w: 1200,
    h: 900,
  },
]

/* Departures as a timetable. Price is per diver, gear and transfers included. */
const TRIPS = [
  {
    date: 'Sat 12 Sep',
    days: 7 days',
    trip: 'Cocos Island, liveaboard',
    room: 'Twin cabin',
    dives: '18 dives, nitrox 32%',
    places: 4,
    price: 2450,
  },
  {
    date: 'Wed 9 Oct',
    days: 6 days',
    trip: 'Cocos Island, liveaboard',
    room: 'Twin cabin',
    dives: '16 dives, nitrox 32%',
    places: 2,
    price: 2380,
  },
  {
    date: 'Sun 3 Nov',
    days: 7 days',
    trip: 'Komodo, Phinisi',
    room: 'Twin cabin',
    dives: '18 dives, nitrox 32%',
    places: 6,
    price: 2190,
  },
  {
    date: 'Fri 22 Nov',
    days: 5 days',
    trip: 'Komodo, Phinisi',
    room: 'Twin cabin',
    dives: '12 dives, nitrox 32%',
    places: 0,
    price: 1760,
  },
  {
    date: 'Thu 5 Feb',
    days: 7 days',
    trip: 'Cocos Island, liveaboard',
    room: 'Twin cabin',
    dives: '18 dives, nitrox 32%',
    places: 5,
    price: 2450,
  },
]

/* Certification paths. Order matters: you cannot skip ahead. */
const PATHS = [
  {
    n: '1',
    title: 'Open Water Diver',
    body: 'Three days, ten dives, logbook issued on the last afternoon. Pool session in the morning of day one so nobody meets the sea for the first time already breathing.',
    days: '3 days',
    depth: '18 m',
    out: '420',
  },
  {
    n: '2',
    title: 'Advanced Open Water',
    body: 'Two days and five dive sites. Depth to 30 m, a navigation dive in open water, and a night dive if the moon allows it. Requires 10 logged dives.',
    days: '2 days',
    depth: '30 m',
    out: '380',
  },
  {
    n: '3',
    title: 'Rescue Diver',
    body: 'Three days. Self rescue, tired diver rescue, and a full scenario underwater. This is the one that changes how you dive for the rest of your life.',
    days: '3 days',
    depth: '30 m',
    out: '540',
  },
  {
    n: '4',
    title: 'Nitrox and Deep Diver',
    body: 'One day of gas planning and analysers, then a 40 m dive with a working decompression plan written before you get wet. Not for everyone, that is fine.',
    days: '1 day',
    depth: '40 m',
    out: '260',
  },
]

/* Two column spec cards. Grouped by system so it reads as kit, not a table. */
const KIT = [
  {
    group: 'Life support',
    rows: [
      { k: 'Regulator', v: 'Apeks XL4, two per diver' },
      { k: 'Nitrox fills', v: '32% standard, 36% on request' },
      { k: 'BCD', v: 'Aqualung Pearl i3, all sizes' },
      { k: 'Masks', v: 'Low volume, own or hired' },
    ],
  },
  {
    group: 'Exposure and safety',
    rows: [
      { k: 'Wetsuit', v: '3 mm full, 5 mm shorty in season' },
      { k: 'Computer', v: 'Suunto Zoop, dive logged' },
      { k: 'Transmitter', v: 'Buddy pressure, mandatory' },
      { k: 'Reel and line', v: '30 m spool, reef spool set up' },
    ],
  },
  {
    group: 'Boat and comms',
    rows: [
      { k: 'Vessel', v: 'Two 12 m hard boats, 12 divers max' },
      { k: 'Oxygen kit', v: 'Full kit on every boat' },
      { k: 'Comms', v: 'VHF, and satellite phone on liveaboards' },
      { k: 'Deck crew', v: 'Skipper plus two crew on every trip' },
    ],
  },
  {
    group: 'What is included',
    rows: [
      { k: 'Tanks', v: '12 L aluminium, filled and tested' },
      { k: 'Transfers', v: 'From town, dock or hotel' },
      { k: 'Marine park fee', v: 'In the liveaboard price' },
      { k: 'Photos', v: 'Shot and sent the same evening' },
    ],
  },
]

const SAFETY = [
  {
    t: 'Medical form before you fly',
    d: 'Everyone completes a health questionnaire and shows a chest X-ray from the last 12 months before the first boat. Forms are checked, not collected.',
  },
  {
    t: 'Two divers, one guide, always',
    d: 'Ratios stay at 4 divers per guide on reef sites. On the Silfra and other penetrations the ratio drops to 1:1 and we run a second line.',
  },
  {
    t: 'The last 20 minutes stop',
    d: 'No dive starts within 18 hours of your last. Computers are configured on the boat, not on trust, and a no-fly flag is set when you surface.',
  },
  {
    t: 'We cancel, and you do not pay',
    d: 'If conditions put the site or the group outside our own limits, the dive is called and the day is refunded. No questions and no credit note.',
  },
  {
    t: 'Nitrox is analysed, not assumed',
    d: 'Every fill is run through an analyser and the percentage is written on the tank. Dive planning uses that number, not the one on the sticker from the shop.',
  },
  {
    t: 'Everyone leaves a contact',
    d: 'A dive plan with your emergency contact goes in the sealed box on the boat. The skipper reads it before the first jump, every day.',
  },
]

export default function App() {
  const [navOpen, setNavOpen] = useState(false)

  const links = ['Sites', 'Departures', 'Training', 'Safety', 'Kit']

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-[var(--color-accent-ink)]"
      >
        Skip to content
      </a>

      {/* ---------------------------------------------------------------- */}
      {/* NAV - single line at desktop, 72px                              */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]/92 backdrop-blur-sm">
        <div className="shell flex h-[72px] items-center justify-between">
          <a
            href="#top"
            className="font-display text-[1.0625rem] font-bold tracking-[-0.03em] text-[var(--color-ink)]"
          >
            Fathom
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[0.875rem] font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-ink)]"
              >
                {item}
              </a>
            ))}
          </nav>

          <a href="#enquiry" className="btn btn-primary hidden md:inline-flex">
            Check places
          </a>

          <button
            type="button"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => setNavOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-[var(--color-hairline)] text-[var(--color-ink)] md:hidden"
          >
            <span className="flex w-4 flex-col gap-[4px]">
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? 'translate-y-[2.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? '-translate-y-[2.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {navOpen ? (
          <div id="mobile-nav" className="border-t border-[var(--color-hairline)] md:hidden">
            <nav className="shell flex flex-col py-4">
              {links.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setNavOpen(false)}
                  className="border-b border-[var(--color-hairline)] py-3.5 text-[1rem] font-medium text-[var(--color-ink)] last:border-b-0"
                >
                  {item}
                </a>
              ))}
              <a
                href="#enquiry"
                onClick={() => setNavOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                Check places
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- */}
        {/* HERO - full bleed photograph, type over it, fits first viewport  */}
        {/* -------------------------------------------------------------- */}
        <section id="top" className="relative">
          <div className="frame scrim h-[calc(100dvh-72px)] min-h-[540px] w-full">
            <img
              src="https://picsum.photos/id/446/2000/1200"
              alt="A diver swimming face down through deep blue water with fine particles rising past the camera"
              width={2000}
              height={1200}
              className="object-cover"
            />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div className="shell pb-14 md:pb-20">
              <div className="pointer-events-auto max-w-3xl">
                <p className="micro mb-6">Dive house, Puntarenas</p>
                <h1 className="display display-xl text-white">
                  We take six divers.
                  <br />
                  Not eight.
                </h1>
                <p className="lede mt-7 text-white/80">
                  Two small boats out of the harbour each morning, and a crew that
                  will turn the dive around if the current says otherwise.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a href="#enquiry" className="btn btn-primary">
                    Check places
                  </a>
                  <a href="#departures" className="btn btn-ghost">
                    2026 departures
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* SITES - asymmetric grid, real photographs, truthful alt text   */}
        {/* -------------------------------------------------------------- */}
        <section id="sites" className="shell py-24 md:py-32">
          <Reveal>
            <SectionHead
              title="Where we dive"
              body="Six sites we run every week, with the depth and the bottom time stated plainly so you can decide before you pay."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <figure>
                <div className="frame aspect-4/5 w-full">
                  <img
                    src={SITES[0].img}
                    alt={SITES[0].alt}
                    width={SITES[0].w}
                    height={SITES[0].h}
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-5">
                  <SiteMeta site={SITES[0]} />
                </figcaption>
              </figure>
            </Reveal>

            <div className="flex flex-col gap-10 md:col-span-1 lg:col-span-7">
              <div className="grid gap-6 sm:grid-cols-2">
                <Reveal delay={70}>
                  <figure>
                    <div className="frame aspect-3/2 w-full">
                      <img
                        src={SITES[1].img}
                        alt={SITES[1].alt}
                        width={SITES[1].w}
                        height={SITES[1].h}
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="mt-5">
                      <SiteMeta site={SITES[1]} />
                    </figcaption>
                  </figure>
                </Reveal>
                <Reveal delay={140}>
                  <figure>
                    <div className="frame aspect-3/2 w-full">
                      <img
                        src={SITES[2].img}
                        alt={SITES[2].alt}
                        width={SITES[2].w}
                        height={SITES[2].h}
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="mt-5">
                      <SiteMeta site={SITES[2]} />
                    </figcaption>
                  </figure>
                </Reveal>
              </div>

              <Reveal delay={90}>
                <figure>
                  <div className="frame aspect-16/9 w-full">
                    <img
                      src={SITES[3].img}
                      alt={SITES[3].alt}
                      width={SITES[3].w}
                      height={SITES[3].h}
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-5">
                    <SiteMeta site={SITES[3]} />
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-12">
              {SITES.slice(4).map((site, i) => (
                <Reveal key={site.name} delay={i * 80}>
                  <figure>
                    <div className="frame aspect-3/2 w-full">
                      <img
                        src={site.img}
                        alt={site.alt}
                        width={site.w}
                        height={site.h}
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="mt-4">
                      <SiteMeta site={site} />
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* DEPARTURES - timetable, prices visible, not three cards         */}
        {/* -------------------------------------------------------------- */}
        <section
          id="departures"
          className="border-y border-[var(--color-hairline)] bg-[var(--color-raise)] py-24 md:py-32"
        >
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Reveal>
                  <SectionHead
                    title="Departures"
                    body="Prices are per diver in a twin cabin, including gear, transfers and the park fee."
                  />
                  <p className="aside mt-9 border-l-2 border-[var(--color-accent)] pl-5">
                    Places are held until Thursday before departure, then released
                    to the waiting list.
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-8">
                <div className="hidden grid-cols-12 gap-4 border-b border-[var(--color-hairline)] pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-mute)] md:grid">
                  <span className="col-span-2">Departs</span>
                  <span className="col-span-4">Trip</span>
                  <span className="col-span-3">Plan</span>
                  <span className="col-span-2">Dives</span>
                  <span className="col-span-1 text-right">Places</span>
                </div>

                <ul>
                  {TRIPS.map((t, i) => (
                    <Reveal key={t.date} delay={i * 60}>
                      <li className="grid gap-2 border-b border-[var(--color-hairline)] py-6 md:grid-cols-12 md:items-baseline md:gap-4">
                        <div className="md:col-span-2">
                          <p className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                            {t.date}
                          </p>
                          <p className="text-[0.8125rem] text-[var(--color-mute)]">
                            {t.days}
                          </p>
                        </div>

                        <div className="md:col-span-4">
                          <p className="text-[0.9375rem] font-medium text-[var(--color-ink)]">
                            {t.trip}
                          </p>
                          <p className="text-[0.8125rem] text-[var(--color-mute)]">
                            {t.room}
                          </p>
                        </div>

                        <div className="md:col-span-3">
                          <p className="text-[0.875rem] text-[var(--color-body)]">
                            {t.dives}
                          </p>
                          <p className="text-[0.8125rem] text-[var(--color-mute)]">
                            Full board, transfers included
                          </p>
                        </div>

                        <div className="md:col-span-2">
                          <p className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                            £{t.price.toLocaleString('en-GB')}
                          </p>
                          <p className="text-[0.8125rem] text-[var(--color-mute)]">
                            per diver
                          </p>
                        </div>

                        <div className="md:col-span-1 md:text-right">
                          {t.places === 0 ? (
                            <span className="text-[0.8125rem] font-semibold text-[var(--color-mute)]">
                              Wait
                            </span>
                          ) : (
                            <span className="text-[0.8125rem] font-semibold text-[var(--color-accent)]">
                              {t.places}
                            </span>
                          )}
                          <p className="text-[0.8125rem] text-[var(--color-mute)]">
                            left
                          </p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ul>

                <p className="mt-7 text-[0.8125rem] text-[var(--color-mute)]">
                  Single cabin supplement £310. Nitrox 36% and rebreathers quoted
                  separately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* TRAINING - numbered rows in dependency order                  */}
        {/* -------------------------------------------------------------- */}
        <section id="training" className="shell py-24 md:py-32">
          <Reveal>
            <SectionHead
              title="Certification paths"
              body="Take them in order. Each one assumes the last, so nobody ends up on a 30 m wall holding a card that does not cover it."
            />
          </Reveal>

          <ol className="mt-16">
            {PATHS.map((p, i) => (
              <Reveal key={p.n} delay={i * 70}>
                <li className="grid gap-5 border-t border-[var(--color-hairline)] py-9 lg:grid-cols-12 lg:gap-8">
                  <p className="font-display text-[2.25rem] font-bold leading-none tracking-[-0.04em] text-[var(--color-accent)] lg:col-span-1">
                    {p.n}
                  </p>

                  <div className="lg:col-span-5">
                    <h3 className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-[54ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                      {p.body}
                    </p>
                  </div>

                  <dl className="grid grid-cols-3 gap-4 lg:col-span-4 lg:col-start-9">
                    <div>
                      <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-mute)]">
                        Length
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-ink)]">
                        {p.days}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-mute)]">
                        Max depth
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-ink)]">
                        {p.depth}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-mute)]">
                        From
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-ink)]">
                        £{p.out}
                      </dd>
                    </div>
                  </dl>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* SAFETY - plain section, no marketing, no image                 */}
        {/* -------------------------------------------------------------- */}
        <section id="safety" className="bg-[var(--color-raise-2)] py-24 md:py-32">
          <div className="shell">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Reveal>
                  <h2 className="display display-lg">
                    The safety
                    <br />
                    part, plainly
                  </h2>
                  <p className="lede mt-7">
                    Most of this is what any competent operator should already do.
                    We publish it anyway, because you should be able to check us on
                    it before you book.
                  </p>
                </Reveal>
              </div>

              <div className="grid gap-x-14 gap-y-10 sm:grid-cols-2 lg:col-span-8">
                {SAFETY.map((s, i) => (
                  <Reveal key={s.t} delay={i * 60}>
                    <div>
                      <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-[var(--color-ink)]">
                        {s.t}
                      </h3>
                      <p className="mt-2.5 max-w-[50ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                        {s.d}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* KIT - two column spec cards, grouped by system                 */}
        {/* -------------------------------------------------------------- */}
        <section id="kit" className="shell py-24 md:py-32">
          <Reveal>
            <SectionHead
              title="What is on the boat"
              body="Everything here is already loaded when you turn up. You bring a passport, a logbook if you have one, and a towel."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {KIT.map((group, i) => (
              <Reveal key={group.group} delay={i * 70}>
                <div className="h-full border border-[var(--color-hairline)] bg-[var(--color-raise)] p-7">
                  <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-[var(--color-accent)]">
                    {group.group}
                  </h3>
                  <dl className="mt-5 space-y-3.5">
                    {group.rows.map((r) => (
                      <div
                        key={r.k}
                        className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 sm:gap-4"
                      >
                        <dt className="text-[0.875rem] font-semibold text-[var(--color-ink)]">
                          {r.k}
                        </dt>
                        <dd className="text-[0.875rem] leading-relaxed text-[var(--color-body)]">
                          {r.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* ENQUIRY - label above input, no placeholder as label           */}
        {/* -------------------------------------------------------------- */}
        <section
          id="enquiry"
          className="border-t border-[var(--color-hairline)] bg-[var(--color-raise)] py-24 md:py-32"
        >
          <div className="shell">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Reveal>
                  <h2 className="display display-lg">
                    Tell us where
                    <br />
                    you are certified.
                  </h2>
                  <p className="lede mt-7">
                    Send your logbook line count and what you want out of the week.
                    We reply with the boat, the guide and the honest answer.
                  </p>

                  <dl className="mt-10 space-y-5">
                    <div>
                      <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                        Dive house
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                        Calle 4, Muelle Uno, Puntarenas, Costa Rica
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                        Email
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                        <a
                          href="mailto:book@fathomdive.travel"
                          className="transition-colors hover:text-[var(--color-accent)]"
                        >
                          book@fathomdive.travel
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                        WhatsApp
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                        +506 8412 5530
                      </dd>
                    </div>
                  </dl>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <Reveal delay={90}>
                  <form className="grid gap-6" noValidate>
                    {[
                      {
                        id: 'name',
                        label: 'Name',
                        type: 'text',
                        hint: 'Who should we put on the boat list.',
                      },
                      {
                        id: 'email',
                        label: 'Email',
                        type: 'email',
                        hint: 'Only used to reply to this enquiry.',
                      },
                      {
                        id: 'cert',
                        label: 'Certification and logged dives',
                        type: 'text',
                        hint: 'For example AOW, 34 logged dives.',
                      },
                      {
                        id: 'weeks',
                        label: 'Dates you can travel',
                        type: 'text',
                        hint: 'A rough window is fine, we will confirm the boat.',
                      },
                      {
                        id: 'note',
                        label: 'Anything else',
                        type: 'textarea',
                        hint: 'Medical notes, camera rig, dietary needs.',
                      },
                    ].map((f) => (
                      <div key={f.id} className="grid gap-2">
                        <label
                          htmlFor={f.id}
                          className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                        >
                          {f.label}
                        </label>
                        {f.type === 'textarea' ? (
                          <textarea
                            id={f.id}
                            name={f.id}
                            rows={4}
                            aria-describedby={`${f.id}-hint`}
                            className="field resize-y"
                          />
                        ) : (
                          <input
                            id={f.id}
                            name={f.id}
                            type={f.type}
                            aria-describedby={`${f.id}-hint`}
                            className="field"
                          />
                        )}
                        <p id={`${f.id}-hint`} className="text-[0.8125rem] text-[var(--color-mute)]">
                          {f.hint}
                        </p>
                      </div>
                    ))}

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button type="submit" className="btn btn-primary">
                        Send enquiry
                      </button>
                      <p className="text-[0.8125rem] text-[var(--color-mute)]">
                        We reply within one working day.
                      </p>
                    </div>
                  </form>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER - Diya Developers credit, small and understated            */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-[var(--color-hairline)] py-12">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[0.875rem] text-[var(--color-mute)]">
              Fathom Dive House, Puntarenas. Registered as a PADI dive centre
              number S-40822.
            </p>
            <nav className="flex flex-wrap gap-x-7 gap-y-2">
              {links.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[0.875rem] text-[var(--color-mute)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <p className="mt-10 text-[0.8125rem] text-[var(--color-mute)]">
            Developed by{' '}
            <a
              href="https://thediyadevelopers.com"
              className="text-[var(--color-body)] underline decoration-[var(--color-hairline)] underline-offset-4 transition-colors hover:text-[var(--color-accent)]"
            >
              Diya Developers
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}

/* One site, stated as a diver would want it: where, how deep, how long. */
function SiteMeta({ site }: { site: (typeof SITES)[number] }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[1.125rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
          {site.name}
        </h3>
        <p className="shrink-0 font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-[var(--color-accent)]">
          {site.depth}
        </p>
      </div>
      <p className="mt-1 text-[0.8125rem] text-[var(--color-mute)]">{site.where}</p>
      <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[0.8125rem] text-[var(--color-body)]">
        <div className="flex gap-2">
          <dt className="text-[var(--color-mute)]">Bottom time</dt>
          <dd>{site.time}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-[var(--color-mute)]">Current</dt>
          <dd>{site.drift}</dd>
        </div>
      </dl>
    </>
  )
}
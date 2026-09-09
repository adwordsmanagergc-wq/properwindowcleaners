'use client';

import { useEffect, useState } from 'react';

/**
 * Soapy-glass intro: the screen starts covered in foam and a squeegee makes
 * three passes across it, clearing a band each time to reveal the site.
 *
 * The markup is server-rendered so the soap is there on the very first paint
 * rather than flashing in after hydration, and the whole animation is CSS:
 * if JS never runs, the passes still play and the overlay ends up fully
 * transparent and click-through. React only unmounts the node afterwards.
 */

const BAND_COUNT = 3;

/* Fixed, not random, so server and client markup always agree. */
const BUBBLES = [
  { l: 6, t: 12, s: 54, d: 0 }, { l: 18, t: 68, s: 30, d: 0.25 },
  { l: 27, t: 30, s: 78, d: 0.1 }, { l: 39, t: 82, s: 42, d: 0.4 },
  { l: 46, t: 18, s: 62, d: 0.55 }, { l: 58, t: 55, s: 34, d: 0.15 },
  { l: 66, t: 8, s: 88, d: 0.3 }, { l: 74, t: 74, s: 46, d: 0.5 },
  { l: 83, t: 36, s: 58, d: 0.05 }, { l: 91, t: 62, s: 38, d: 0.35 },
  { l: 12, t: 44, s: 40, d: 0.6 }, { l: 52, t: 90, s: 50, d: 0.2 },
];

/* Last pass ends at 2.4s; give the fade a moment before tearing it down. */
const TEARDOWN_MS = 2900;

export default function WindowWipeIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), TEARDOWN_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="wc-intro" aria-hidden="true">
      {Array.from({ length: BAND_COUNT }, (_, i) => (
        <div key={i} className={`wc-band wc-band--${i + 1}`}>
          <div className="wc-foam">
            {BUBBLES.map((b, j) => (
              <span
                key={j}
                className="wc-bubble"
                style={{
                  left: `${b.l}%`,
                  top: `${b.t}%`,
                  width: `${b.s}px`,
                  height: `${b.s}px`,
                  animationDelay: `${b.d}s`,
                }}
              />
            ))}
          </div>
          <div className="wc-squeegee" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="wc-mascot" src="/mascot.webp" alt="" width={262} height={480} />
        </div>
      ))}
    </div>
  );
}

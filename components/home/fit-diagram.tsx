"use client";

import { useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

// Geometry is traced 1:1 from the board's 868 px diagram (Fig. 01, pad geometry, front elevation).
const PIVOT_L = { x: 351, y: 326 };
const PIVOT_R = { x: 516, y: 326 };
const ARM = 97; // pivot → pad centre, px
const PAD = { rx: 13, ry: 29 };
const PX_PER_MM = 10.74; // 17.0 mm ↔ 182.6 px between pad faces
const MIN = 14;
const MAX = 22;
const NOMINAL = 17;
const PERIOD_MS = 7000;

function geometry(width: number) {
  const px = width * PX_PER_MM;
  const sin = Math.min(0.95, Math.max(0, (px - (PIVOT_R.x - PIVOT_L.x) + PAD.rx * 2) / (2 * ARM)));
  const cos = Math.sqrt(1 - sin * sin);
  const theta = (Math.asin(sin) * 180) / Math.PI;
  const left = { x: PIVOT_L.x - ARM * sin, y: PIVOT_L.y + ARM * cos };
  const right = { x: PIVOT_R.x + ARM * sin, y: PIVOT_R.y + ARM * cos };
  return { theta, left, right, innerL: left.x + PAD.rx, innerR: right.x - PAD.rx };
}

function caption(width: number) {
  if (width < NOMINAL - 0.4) return "Narrow seat — pads swing in and meet the bridge higher.";
  if (width > NOMINAL + 0.4) return "Wide seat — pads swing out and spread the load lower.";
  return "Nominal seat — pad pressure equalised left and right.";
}

export function FitDiagram() {
  const [width, setWidth] = useState(NOMINAL);
  const [playing, setPlaying] = useState(false);
  const start = useRef<number | null>(null);

  // Autoplay only when the viewer hasn't asked for reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read a browser-only preference after mount
    if (!reduce) setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    // Resume from the current width: solve the phase of w = 18 + 4·sin(φ).
    const phase = Math.asin(Math.max(-1, Math.min(1, (width - 18) / 4)));
    start.current = performance.now() - (phase / (2 * Math.PI)) * PERIOD_MS;
    const tick = (now: number) => {
      const t = (now - (start.current ?? now)) / PERIOD_MS;
      setWidth(18 + 4 * Math.sin(t * 2 * Math.PI));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart only when play state flips
  }, [playing]);

  const g = geometry(width);
  const mm = width.toFixed(1);
  const muted = "color-mix(in srgb, var(--color-cream) 58%, transparent)";
  const leader = "color-mix(in srgb, var(--color-cream) 38%, transparent)";
  const dashed = "color-mix(in srgb, var(--color-cream) 34%, transparent)";

  return (
    <figure className="rounded-sm border border-cream/18">
      <svg viewBox="0 0 868 566" className="block h-auto w-full" role="img" aria-labelledby="fig-title fig-desc">
        <title id="fig-title">Fig. 01, pad geometry, front elevation</title>
        <desc id="fig-desc">
          The sprung β-titanium arms pivot so the self-seating pads sit {mm} mm apart at the bridge.
        </desc>

        <g fontFamily="var(--font-sans)" fill="var(--color-cream)">
          <text x="25" y="31" fontSize="10.5" letterSpacing="1.7" fill={muted}>
            FIG. 01&#160;&#160;&#160;PAD GEOMETRY, FRONT ELEVATION
          </text>
          <text x="842" y="31" fontSize="10.5" letterSpacing="0.8" textAnchor="end" fill={muted}>
            Scale 2:1
          </text>
        </g>

        {/* Corner registration marks */}
        <g stroke={leader} fill="none" strokeWidth="1">
          <path d="M49 91V63h28M818 91V63h-28M49 518v28h28M818 518v28h-28" />
        </g>

        {/* Front elevation */}
        <g stroke="var(--color-cream)" fill="none" strokeWidth="2" strokeLinecap="round">
          <path d="M41 115L113 133M756 133L826 115" />
          <rect x="112" y="105" width="234" height="126" rx="48" />
          <rect x="521" y="105" width="235" height="126" rx="48" />
          <path d="M346 143Q434 99 521 143" />
          <path d="M379 166Q368 184 369 203M489 166Q500 184 499 203" strokeWidth="1.5" opacity="0.8" />
        </g>

        {/* Detail callout: dashed window + projection */}
        <g stroke={dashed} fill="none" strokeWidth="1" strokeDasharray="4 4">
          <rect x="332" y="100" width="204" height="122" />
          <path d="M296 232L209 261M574 232L660 261M434 256V543" />
        </g>

        {/* Magnified bridge */}
        <path d="M291 349A165 165 0 0 1 577 349" stroke="var(--color-cream)" strokeWidth="2" fill="none" />

        {/* Arms + pads (move with bridge width) */}
        <g stroke="var(--color-cream)" strokeWidth="2.5" strokeLinecap="round">
          <line x1={PIVOT_L.x} y1={PIVOT_L.y} x2={g.left.x} y2={g.left.y} />
          <line x1={PIVOT_R.x} y1={PIVOT_R.y} x2={g.right.x} y2={g.right.y} />
        </g>
        <g stroke="var(--color-cream)" strokeWidth="1.5" fill="var(--color-slate-pad)">
          <ellipse cx={g.left.x} cy={g.left.y} rx={PAD.rx} ry={PAD.ry} transform={`rotate(${g.theta} ${g.left.x} ${g.left.y})`} />
          <ellipse cx={g.right.x} cy={g.right.y} rx={PAD.rx} ry={PAD.ry} transform={`rotate(${-g.theta} ${g.right.x} ${g.right.y})`} />
          <circle cx={PIVOT_L.x} cy={PIVOT_L.y} r="5" fill="var(--color-slate)" />
          <circle cx={PIVOT_R.x} cy={PIVOT_R.y} r="5" fill="var(--color-slate)" />
        </g>

        {/* Leaders + annotations */}
        <g stroke={leader} fill="none" strokeWidth="1">
          <path d="M53 285H261L344 306M825 285H606L520 310M825 375H608L551 395" />
        </g>
        <g fontFamily="var(--font-sans)" fill="var(--color-cream)" fontSize="13" letterSpacing="0.4">
          <text x="60" y="277">PIVOT ±12°</text>
          <text x="825" y="277" textAnchor="end">
            SPRUNG β-TITANIUM ARM
          </text>
          <text x="825" y="366" textAnchor="end">
            SELF-SEATING PAD
          </text>
        </g>
        <g fontFamily="var(--font-sans)" fill={muted} fontSize="11.5">
          <text x="60" y="305">pressure equalised</text>
          <text x="825" y="305" textAnchor="end">
            0.9 mm gauge, shot-peened
          </text>
          <text x="825" y="395" textAnchor="end">
            silicone over steel core
          </text>
        </g>

        {/* Dimension */}
        <g stroke="color-mix(in srgb, var(--color-cream) 70%, transparent)" strokeWidth="1.2">
          <path d={`M${g.innerL} 497H${g.innerR}M${g.innerL} 483V511M${g.innerR} 483V511`} />
        </g>
        <text x="434" y="527" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="17" fill="var(--color-cream)">
          {mm} mm
        </text>
        <text x="434" y="551" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11.5" letterSpacing="0.4" fill={muted}>
          BRIDGE WIDTH, SEATED
        </text>
      </svg>

      <div className="mx-6 border-t border-cream/18 pt-4 pb-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:flex-nowrap sm:gap-8">
          <label htmlFor="bridge-width" className="label w-14 shrink-0 text-cream/70">
            Bridge width
          </label>
          <input
            id="bridge-width"
            type="range"
            min={MIN}
            max={MAX}
            step={0.1}
            value={width}
            aria-valuetext={`${mm} millimetres`}
            onChange={(e) => {
              setPlaying(false);
              setWidth(Number(e.target.value));
            }}
            className="fit-range order-last min-w-0 basis-full sm:order-none sm:basis-auto sm:flex-1"
          />
          <output htmlFor="bridge-width" aria-live={playing ? "off" : "polite"} className="ml-auto w-24 shrink-0 text-right font-serif text-[1.375rem] leading-none tabular-nums">
            {mm} mm
          </output>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex h-8 shrink-0 items-center gap-2.5 rounded-xs border border-cream/40 px-3.5 label text-cream transition-colors hover:border-cream"
          >
            <MoveHorizontal aria-hidden className="size-3.5" strokeWidth={1.6} />
            {playing ? "Pause" : "Play"}
          </button>
        </div>
        <p className="mt-4 text-meta text-cream/58" aria-live={playing ? "off" : "polite"}>
          {caption(width)}
        </p>
      </div>
    </figure>
  );
}

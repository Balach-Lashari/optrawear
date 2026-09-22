import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { products } from "@/lib/data";
import { formatAmount } from "@/lib/format";
import { ButtonLink, textAction } from "@/components/ui/button";
import { SectionHead } from "@/components/ui/primitives";
import { SeriesCard } from "@/components/collection/product-card";
import { FitDiagram } from "./fit-diagram";

const stats = [
  { value: "4.8", unit: "g", label: "Frame weight" },
  { value: "±4", unit: "mm", label: "Pad travel" },
  { value: formatAmount(12000), unit: "", label: "From, PKR" },
];

export function Hero() {
  return (
    <section className="surface-slate">
      <div className="page-x grid grid-cols-[minmax(0,1fr)] gap-12 pt-16 pb-14 lg:grid-cols-[26.25rem_minmax(0,1fr)] lg:gap-14">
        <div>
          <p className="flex items-center gap-3 label text-cream/62">
            Limited series <span aria-hidden className="h-px w-6 bg-cream/40" /> 01 / 04
          </p>
          <h1 className="mt-4 text-[clamp(4rem,11vw,6rem)] leading-[0.84] font-light tracking-[-0.025em]">
            Adaptive
            <br />
            Fit
          </h1>
          <p className="mt-10 max-w-[23.75rem] text-body-lg text-cream/82">
            Titanium frames whose nose pads seat themselves. Two sprung β-alloy arms find the bridge of your nose in the first few
            seconds of wear, then hold — no pliers, no return visit to the optician.
          </p>
          <dl className="mt-8 grid grid-cols-3 border-t border-cream/18 pt-6.5">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-2">
                <dt className="label text-cream/62">{s.label}</dt>
                <dd className="font-serif text-[1.75rem] leading-none">
                  {s.value}
                  {s.unit ? <span className="ml-1 text-body text-cream/82">{s.unit}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/adaptive-fit" variant="inverse" size="md">
              Shop the series <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.6} />
            </ButtonLink>
            <ButtonLink href="/houses" variant="inverse-quiet" size="md">
              Book a fitting
            </ButtonLink>
          </div>
        </div>
        <FitDiagram />
      </div>
    </section>
  );
}

const promises = [
  { label: "Est. 2019", lines: ["The first eyewear house", "designed in Pakistan"] },
  { label: "Four houses", lines: ["Karachi · Lahore", "Islamabad · Multan"] },
  { label: "In-house lab", lines: ["Prescription glazing", "in four working days"] },
  { label: "Thirty days", lines: ["Wear them home.", "Change your mind."] },
];

export function PromiseStrip() {
  return (
    <section aria-label="The house" className="border-b border-line">
      <ul className="page-x grid grid-cols-2 lg:grid-cols-[312fr_360fr_360fr_312fr]">
        {promises.map((p, i) => (
          <li
            key={p.label}
            className={
              "py-6.5 max-lg:odd:pr-4 max-lg:even:border-l max-lg:even:border-line max-lg:even:pl-5 max-lg:[&:nth-child(n+3)]:border-t max-lg:[&:nth-child(n+3)]:border-line " +
              (i > 0 ? "lg:border-l lg:border-line lg:pl-7.5" : "")
            }
          >
            <p className="label text-ink-muted">{p.label}</p>
            <p className="mt-2 font-serif text-heading-xs">
              {p.lines[0]}
              <br />
              {p.lines[1]}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const notes = [
  {
    label: "01 — The seat",
    body: (
      <>
        Most frames are bent to your face by hand, once, on the day you buy them. Ours arrive sprung: the pad arms carry a calibrated
        load, so the pads settle onto the sides of your bridge and stay where they settled.
      </>
    ),
  },
  {
    label: "02 — The metal",
    body: (
      <>
        β-titanium at 0.9 mm gauge: light enough to forget, elastic enough to return. Hypoallergenic, and indifferent to Karachi
        humidity — no plating to lift at the temples after a summer.
      </>
    ),
  },
  {
    label: "03 — The lens",
    body: (
      <>
        A stable pad seat holds the optical centre where it was measured.{" "}
        <strong className="font-normal text-ink">In fitting trials, wearers new to progressive lenses adapted 70% faster.</strong> Which
        matters most to the people buying their first pair.
      </>
    ),
  },
];

export function EngineeringNote() {
  return (
    <section className="page-x grid gap-10 pt-16 pb-6 lg:grid-cols-[21.375rem_repeat(3,minmax(0,1fr))] lg:gap-x-8.5">
      <div>
        <h2 className="max-w-[21rem] text-heading-xl [text-wrap:wrap]">A frame that stops asking to be adjusted</h2>
        <Link href="/adaptive-fit/meridian" className={textAction({ tone: "strong", className: "mt-7" })}>
          Read the engineering note <ArrowRight aria-hidden className="size-3" strokeWidth={1.6} />
        </Link>
      </div>
      {notes.map((n) => (
        <article key={n.label} className="pt-1.5">
          <h3 className="border-b border-line pb-3 label text-ink-muted">{n.label}</h3>
          <p className="mt-4 text-small leading-6 text-ink-soft">{n.body}</p>
        </article>
      ))}
    </section>
  );
}

export function SeriesStrip() {
  const featured = ["ravi", "chenab", "kohsar", "meridian"].map((slug) => products.find((p) => p.slug === slug)!);
  return (
    <section className="page-x pt-16 pb-16">
      <SectionHead
        title="The series"
        aside="Eight titanium frames, from PKR 12,000"
        action={
          <Link href="/adaptive-fit" className={textAction()}>
            All frames
          </Link>
        }
      />
      <ul className="grid grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <li key={p.slug} className="border-line even:border-l lg:[&:not(:first-child)]:border-l">
            <SeriesCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HouseLine() {
  return (
    <section className="grid bg-ink lg:grid-cols-[827fr_613fr]">
      <div className="relative aspect-[3/2] bg-slate-deep lg:aspect-auto lg:min-h-[34.4rem]">
        <Image src="/frames/house-line.webp" alt="Meridian in brushed titanium on slate" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
      </div>
      <div className="surface-ink flex flex-col justify-center px-4 py-14 md:px-12">
        <p className="label text-cream/62">The house line</p>
        <h2 className="mt-4 text-display-sm">
          Frames worth
          <br />
          looking twice at.
        </h2>
        <p className="mt-7 max-w-86 text-body text-cream/78">
          Come in, try on, and let us guide you. No pressure, no pushy sales — honest advice and a whole lot of frames.
        </p>
        <ButtonLink href="/houses" variant="inverse" size="md" className="mt-7 self-start label-lg">
          Find your house <MapPin aria-hidden className="size-3.5" strokeWidth={1.6} />
        </ButtonLink>
      </div>
    </section>
  );
}

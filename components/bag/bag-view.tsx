"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Lock } from "lucide-react";
import { useBag, type BagLine } from "@/lib/bag";
import { cn } from "@/lib/cn";
import { finishes, getProduct, lenses, prescription } from "@/lib/data";
import { formatAmount, formatPKR } from "@/lib/format";
import { Button, ButtonLink, textAction } from "@/components/ui/button";
import { Field, Tag } from "@/components/ui/primitives";
import { FrameImage } from "@/components/collection/product-card";
import { PrescriptionTable } from "./prescription-table";

const included = ["Lifetime pad adjustment at any house", "Thirty days to change your mind", "Two-year mechanism warranty", "Glazed in four working days"];

function LineItem({ line }: { line: BagLine }) {
  const { remove, setLens } = useBag();
  const product = getProduct(line.slug)!;
  const lens = lenses[line.lens];
  const progressive = line.lens === "progressive";

  return (
    <li className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-5 gap-y-4 border-b border-line py-6.5 sm:grid-cols-[9.375rem_minmax(0,1fr)_auto] sm:gap-x-6.5">
      <FrameImage src={product.image} alt="" className="aspect-[4/3]" sizes="10rem" />
      <div>
        <p className="flex flex-wrap items-baseline gap-x-2.5">
          <Link href={`/adaptive-fit/${product.slug}`} className="font-serif text-heading-md hover:underline hover:decoration-1 hover:underline-offset-4">
            {product.name}
          </Link>
          <span className="text-micro text-ink-faint">
            {product.ref} · {finishes[line.finish].label} · {line.eye}
          </span>
        </p>
        <p className="mt-2 text-meta text-ink-soft">
          {progressive ? `Progressive lenses · anti-reflective · your reading of ${prescription.taken}` : "Single-vision lenses · anti-reflective · included"}
        </p>
        <div className="mt-3.5 flex gap-4">
          <button
            type="button"
            className={textAction()}
            onClick={() => setLens(line.id, progressive ? "single" : "progressive")}
            aria-label={`Change lenses on ${product.name} to ${progressive ? "single vision" : "progressive"}`}
          >
            Change lenses
          </button>
          <button type="button" className={textAction()} onClick={() => remove(line.id)} aria-label={`Remove ${product.name}`}>
            Remove
          </button>
        </div>
      </div>
      <div className="col-start-2 sm:col-start-3 sm:text-right">
        <p className="text-body-lg text-ink">{formatPKR(product.price + lens.price)}</p>
        <p className="mt-1 text-[0.6875rem] text-ink-muted">
          Frame {formatAmount(product.price)}
          {lens.price ? ` + lenses ${formatAmount(lens.price)}` : ""}
        </p>
      </div>
    </li>
  );
}

/** The city is the last comma-separated part of the address, e.g. "…, F-7/3, Islamabad". */
function deliveryLabel(address: string) {
  const city = address.split(",").at(-1)?.trim();
  return city ? `Delivery, ${city}` : "Delivery";
}

function Summary({ address, onContinue }: { address: string; onContinue: () => void }) {
  const { lines, totals } = useBag();
  const progressiveCount = lines.filter((l) => l.lens === "progressive").length;
  const rows: [string, string][] = [
    [`Frames (${lines.length})`, formatPKR(totals.frames)],
    progressiveCount ? ["Progressive lenses", formatPKR(totals.lenses)] : ["Single-vision lenses", "Included"],
    ["Glazing & fitting", "Included"],
    [deliveryLabel(address), "Free"],
  ];
  return (
    <aside aria-label="Order summary" className="bg-cream-sunken px-4 py-10 md:px-11 lg:border-l lg:border-line">
      <h2 className="label text-ink-muted">Summary</h2>
      <dl className="mt-5 space-y-2.5 text-small">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-ink-soft">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex items-baseline justify-between border-t border-line-strong/70 pt-6">
        <p className="font-serif text-heading-sm">Total</p>
        <p className="font-serif text-heading-lg">{formatPKR(totals.total)}</p>
      </div>
      <Button variant="primary" className="mt-6 w-full" onClick={onContinue} disabled={lines.length === 0}>
        Continue to payment <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.6} />
      </Button>
      <p className="mt-4 flex items-center gap-2 text-[0.6875rem] text-ink-muted">
        <Lock aria-hidden className="size-3.5" strokeWidth={1.5} /> Card, bank transfer or cash on delivery.
      </p>
      <div className="mt-6 border-t border-line-strong/70 pt-6">
        <h3 className="label text-ink-muted">Included with Adaptive Fit</h3>
        <ul className="mt-4 space-y-2.5 text-meta text-ink-soft">
          {included.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <Check aria-hidden className="size-3.5 shrink-0" strokeWidth={1.6} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function BagView() {
  const { lines, hydrated } = useBag();
  const [address, setAddress] = useState("House 14, Street 7, F-7/3, Islamabad");
  const [mobile, setMobile] = useState("+92 300 000 0000");
  const [errors, setErrors] = useState<{ address?: string; mobile?: string }>({});
  const [status, setStatus] = useState<string | null>(null);

  const onContinue = () => {
    const next: typeof errors = {};
    if (!address.trim()) next.address = "Add a delivery address so the lab knows where to send your frames.";
    if (!/^\+?[\d\s]{10,15}$/.test(mobile.trim())) next.mobile = "Enter a mobile number with its country code, like +92 300 000 0000.";
    setErrors(next);
    setStatus(Object.keys(next).length ? null : "Payment isn’t connected on this preview yet.");
  };

  // Until storage is read, `lines` is the seed bag; render a neutral placeholder rather than flash it.
  if (!hydrated) return <div className="min-h-[70vh]" />;

  if (lines.length === 0) {
    return (
      <div className="page-x py-20">
        <h1 className="text-display-md">Your bag</h1>
        <p className="mt-6 max-w-md text-body-lg text-ink-soft">Your bag is empty. Every Adaptive Fit frame is glazed to your prescription in four working days.</p>
        <ButtonLink href="/adaptive-fit" variant="primary" className="mt-8">
          Browse Adaptive Fit
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[90rem] grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_25rem]">
      <div className="px-4 pt-9 pb-14 md:px-8 lg:pr-11 xl:pl-12">
        <h1 className="text-display-md">Your bag</h1>
        <p className="mt-4 text-meta text-ink-muted">
          {lines.length} {lines.length === 1 ? "frame" : "frames"} · glazed in our Karachi lab
        </p>

        <ul className="mt-7.5 border-t border-line">
          {lines.map((line) => (
            <LineItem key={line.id} line={line} />
          ))}
        </ul>

        <section aria-labelledby="rx-title" className="mt-9 rounded-sm border border-line-strong px-4 pt-6 pb-7 sm:px-6.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="rx-title" className="text-heading-sm">
              Your prescription
            </h2>
            <Tag tone="tint">On file · valid to 03/27</Tag>
          </div>
          <p className="mt-3.5 max-w-[32rem] text-meta text-ink-soft">
            We hold the reading from your last visit to the {prescription.house} house. Replace it here, or have us email your optician for a
            fresh one.
          </p>
          <PrescriptionTable readings={prescription.readings} pd={prescription.pd} className="mt-8" />
          <div className="mt-5 flex items-center gap-4.5">
            <label className="inline-flex h-8.5 cursor-pointer items-center rounded-xs border border-line-strong px-4 text-meta font-medium transition-colors hover:border-ink focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-ink">
              Upload a new one
              <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && setStatus(`Uploaded ${e.target.files[0].name}. The lab checks it before glazing.`)} />
            </label>
            <button type="button" className="text-meta font-medium hover:underline" onClick={() => setStatus("We’ll email your optician for a fresh reading and hold your order until it arrives.")}>
              Ask my optician
            </button>
          </div>
        </section>

        <div className="mt-9 grid gap-4.5 sm:grid-cols-2">
          <Field id="deliver-to" label="Deliver to" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" error={errors.address} />
          <Field id="mobile" label="Mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} autoComplete="tel" error={errors.mobile} />
        </div>
        <p role="status" className={cn("mt-5 text-small text-ink-soft", !status && "sr-only")}>
          {status}
        </p>
      </div>
      <Summary address={address} onContinue={onContinue} />
    </div>
  );
}

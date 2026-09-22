"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CircleCheck, Info, ShoppingBag, Truck } from "lucide-react";
import { cn } from "@/lib/cn";
import { finishes, lenses, type FinishId, type LensId, type Product } from "@/lib/data";
import { formatPKR } from "@/lib/format";
import { useBag } from "@/lib/bag";
import { Button, ButtonLink } from "@/components/ui/button";
import { Swatch } from "@/components/ui/primitives";

const sizeLabels = ["narrow", "regular", "wide"] as const;

function OptionLegend({ children }: { children: React.ReactNode }) {
  return <legend className="mb-3 label text-ink-muted">{children}</legend>;
}

/** Visually hidden radio + styled label. Keyboard: arrow keys move within the group. */
function Choice({
  name,
  value,
  checked,
  onChange,
  className,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const id = `${name}-${value}`;
  return (
    <label htmlFor={id} className={cn("relative cursor-pointer", className)}>
      <input id={id} type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      {children}
    </label>
  );
}

export function Configurator({ product }: { product: Product }) {
  const bag = useBag();
  const [finish, setFinish] = useState<FinishId>(product.finishes[0]);
  const [eye, setEye] = useState(product.eye);
  const [lens, setLens] = useState<LensId>("single");
  const [addedAt, setAddedAt] = useState<number | null>(null);
  const status = useRef<HTMLParagraphElement>(null);
  const added = addedAt !== null;

  // Restarts on every add; keeps the message while focus is on its "View bag" link.
  useEffect(() => {
    if (addedAt === null) return;
    const t = setTimeout(() => {
      if (!status.current?.contains(document.activeElement)) setAddedAt(null);
    }, 5000);
    return () => clearTimeout(t);
  }, [addedAt]);

  const sizes = [product.eye - 2, product.eye, product.eye + 2];

  return (
    <div>
      <fieldset>
        <OptionLegend>Finish</OptionLegend>
        <div className="flex flex-wrap gap-2.5">
          {product.finishes.map((f) => (
            <Choice key={f} name="finish" value={f} checked={finish === f} onChange={() => setFinish(f)}>
              <span className="flex h-8.5 items-center gap-2 rounded-xs border border-line-strong px-3 text-meta font-medium transition-colors peer-checked:border-ink peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink-muted">
                <Swatch color={finishes[f].swatch} size={15} />
                {finishes[f].label}
              </span>
            </Choice>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <OptionLegend>Eye size</OptionLegend>
        <div className="inline-flex rounded-xs border border-line-strong">
          {sizes.map((s, i) => (
            <Choice key={s} name="eye" value={String(s)} checked={eye === s} onChange={() => setEye(s)} className={cn(i > 0 && "border-l border-line-strong")}>
              <span className="flex h-8.5 items-center gap-1.5 px-3 text-small transition-colors peer-checked:bg-cream-tint peer-checked:font-medium peer-focus-visible:outline-1 peer-focus-visible:outline-ink hover:bg-cream-tint/60">
                {s} <span className="font-normal text-ink-muted">{sizeLabels[i]}</span>
              </span>
            </Choice>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <OptionLegend>Lenses</OptionLegend>
        <div className="divide-y divide-line rounded-xs border border-line-strong">
          {(Object.keys(lenses) as LensId[]).map((id) => (
            <Choice key={id} name="lens" value={id} checked={lens === id} onChange={() => setLens(id)} className="block">
              <span className="flex h-11 items-center gap-3 px-4 text-small transition-colors peer-focus-visible:outline-1 peer-focus-visible:-outline-offset-2 peer-focus-visible:outline-ink hover:bg-cream-tint/50 peer-checked:[&>.dot]:border-ink peer-checked:[&>.dot>span]:scale-100">
                <span className="dot grid size-4 place-items-center rounded-full border border-line-strong">
                  <span className="size-2 scale-0 rounded-full bg-ink transition-transform duration-(--duration-fast)" />
                </span>
                <span className="flex-1">{lenses[id].label}</span>
                <span className="text-meta text-ink-muted">{lenses[id].price ? `+ ${formatPKR(lenses[id].price)}` : "Included"}</span>
              </span>
            </Choice>
          ))}
        </div>
        <p className="mt-3.5 flex items-center gap-2 text-meta text-ink-muted">
          <Info aria-hidden className="size-3.5 shrink-0" strokeWidth={1.5} />
          <span>
            First time in progressives? A stable pad seat shortened adaptation by <strong className="font-semibold text-ink">70%</strong> in our
            fitting trials.
          </span>
        </p>
      </fieldset>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          variant="primary"
          className="min-w-60 flex-1"
          onClick={() => {
            bag.add({ slug: product.slug, finish, eye, lens });
            setAddedAt(Date.now());
          }}
        >
          Add to bag <ShoppingBag aria-hidden className="size-3.5" strokeWidth={1.6} />
        </Button>
        <ButtonLink href="/houses" variant="outline" className="border-line-strong hover:border-ink">
          Try at a house
        </ButtonLink>
      </div>

      <p ref={status} role="status" className={cn("mt-4 text-small", added ? "text-ink" : "sr-only")}>
        {added ? (
          <>
            Added to bag: {product.name}, {finishes[finish].label.toLowerCase()}, {eye}.{" "}
            <Link href="/bag" className="underline underline-offset-3">
              View bag ({bag.count})
            </Link>
          </>
        ) : null}
      </p>

      <ul className={cn("flex gap-6 text-meta text-ink-muted", added ? "mt-3" : "mt-4")}>
        <li className="flex items-center gap-2">
          <Truck aria-hidden className="size-3.5" strokeWidth={1.5} /> Glazed in 4 days
        </li>
        <li className="flex items-center gap-2">
          <CircleCheck aria-hidden className="size-3.5" strokeWidth={1.5} /> 30-day return
        </li>
      </ul>
    </div>
  );
}

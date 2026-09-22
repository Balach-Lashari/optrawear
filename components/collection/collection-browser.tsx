"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";
import { finishes, products, type FinishId, type Product, type ShapeFacet } from "@/lib/data";
import { Button, ButtonLink } from "@/components/ui/button";
import { ProductCard } from "./product-card";

type Facet = { id: string; label: string; test: (p: Product) => boolean };
type Group = { id: string; label: string; facets: Facet[] };

const shapes: ShapeFacet[] = ["Rectangle", "Panto", "Square", "Rimless"];
const seats: [number, number][] = [
  [14, 16],
  [17, 19],
  [20, 22],
];

const groups: Group[] = [
  { id: "shape", label: "Shape", facets: shapes.map((s) => ({ id: s, label: s, test: (p) => p.shape === s })) },
  {
    id: "bridge",
    label: "Bridge width",
    facets: seats.map(([lo, hi]) => ({ id: `${lo}-${hi}`, label: `${lo}–${hi} mm`, test: (p) => p.seat[0] <= hi && p.seat[1] >= lo })),
  },
  {
    id: "finish",
    label: "Finish",
    facets: (Object.keys(finishes) as FinishId[]).map((f) => ({ id: f, label: finishes[f].label, test: (p) => p.finishes.includes(f) })),
  },
  {
    id: "price",
    label: "Price",
    facets: [
      { id: "lt15", label: "Under 15,000", test: (p) => p.price < 15000 },
      { id: "15-19", label: "15,000–19,000", test: (p) => p.price >= 15000 && p.price <= 19000 },
      { id: "gt19", label: "Above 19,000", test: (p) => p.price > 19000 },
    ],
  },
];

const sorts = {
  newest: { label: "Newest", fn: (a: Product, b: Product) => b.addedAt - a.addedAt },
  price: { label: "Price", fn: (a: Product, b: Product) => a.price - b.price },
  width: { label: "Width", fn: (a: Product, b: Product) => a.eye - b.eye },
} as const;
type SortId = keyof typeof sorts;

const INITIAL = 6;

export function CollectionSort({ sort, onSort, count }: { sort: SortId; onSort: (s: SortId) => void; count: number }) {
  return (
    <div className="flex items-center gap-6">
      <p className="text-meta text-ink-muted" aria-live="polite">
        {count} {count === 1 ? "frame" : "frames"}
      </p>
      <div role="group" aria-label="Sort frames" className="flex rounded-xs border border-line-strong">
        {(Object.keys(sorts) as SortId[]).map((id, i) => (
          <button
            key={id}
            type="button"
            aria-pressed={sort === id}
            onClick={() => onSort(id)}
            className={cn(
              "h-9 px-3 text-small transition-colors",
              i > 0 && "border-l border-line-strong",
              sort === id ? "bg-cream-tint font-medium text-ink" : "text-ink hover:bg-cream-tint/60",
            )}
          >
            {sorts[id].label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FilterGroup({ group, selected, toggle }: { group: Group; selected: Set<string>; toggle: (key: string) => void }) {
  return (
    <fieldset className="mt-7 first:mt-0">
      <legend className="w-full border-b border-line pb-2.5 label text-ink-muted">{group.label}</legend>
      <ul className="mt-3 space-y-1">
        {group.facets.map((f) => {
          const key = `${group.id}:${f.id}`;
          const count = products.filter(f.test).length;
          const id = `facet-${group.id}-${f.id}`;
          return (
            <li key={f.id}>
              <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 py-0.5 text-small">
                <input id={id} type="checkbox" checked={selected.has(key)} onChange={() => toggle(key)} className="peer sr-only" />
                <span
                  aria-hidden
                  className="grid size-3.5 shrink-0 place-items-center rounded-full border border-line-strong peer-checked:border-ink peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink peer-checked:[&>span]:scale-100"
                >
                  <span className="size-1.5 scale-0 rounded-full bg-ink transition-transform duration-(--duration-fast)" />
                </span>
                <span className="flex-1">{f.label}</span>
                <span className="text-micro text-ink-faint">{count}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export function CollectionBrowser() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortId>("newest");
  const [expanded, setExpanded] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (key: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const results = useMemo(() => {
    const active = groups
      .map((g) => g.facets.filter((f) => selected.has(`${g.id}:${f.id}`)))
      .filter((fs) => fs.length > 0);
    // OR within a group, AND across groups.
    return products.filter((p) => active.every((fs) => fs.some((f) => f.test(p)))).sort(sorts[sort].fn);
  }, [selected, sort]);

  const filtering = selected.size > 0;
  const visible = expanded || filtering ? results : results.slice(0, INITIAL);
  const hidden = results.length - visible.length;

  return (
    <>
      <header className="page-x flex flex-col gap-6 pt-10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label text-ink-muted">Frames / Limited series</p>
          <h1 className="mt-2.5 text-[clamp(2.75rem,7vw,4rem)] leading-none tracking-[-0.02em]">Optra Adaptive Fit</h1>
          <p className="mt-6 max-w-[32rem] text-body-lg text-ink-soft">
            Eight titanium frames with self-seating nose pads. Each is glazed to prescription in our Karachi lab and delivered with a fitting
            card.
          </p>
        </div>
        <div className="flex items-center justify-between gap-6">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-small md:hidden"
            aria-expanded={filtersOpen}
            aria-controls="filters"
            onClick={() => setFiltersOpen((v) => !v)}
          >
            <SlidersHorizontal aria-hidden className="size-4" strokeWidth={1.6} /> Filters{filtering ? ` (${selected.size})` : ""}
          </button>
          <CollectionSort sort={sort} onSort={setSort} count={results.length} />
        </div>
      </header>

      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[90rem] grid-cols-[minmax(0,1fr)] md:grid-cols-[14.5rem_minmax(0,1fr)]">
          <aside
            id="filters"
            aria-label="Filters"
            className={cn("border-line px-4 pt-7 pb-10 md:block md:border-r md:px-6.5", filtersOpen ? "block border-b" : "hidden")}
          >
            {groups.map((g) => (
              <FilterGroup key={g.id} group={g} selected={selected} toggle={toggle} />
            ))}
            <div className="mt-8 rounded-xs border border-line-strong p-4.5">
              <p className="font-serif text-[1.0625rem] leading-snug">Not sure of your bridge width?</p>
              <p className="mt-2.5 text-meta text-ink-muted">Adaptive Fit covers 14–22 mm on every frame in the series.</p>
              <ButtonLink href="/houses" variant="quiet" size="sm" className="mt-4">
                Measure at a house
              </ButtonLink>
            </div>
          </aside>

          <section aria-label="Frames" className="px-4 pt-7.5 pb-12 md:pr-8 md:pl-12 xl:pr-12">
            {visible.length === 0 ? (
              <div className="border border-line px-8 py-16 text-center">
                <p className="font-serif text-heading-sm">No frames match these filters.</p>
                <p className="mt-2 text-small text-ink-muted">Every Adaptive Fit frame seats 14–22 mm, so try widening bridge width first.</p>
                <Button variant="outline" size="sm" className="mt-6" onClick={() => setSelected(new Set())}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <ul className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((p, i) => (
                  <li key={p.slug} className="border-r border-b border-line">
                    <ProductCard product={p} priority={i < 3} />
                  </li>
                ))}
              </ul>
            )}

            {hidden > 0 ? (
              <div className="mt-5 flex items-center gap-4.5">
                <span aria-hidden className="h-px flex-1 bg-line" />
                <Button variant="outline" size="md" className="label-lg" onClick={() => setExpanded(true)}>
                  Show the remaining {hidden === 2 ? "two" : hidden}
                </Button>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </>
  );
}

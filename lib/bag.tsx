"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { finishes, getProduct, lenses, type FinishId, type LensId } from "./data";

export type BagLine = {
  id: string;
  slug: string;
  finish: FinishId;
  eye: number;
  lens: LensId;
};

type Bag = {
  lines: BagLine[];
  /** True once stored lines have been read; before that `lines` is the seed. */
  hydrated: boolean;
  count: number;
  add: (line: Omit<BagLine, "id">) => void;
  remove: (id: string) => void;
  setLens: (id: string, lens: LensId) => void;
  totals: { frames: number; lenses: number; total: number };
};

const STORAGE_KEY = "optrawear.bag.v1";

// The board shows a bag holding these two frames; a first visit starts from the same state.
const SEED: BagLine[] = [
  { id: "seed-meridian", slug: "meridian", finish: "titanium", eye: 50, lens: "progressive" },
  { id: "seed-ravi", slug: "ravi", finish: "graphite", eye: 51, lens: "single" },
];

const BagContext = createContext<Bag | null>(null);

function isBagLine(value: unknown): value is BagLine {
  if (typeof value !== "object" || value === null) return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.id === "string" &&
    typeof line.slug === "string" &&
    getProduct(line.slug) !== undefined &&
    typeof line.lens === "string" &&
    Object.hasOwn(lenses, line.lens) &&
    typeof line.finish === "string" &&
    Object.hasOwn(finishes, line.finish) &&
    typeof line.eye === "number"
  );
}

/** Stored lines that still describe a real frame, or null when nothing usable is stored. */
const read = (): BagLine[] | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed.filter(isBagLine) : null;
  } catch {
    return null;
  }
};

const lineId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

const write = (lines: BagLine[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage blocked (private mode): the bag still works for this visit.
  }
};

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>(SEED);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = read();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount
    if (stored) setLines(stored);
    setHydrated(true);
  }, []);

  const update = useCallback((next: (prev: BagLine[]) => BagLine[]) => {
    setLines((prev) => {
      const value = next(prev);
      write(value);
      return value;
    });
  }, []);

  const bag = useMemo<Bag>(() => {
    const totals = lines.reduce(
      (acc, l) => {
        const product = getProduct(l.slug);
        if (!product) return acc;
        acc.frames += product.price;
        acc.lenses += lenses[l.lens].price;
        return acc;
      },
      { frames: 0, lenses: 0, total: 0 },
    );
    totals.total = totals.frames + totals.lenses;

    return {
      lines,
      hydrated,
      count: lines.length,
      totals,
      add: (line) => update((prev) => [...prev, { ...line, id: lineId() }]),
      remove: (id) => update((prev) => prev.filter((l) => l.id !== id)),
      setLens: (id, lens) => update((prev) => prev.map((l) => (l.id === id ? { ...l, lens } : l))),
    };
  }, [lines, hydrated, update]);

  return <BagContext value={bag}>{children}</BagContext>;
}

export function useBag() {
  const bag = useContext(BagContext);
  if (!bag) throw new Error("useBag must be used inside <BagProvider>");
  return bag;
}

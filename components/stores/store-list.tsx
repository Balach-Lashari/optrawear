"use client";

import { useState } from "react";
import { Clock, Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import { stores } from "@/lib/data";
import { textAction } from "@/components/ui/button";
import { inputClass, Tag } from "@/components/ui/primitives";

const directions = (address: string, city: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${city}, Pakistan`)}`;

export function StoreList() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const results = q ? stores.filter((s) => `${s.city} ${s.address}`.toLowerCase().includes(q)) : stores;

  return (
    <div>
      <label htmlFor="house-search" className="sr-only">
        Search houses by city, area or postcode
      </label>
      <input
        id="house-search"
        type="search"
        placeholder="City, area or postcode"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`${inputClass} mt-8 h-9`}
      />
      <ul className="mt-6.5 border-t border-line">
        {results.map((s) => (
          <li key={s.city} className="border-b border-line pt-5 pb-6">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="flex items-center gap-2.5 text-[1.375rem]">
                {s.city}
                {s.opening ? <Tag className="text-[0.625rem]">{s.opening}</Tag> : null}
              </h2>
              <span className="text-[0.6875rem] text-ink-faint">{s.distance ?? (
                  <>
                    <span aria-hidden>—</span>
                    <span className="sr-only">Nearest to you</span>
                  </>
                )}</span>
            </div>
            <p className="mt-2 text-small text-ink-soft">{s.address}</p>
            <p className="mt-2 flex flex-wrap gap-x-5 text-[0.6875rem] text-ink-muted">
              <span className="flex items-center gap-1.5">
                <Clock aria-hidden className="size-3" strokeWidth={1.5} /> {s.hours}
              </span>
              <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-ink">
                <Phone aria-hidden className="size-3" strokeWidth={1.5} /> {s.phone}
              </a>
            </p>
            <p className="mt-3 flex gap-4">
              <a href={`tel:${s.phone.replace(/\s/g, "")}`} className={textAction({ tone: "strong" })}>
                Book a fitting
              </a>
              <a href={directions(s.address, s.city)} target="_blank" rel="noreferrer" className={textAction()}>
                Directions
              </a>
            </p>
          </li>
        ))}
      </ul>
      <p role="status" className={cn("mt-6 text-small text-ink-soft", results.length > 0 && "sr-only")}>
        {results.length === 0 ? `No house matches “${query}”. We deliver nationwide, glazed in Karachi.` : null}
      </p>
    </div>
  );
}

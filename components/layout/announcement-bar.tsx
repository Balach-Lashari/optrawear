import { Glasses } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="surface-ink">
      <div className="page-x flex h-7.5 items-center justify-between gap-6 label text-cream/80">
        <p className="flex items-center gap-2.5 truncate">
          <Glasses aria-hidden className="size-3.5 shrink-0" strokeWidth={1.5} />
          <span className="truncate">Eyewear made in Pakistan since 2019 — the country’s first house of frames</span>
        </p>
        <p className="hidden md:block">Free lens fitting at all four stores</p>
      </div>
    </div>
  );
}

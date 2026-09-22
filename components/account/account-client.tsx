"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { textAction } from "@/components/ui/button";

const nav = [
  { label: "Orders", href: "/account/orders" },
  { label: "Prescriptions", href: "/account/prescriptions" },
  { label: "Fit card", href: "/account/fit-card" },
  { label: "Saved frames", href: "/account/saved-frames" },
  { label: "Addresses", href: "/account/addresses" },
];

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Account">
      <p className="px-0 label text-ink-muted">Account</p>
      <ul className="mt-4.5 flex gap-1 overflow-x-auto md:block md:space-y-0.5">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block rounded-xs px-3 py-2 text-body whitespace-nowrap transition-colors",
                  active ? "bg-cream-press text-ink" : "text-ink-soft hover:bg-cream-tint hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Upload control that reads like a button; used by "Add a reading" and "Replace". */
export function ReadingUpload({ className, children, onFile }: { className?: string; children: React.ReactNode; onFile: (name: string) => void }) {
  return (
    <label className={cn("cursor-pointer focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-ink", className)}>
      {children}
      <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0].name)} />
    </label>
  );
}

export function AddReading() {
  const [file, setFile] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <ReadingUpload
        onFile={setFile}
        className="inline-flex h-8.5 items-center rounded-xs border border-line-strong px-4 text-meta font-medium transition-colors hover:border-ink"
      >
        Add a reading
      </ReadingUpload>
      <p role="status" className={cn("text-[0.6875rem] text-ink-muted", !file && "sr-only")}>
        {file ? `Added ${file}. The lab checks it within a day.` : null}
      </p>
    </div>
  );
}

export function PrescriptionActions() {
  const [status, setStatus] = useState<string | null>(null);
  return (
    <>
      <div className="mt-5 flex flex-wrap gap-4">
        <Link href="/adaptive-fit" className={textAction({ tone: "strong" })}>
          Use for a new order
        </Link>
        <button type="button" className={textAction()} onClick={() => window.print()}>
          Print or save PDF
        </button>
        <ReadingUpload className={textAction()} onFile={(name) => setStatus(`Replaced with ${name}. The lab checks it within a day.`)}>
          Replace
        </ReadingUpload>
      </div>
      <p role="status" className={cn("mt-3 text-meta text-ink-soft", !status && "sr-only")}>
        {status}
      </p>
    </>
  );
}

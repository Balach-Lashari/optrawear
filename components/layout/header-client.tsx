"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useBag } from "@/lib/bag";

const nav = [
  { label: "Adaptive Fit", href: "/adaptive-fit" },
  { label: "Optical", href: "/optical" },
  { label: "Sun", href: "/sun" },
  { label: "Lenses", href: "/lenses" },
  { label: "Houses", href: "/houses" },
];

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/** "page" on the item's own route, "true" on its descendants (e.g. a frame under Adaptive Fit). */
function ariaCurrent(pathname: string, href: string) {
  if (pathname === href) return "page";
  if (pathname.startsWith(`${href}/`)) return "true";
  return undefined;
}

export function HeaderNav() {
  const pathname = usePathname();
  // Home is the Adaptive Fit launch, so the series stays underlined there.
  const current = pathname === "/" ? "/adaptive-fit" : pathname;
  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-7.5">
        {nav.map((item) => {
          const active = isActive(current, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={ariaCurrent(pathname, item.href)}
                className={cn(
                  "border-b py-1 text-body transition-colors duration-(--duration-fast)",
                  active ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink",
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

const iconButton = "grid size-9 place-items-center rounded-xs text-ink transition-colors hover:bg-cream-tint";

export function HeaderIcons() {
  const { count, hydrated } = useBag();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="ml-auto flex items-center gap-0.5">
      {/* Search isn't designed yet; until it is, the icon opens the full series. */}
      <Link href="/adaptive-fit" className={iconButton} aria-label="Browse all frames">
        <Search className="size-4" strokeWidth={1.6} />
      </Link>
      <Link href="/account/prescriptions" className={iconButton} aria-label="Account">
        <User className="size-4" strokeWidth={1.6} />
      </Link>
      <Link href="/bag" className={cn(iconButton, "flex w-auto items-center gap-1.5 px-2")} aria-label={`Bag, ${count} ${count === 1 ? "frame" : "frames"}`}>
        <ShoppingBag className="size-4" strokeWidth={1.6} />
        {hydrated && count > 0 ? <span className="text-meta">{count}</span> : null}
      </Link>
      <button
        type="button"
        className={cn(iconButton, "md:hidden")}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-4" strokeWidth={1.6} /> : <Menu className="size-4" strokeWidth={1.6} />}
      </button>
      {open ? (
        <nav id="mobile-nav" aria-label="Main" className="absolute inset-x-0 top-full z-20 border-b border-line bg-cream md:hidden">
          <ul className="page-x divide-y divide-line">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={ariaCurrent(pathname, item.href)}
                  className="block py-3.5 font-serif text-heading-sm aria-[current]:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

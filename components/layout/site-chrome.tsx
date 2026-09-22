import Link from "next/link";
import { cn } from "@/lib/cn";
import { account } from "@/lib/data";
import { HeaderNav, HeaderIcons } from "./header-client";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Optrawear home" className={cn("font-serif text-[1.3125rem] leading-none font-medium tracking-[-0.055em]", className)}>
      optrawear.
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="relative border-b border-line bg-cream">
      <div className="page-x flex h-15 items-center gap-10">
        <Logo />
        <HeaderNav />
        <HeaderIcons />
      </div>
    </header>
  );
}

const steps = ["Bag", "Prescription", "Payment"] as const;

export function CheckoutHeader({ current = 0 }: { current?: number }) {
  return (
    <header className="border-b border-line bg-cream">
      <div className="page-x flex h-15 items-center justify-between gap-6">
        <Logo />
        <ol className="flex items-center gap-4 label" aria-label="Checkout steps">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-4">
              {i > 0 ? <span aria-hidden className="hidden h-px w-6 bg-line-strong sm:block" /> : null}
              <span aria-current={i === current ? "step" : undefined} className={i === current ? "text-ink" : "text-ink-muted"}>
                {i + 1} <span className={i === current ? "" : "max-sm:sr-only"}>{step}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}

export function AccountHeader() {
  return (
    <header className="border-b border-line bg-cream">
      <div className="page-x flex h-16.5 items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-3 text-small text-ink-soft">
          <span aria-hidden className="grid size-6.5 place-items-center rounded-full bg-slate text-micro text-cream">
            {account.initials}
          </span>
          {account.name}
        </div>
      </div>
    </header>
  );
}

const footerColumns = [
  {
    title: "Frames",
    links: [
      ["Adaptive Fit", "/adaptive-fit"],
      ["Optical", "/optical"],
      ["Sun", "/sun"],
      ["Gift card", "/gift-card"],
    ],
  },
  {
    title: "Service",
    links: [
      ["Book a fitting", "/houses"],
      ["Lens guide", "/lens-guide"],
      ["Repairs", "/repairs"],
      ["Returns", "/returns"],
    ],
  },
  {
    title: "House",
    links: [
      ["Our story", "/our-story"],
      ["Houses", "/houses"],
      ["Careers", "/careers"],
      ["Press", "/press"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="page-x grid gap-10 pt-12 pb-7 md:grid-cols-[1.35fr_1fr_1fr_1fr] md:gap-0">
        <div>
          <Logo className="text-[1.125rem]" />
          <p className="mt-5 max-w-60 text-meta text-ink-soft">Worth looking at twice. Designed in Karachi, glazed in Karachi.</p>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="label text-ink-muted">{col.title}</p>
            <ul className="mt-3.5 space-y-1">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-small text-ink-soft hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="flex flex-col gap-3 pt-6 text-micro tracking-normal text-ink-muted md:col-span-4 md:flex-row md:items-center md:justify-between md:pt-10">
          <p className="flex gap-6 text-[0.6875rem]">
            <span>© 2026 Optrawear (Pvt) Ltd</span>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </p>
          <p className="text-[0.6875rem]">Adaptation figure from independent fitting trials, n=120, 2025</p>
        </div>
      </div>
    </footer>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line">
      <ol className="page-x flex h-11 items-center gap-2.5 text-meta text-ink-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2.5">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

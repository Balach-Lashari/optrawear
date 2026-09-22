import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/** Tracked-caps label: section names, field names, table heads. */
export function Label({ className, as: Tag = "p", ...props }: React.HTMLAttributes<HTMLElement> & { as?: "p" | "span" | "h2" | "h3" | "dt" | "legend" }) {
  return <Tag className={cn("label text-ink-muted", className)} {...props} />;
}

export const tagVariants = cva("inline-flex h-5.5 items-center rounded-xs px-2.5 label text-micro tracking-[0.14em] whitespace-nowrap", {
  variants: {
    tone: {
      /** Ink outline: merchandising (Series entry, Most seated, Opening ’26). */
      outline: "border border-ink text-ink",
      /** Tint fill: status (Current, On file, In the lab, Delivered). */
      tint: "bg-cream-tint text-ink-soft",
    },
  },
  defaultVariants: { tone: "outline" },
});

export function Tag({ className, tone, ...props }: React.ComponentProps<"span"> & VariantProps<typeof tagVariants>) {
  return <span className={cn(tagVariants({ tone }), className)} {...props} />;
}

/** Finish swatch dot. */
export function Swatch({ color, size = 14, className, label }: { color: string; size?: number; className?: string; label?: string }) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-block shrink-0 rounded-full ring-1 ring-ink/10 ring-inset", className)}
      style={{ width: size, height: size, background: color }}
    />
  );
}

export const inputClass =
  "h-9 w-full rounded-xs border border-line-strong bg-cream px-2.5 text-small text-ink placeholder:text-ink-muted transition-colors duration-(--duration-fast) hover:border-ink-muted focus-visible:border-ink focus-visible:outline-hidden aria-invalid:border-danger";

export function Field({
  label,
  id,
  error,
  className,
  ...props
}: React.ComponentProps<"input"> & { label: string; id: string; error?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-meta text-ink-soft">
        {label}
      </label>
      <input id={id} className={inputClass} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error ? (
        <p id={`${id}-error`} className="text-meta text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Hairline-ruled section heading used across home, PDP and account. */
export function SectionHead({
  title,
  aside,
  action,
  className,
  size = "md",
}: {
  title: string;
  aside?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  size?: "md" | "sm";
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-6 border-b border-line pb-3.5", className)}>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className={size === "md" ? "text-heading-md" : "text-heading-sm"}>{title}</h2>
        {aside ? <span className="text-meta text-ink-muted">{aside}</span> : null}
      </div>
      {action}
    </div>
  );
}

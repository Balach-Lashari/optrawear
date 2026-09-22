import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xs border transition-colors duration-(--duration-fast) ease-out disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        /** Ink fill, tracked caps: the one commit action per view (Add to bag, Continue to payment). */
        primary: "border-ink bg-ink text-cream hover:bg-ink/88 label-lg",
        /** Ink outline, tracked caps: the partner of a primary (Try at a house, Show the remaining two). */
        outline: "border-ink bg-transparent text-ink hover:bg-ink hover:text-cream label-lg",
        /** Hairline outline, sentence case: quiet utilities (Upload a new one, Add a reading). */
        quiet: "border-line-strong bg-transparent text-ink text-meta font-medium hover:border-ink",
        /** Cream outline on slate or ink surfaces (Shop the series, Find your house). */
        inverse: "border-cream bg-transparent text-cream hover:bg-cream hover:text-ink",
        /** Faint cream outline on slate: the secondary hero action (Book a fitting). */
        "inverse-quiet": "border-cream/30 bg-transparent text-cream hover:border-cream",
      },
      size: {
        sm: "h-8 px-4",
        md: "h-10.5 px-5.5 text-small font-medium",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: { variant: "outline", size: "lg" },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & ButtonVariants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Link> & ButtonVariants) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** Tracked-caps text action (Read the engineering note, Change lenses, Directions). */
export const textAction = cva(
  "inline-flex items-center gap-2 label transition-colors duration-(--duration-fast) hover:text-ink",
  {
    variants: {
      tone: {
        strong: "text-ink",
        muted: "text-ink-muted",
      },
    },
    defaultVariants: { tone: "muted" },
  },
);

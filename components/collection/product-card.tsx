import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { finishes, type Product } from "@/lib/data";
import { formatPKR } from "@/lib/format";
import { Swatch, Tag } from "@/components/ui/primitives";

/** Frame image on its cream well. The rendered shots carry their own vignette. */
export function FrameImage({ src, alt, className, priority, sizes }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-xs bg-cream-tint", className)}>
      <Image src={src} alt={alt} fill sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"} loading={priority ? "eager" : undefined} fetchPriority={priority ? "high" : undefined} className="object-cover" />
    </div>
  );
}

/** Home "The series" strip: name, price, one-line summary. */
export function SeriesCard({ product }: { product: Product }) {
  return (
    <Link href={`/adaptive-fit/${product.slug}`} className="group block px-5.5 pt-5.5 pb-6">
      <FrameImage src={product.image} alt={`${product.name} in ${product.finishSummary}`} className="aspect-[4/3]" />
      <div className="mt-3.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-heading-sm group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{product.name}</h3>
        <span className="text-small">{formatPKR(product.price)}</span>
      </div>
      <p className="mt-2.5 text-meta text-ink-muted">
        {product.style} · {product.eye} mm · {product.finishSummary}
      </p>
    </Link>
  );
}

/** Collection grid cell: reference code, merchandising tag, measurements, finishes. */
export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const count = product.finishes.length;
  return (
    <Link href={`/adaptive-fit/${product.slug}`} className="group flex flex-col px-6 pt-4.5 pb-7">
      <div className="flex h-6 items-center justify-between">
        <span className="text-micro text-ink-faint">{product.ref}</span>
        {product.badge ? <Tag>{product.badge}</Tag> : null}
      </div>
      <FrameImage src={product.image} alt={`${product.name} in ${product.finishSummary}`} priority={priority} className="mt-4.5 aspect-[4/3]" />
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-[1.375rem] leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{product.name}</h3>
        <span className="text-body">{formatPKR(product.price)}</span>
      </div>
      <p className="mt-2 text-meta text-ink-muted">
        {product.style} · {product.eye}–{product.bridge}–{product.temple}
      </p>
      <div className="mt-5 flex items-center gap-2">
        {product.finishes.map((f) => (
          <Swatch key={f} color={finishes[f].swatch} size={15} />
        ))}
        <span className="ml-1.5 text-micro text-ink-faint uppercase">
          {count} {count === 1 ? "finish" : "finishes"}
          <span className="sr-only">: {product.finishes.map((f) => finishes[f].label).join(", ")}</span>
        </span>
      </div>
    </Link>
  );
}

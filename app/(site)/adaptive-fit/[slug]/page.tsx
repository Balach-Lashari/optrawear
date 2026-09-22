import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, inTheBox, products, type Product } from "@/lib/data";
import { formatPKR } from "@/lib/format";
import { Breadcrumb } from "@/components/layout/site-chrome";
import { Gallery } from "@/components/product/gallery";
import { Configurator } from "@/components/product/configurator";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/adaptive-fit/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: describe(product) } : {};
}

function describe(p: Product) {
  return (
    p.description ??
    `A ${p.style.toLowerCase()} in β-titanium, ${p.eye}–${p.bridge}–${p.temple}. The pad arms carry the Adaptive Fit mechanism, so the frame seats itself in the first seconds of wear and holds the optical centre where your optician measured it.`
  );
}

function specification(p: Product): [string, string][] {
  return [
    ["Material", "β-titanium, 0.9 mm"],
    ["Weight", "4.8 g"],
    ["Eye size", `${p.eye} mm`],
    ["Bridge", `${p.bridge} mm (seats ${p.seat[0]}–${p.seat[1]})`],
    ["Temple", `${p.temple} mm`],
    ["Pad travel", "±4 mm, ±12° pivot"],
    ["Hinge", "Screwless flex"],
  ];
}

export default async function ProductPage({ params }: PageProps<"/adaptive-fit/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <Breadcrumb items={[{ label: "Frames", href: "/adaptive-fit" }, { label: "Adaptive Fit", href: "/adaptive-fit" }, { label: product.name }]} />

      <div className="mx-auto grid max-w-[90rem] grid-cols-[minmax(0,1fr)] border-b border-line lg:grid-cols-[50rem_minmax(0,1fr)] xl:grid-cols-[50rem_minmax(0,1fr)]">
        <div className="px-4 pt-9 pb-10 md:px-8 lg:border-r lg:border-line xl:pr-10 xl:pl-12">
          <Gallery images={product.gallery ?? [product.image]} name={product.name} />
        </div>

        <div className="px-4 pt-9 pb-12 md:px-8 lg:pl-10 xl:pr-12">
          <p className="flex items-center gap-3 label text-ink-muted">
            Adaptive Fit <span aria-hidden className="h-px w-5 bg-line-strong" /> Ref. {product.ref}
          </p>
          <h1 className="mt-2 text-[clamp(2.75rem,7vw,4rem)] leading-[1.05] tracking-[-0.02em]">{product.name}</h1>
          <p className="mt-3 flex flex-wrap items-baseline gap-x-3.5">
            <span className="font-serif text-heading-md">{formatPKR(product.price)}</span>
            <span className="text-meta text-ink-muted">single-vision lenses included</span>
          </p>
          <p className="mt-5 max-w-[34.5rem] text-body text-ink-soft">{describe(product)}</p>
          <div className="mt-8 border-t border-line pt-6">
            <Configurator product={product} />
          </div>
        </div>
      </div>

      <div className="page-x grid gap-12 pt-11 pb-19 lg:grid-cols-2 lg:gap-14">
        <section>
          <h2 className="text-heading-md">Specification</h2>
          <dl className="mt-5">
            {specification(product).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-line py-2.5 text-small">
                <dt className="pl-2.5 text-ink-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section>
          <h2 className="text-heading-md">In the box</h2>
          <ul className="mt-5 grid border-t border-l border-line-strong sm:grid-cols-2">
            {inTheBox.map((item) => (
              <li key={item.title} className="border-r border-b border-line-strong px-5 pt-5 pb-6">
                <h3 className="text-[1.0625rem]">{item.title}</h3>
                <p className="mt-2 text-meta text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

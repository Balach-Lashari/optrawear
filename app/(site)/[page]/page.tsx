import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";

// Pages the navigation links to that the board doesn't design yet.
const pages = {
  optical: "Optical",
  sun: "Sun",
  lenses: "Lenses",
  "gift-card": "Gift card",
  "lens-guide": "Lens guide",
  repairs: "Repairs",
  returns: "Returns",
  "our-story": "Our story",
  careers: "Careers",
  press: "Press",
  terms: "Terms",
  privacy: "Privacy",
} as const;
type PageId = keyof typeof pages;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((page) => ({ page }));
}

export async function generateMetadata({ params }: PageProps<"/[page]">): Promise<Metadata> {
  const title = pages[(await params).page as PageId];
  return title ? { title } : {};
}

export default async function InfoPage({ params }: PageProps<"/[page]">) {
  const title = pages[(await params).page as PageId];
  if (!title) notFound();
  return (
    <section className="page-x pt-14 pb-24">
      <h1 className="text-display-lg">{title}</h1>
      <p className="mt-6 max-w-[34rem] text-body-lg text-ink-soft">
        This page is on its way. Any of our four houses can help in the meantime, in person or by phone.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/houses" variant="primary">
          Find your house
        </ButtonLink>
        <ButtonLink href="/adaptive-fit" variant="outline">
          Shop Adaptive Fit
        </ButtonLink>
      </div>
    </section>
  );
}

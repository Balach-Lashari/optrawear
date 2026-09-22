import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { account } from "@/lib/data";
import { ButtonLink } from "@/components/ui/button";
import { FitCardPanel, OrdersPanel } from "@/components/account/account-parts";

const sections = {
  orders: { title: "Orders", intro: "Three orders since 2025 · every frame glazed in Karachi" },
  "fit-card": { title: "Fit card", intro: "Measured at the Clifton house on 14/03/2026" },
  "saved-frames": { title: "Saved frames", intro: "Frames you save while browsing appear here." },
  addresses: { title: "Addresses", intro: "Where the lab sends your frames" },
} as const;
type Section = keyof typeof sections;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({ params }: PageProps<"/account/[section]">): Promise<Metadata> {
  const s = sections[(await params).section as Section];
  return s ? { title: s.title } : {};
}

export default async function AccountSectionPage({ params }: PageProps<"/account/[section]">) {
  const id = (await params).section as Section;
  const section = sections[id];
  if (!section) notFound();

  return (
    <>
      <h1 className="text-display-md">{section.title}</h1>
      <p className="mt-3 text-meta text-ink-soft">{section.intro}</p>
      <div className="mt-9 max-w-[34rem]">
        {id === "orders" ? <OrdersPanel showAll /> : null}
        {id === "fit-card" ? <FitCardPanel /> : null}
        {id === "saved-frames" ? (
          <div className="border border-line px-6 py-10">
            <p className="font-serif text-heading-sm">Nothing saved yet.</p>
            <ButtonLink href="/adaptive-fit" variant="outline" size="sm" className="mt-6">
              Browse Adaptive Fit
            </ButtonLink>
          </div>
        ) : null}
        {id === "addresses" ? (
          <div className="rounded-sm border border-line-strong px-6 py-5">
            <p className="label text-ink-muted">Default</p>
            <p className="mt-2 text-body">{account.name}</p>
            <p className="text-small text-ink-soft">House 14, Street 7, F-7/3, Islamabad</p>
            <p className="text-small text-ink-soft">+92 300 000 0000</p>
          </div>
        ) : null}
      </div>
    </>
  );
}

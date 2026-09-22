import type { Metadata } from "next";
import { StoreList } from "@/components/stores/store-list";
import { StoreMap } from "@/components/stores/store-map";

export const metadata: Metadata = {
  title: "Four houses",
  description: "Optrawear houses in Karachi, Lahore, Islamabad and Multan. Bridge measurement, prescription glazing and free Adaptive Fit adjustment.",
};

export default function HousesPage() {
  return (
    <div className="mx-auto grid max-w-[90rem] grid-cols-[minmax(0,1fr)] lg:grid-cols-[27.5rem_minmax(0,1fr)]">
      <div className="px-4 pt-9 pb-14 md:px-8 lg:border-r lg:border-line xl:pr-10 xl:pl-12">
        <h1 className="text-display-md">Four houses</h1>
        <p className="mt-5 text-body text-ink-soft">
          Every house measures bridge width, glazes to prescription, and adjusts Adaptive Fit frames free for as long as you own them.
        </p>
        <StoreList />
      </div>
      <div className="pt-8.5">
        <div className="mx-4 inline-block rounded-xs border border-line-strong px-5 pt-4.5 pb-5 md:mx-9">
          <p className="label text-ink-muted">Coverage</p>
          <p className="mt-2 max-w-[12rem] font-serif text-[1rem] leading-snug">Nationwide delivery, glazed in Karachi</p>
        </div>
        <div className="mt-5.5">
          <StoreMap />
        </div>
      </div>
    </div>
  );
}

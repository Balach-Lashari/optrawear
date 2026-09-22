import type { Metadata } from "next";
import { CollectionBrowser } from "@/components/collection/collection-browser";

export const metadata: Metadata = {
  title: "Optra Adaptive Fit",
  description: "Eight titanium frames with self-seating nose pads, glazed to prescription in our Karachi lab.",
};

export default function CollectionPage() {
  return <CollectionBrowser />;
}

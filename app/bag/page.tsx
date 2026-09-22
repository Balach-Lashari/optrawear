import type { Metadata } from "next";
import { BagView } from "@/components/bag/bag-view";

export const metadata: Metadata = { title: "Your bag" };

export default function BagPage() {
  return <BagView />;
}

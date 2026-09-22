"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./announcement-bar";

/** The announcement bar sits above the header on the home page only, as on the board. */
export function AnnouncementSlot() {
  return usePathname() === "/" ? <AnnouncementBar /> : null;
}

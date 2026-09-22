import { AnnouncementSlot } from "@/components/layout/announcement-slot";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <AnnouncementSlot />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}

import { AccountHeader } from "@/components/layout/site-chrome";
import { AccountNav } from "@/components/account/account-client";

export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <>
      <AccountHeader />
      <div className="mx-auto grid min-h-[calc(100dvh-4.125rem)] max-w-[90rem] grid-cols-[minmax(0,1fr)] md:grid-cols-[14.75rem_minmax(0,1fr)]">
        <aside className="border-line px-4 pt-9 pb-6 md:border-r md:px-6.5">
          <AccountNav />
        </aside>
        <main id="main" className="px-4 pt-9 pb-16 md:px-8 lg:pl-12 xl:pr-12">
          {children}
        </main>
      </div>
    </>
  );
}

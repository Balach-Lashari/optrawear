import { CheckoutHeader } from "@/components/layout/site-chrome";

export default function CheckoutLayout({ children }: LayoutProps<"/bag">) {
  return (
    <>
      <CheckoutHeader current={0} />
      <main id="main">{children}</main>
    </>
  );
}

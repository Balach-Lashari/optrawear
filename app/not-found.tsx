import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/layout/site-chrome";

export default function NotFound() {
  return (
    <main id="main" className="page-x flex min-h-dvh flex-col justify-center py-20">
      <Logo />
      <h1 className="mt-16 text-display-lg">Page not found</h1>
      <p className="mt-6 max-w-[30rem] text-body-lg text-ink-soft">That address doesn’t lead to a page. The frames are one click away.</p>
      <ButtonLink href="/adaptive-fit" variant="primary" className="mt-8 self-start">
        Shop Adaptive Fit
      </ButtonLink>
    </main>
  );
}

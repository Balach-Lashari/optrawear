import Link from "next/link";
import { fitCard, orders, prescription } from "@/lib/data";
import { formatPKR } from "@/lib/format";
import { textAction } from "@/components/ui/button";
import { SectionHead, Tag } from "@/components/ui/primitives";
import { FrameImage } from "@/components/collection/product-card";
import { PrescriptionTable } from "@/components/bag/prescription-table";
import { PrescriptionActions } from "./account-client";

export function PrescriptionPanel() {
  return (
    <section aria-labelledby="rx-current" className="rounded-sm border border-line-strong">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3.5">
          <h2 id="rx-current" className="text-heading-sm">
            {prescription.title}
          </h2>
          <Tag tone="tint">Current</Tag>
        </div>
        <p className="text-[0.6875rem] text-ink-muted">
          Taken {prescription.taken} · valid to {prescription.validTo}
        </p>
      </div>
      <div className="px-4 pt-5 pb-5 sm:px-6">
        <PrescriptionTable readings={prescription.readings} pd={prescription.pd} prism />
        <PrescriptionActions />
      </div>
    </section>
  );
}

export function FitCardPanel() {
  return (
    <section>
      <SectionHead title="Fit card" size="sm" action={<span className="text-[0.6875rem] text-ink-muted">From your last fitting</span>} />
      <dl className="mt-4 grid grid-cols-3">
        {fitCard.map((f) => (
          <div key={f.label} className="flex flex-col-reverse gap-2">
            <dt className="label text-ink-muted">{f.label}</dt>
            <dd className="font-serif text-heading-lg">{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-meta text-ink-soft">Your bridge sits mid-range, so every frame in the Adaptive Fit series will seat without adjustment.</p>
    </section>
  );
}

export function OrdersPanel({ showAll = false }: { showAll?: boolean }) {
  return (
    <section>
      <SectionHead
        title="Orders"
        size="sm"
        action={
          showAll ? null : (
            <Link href="/account/orders" className={textAction()}>
              All orders
            </Link>
          )
        }
      />
      <ul>
        {orders.map((o) => (
          <li key={o.id} className="flex items-center gap-4 border-b border-line py-4">
            <FrameImage src={o.image} alt="" className="aspect-[4/3] w-18.5 shrink-0" sizes="5rem" />
            <div className="min-w-0 flex-1">
              <p className="font-serif text-[1.0625rem]">{o.name}</p>
              <p className="mt-1 text-[0.6875rem] text-ink-muted">
                {o.id} · {o.date} · {formatPKR(o.total)}
              </p>
            </div>
            <Tag tone="tint">{o.status}</Tag>
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { Metadata } from "next";
import { prescription } from "@/lib/data";
import { AddReading } from "@/components/account/account-client";
import { FitCardPanel, OrdersPanel, PrescriptionPanel } from "@/components/account/account-parts";

export const metadata: Metadata = { title: "Prescriptions" };

export default function PrescriptionsPage() {
  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-display-md">Prescriptions</h1>
          <p className="mt-3 text-meta text-ink-soft">One current reading · taken at the {prescription.house} house</p>
        </div>
        <AddReading />
      </div>
      <div className="mt-9">
        <PrescriptionPanel />
      </div>
      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-8">
        <FitCardPanel />
        <OrdersPanel />
      </div>
    </>
  );
}

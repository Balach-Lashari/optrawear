import { cn } from "@/lib/cn";
import type { Reading } from "@/lib/data";

/**
 * Right/left reading table. PD is a single binocular value, so it spans both rows
 * and the row rule stops short of it, as on the board.
 */
export function PrescriptionTable({ readings, pd, prism = false, className }: { readings: Reading[]; pd: string; prism?: boolean; className?: string }) {
  const cols = ["SPH", "CYL", "AXIS", "ADD", ...(prism ? ["PRISM"] : [])];
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[34rem] border-collapse text-left text-small">
        <caption className="sr-only">Prescription reading, right and left eye</caption>
        <thead>
          <tr className="border-b border-line">
            <td className="w-[22%]" />
            {cols.map((c) => (
              <th key={c} scope="col" className="pb-3 label font-semibold text-ink-soft">
                {c}
              </th>
            ))}
            <th scope="col" className="w-[10%] pb-3 label font-semibold text-ink-soft">
              PD
            </th>
          </tr>
        </thead>
        <tbody>
          {readings.map((r, i) => (
            <tr key={r.eye}>
              <th scope="row" className={cn("py-2.5 pl-2.5 font-normal text-ink-muted", "border-b border-line")}>
                {r.eye}
              </th>
              <td className="border-b border-line py-2.5">{r.sph}</td>
              <td className="border-b border-line py-2.5">{r.cyl}</td>
              <td className="border-b border-line py-2.5">{r.axis}</td>
              <td className="border-b border-line py-2.5">{r.add}</td>
              {prism ? <td className="border-b border-line py-2.5">{r.prism}</td> : null}
              {i === 0 ? (
                <td rowSpan={readings.length} className="border-b border-line align-middle">
                  {pd}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { geoGraticule, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { Feature, FeatureCollection } from "geojson";
import countries50m from "world-atlas/countries-50m.json";
import { mapCities, stores } from "@/lib/data";

// Natural Earth 1:50m, rendered on the server; only the SVG ships.
// Mercator scale + translate fitted so the pins land where the board puts them.
const W = 1000;
const H = 585;
const projection = geoMercator().scale(1758).translate([-1628.7, 1280]);
const path = geoPath(projection);

const topo = countries50m as unknown as Topology<{ countries: GeometryCollection }>;
const all = feature(topo, topo.objects.countries) as FeatureCollection;
const pakistan = all.features.find((f) => f.id === "586") as Feature;
const graticule = path(geoGraticule().step([5, 5])());

const labelSide: Record<string, "left" | "right"> = { Multan: "left", Peshawar: "left", Quetta: "left" };

export function StoreMap() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="map-title">
      <title id="map-title">Map of Pakistan showing the four Optrawear houses: Karachi, Lahore, Islamabad and Multan</title>
      <rect width={W} height={H} fill="#fffce8" />
      <path d={graticule ?? ""} fill="none" stroke="#efe9d4" strokeWidth="1" />
      <g fill="#f5f0dc" stroke="#d8d2bf" strokeWidth="0.8" strokeLinejoin="round">
        {/* Natural Earth ids repeat (Australia's "036") or are missing, so key by position; the list is static. */}
        {all.features.map((f, i) => (
          <path key={i} d={path(f) ?? ""} />
        ))}
      </g>
      <path d={path(pakistan) ?? ""} fill="#f3eedb" stroke="var(--color-ink)" strokeOpacity="0.82" strokeWidth="1.3" strokeLinejoin="round" />

      <g fontFamily="var(--font-sans)" fontSize="9.5" letterSpacing="0.6" fill="var(--color-ink-faint)">
        {mapCities.map((c) => {
          const [x, y] = projection(c.coords)!;
          const left = labelSide[c.name] === "left";
          return (
            <g key={c.name}>
              <circle cx={x} cy={y} r="1.6" />
              <text x={left ? x - 6 : x + 6} y={y + 3.2} textAnchor={left ? "end" : "start"}>
                {c.name}
              </text>
            </g>
          );
        })}
      </g>

      <g fontFamily="var(--font-sans)">
        {stores.map((s) => {
          const [x, y] = projection(s.coords)!;
          const left = labelSide[s.city] === "left";
          const tx = left ? x - 11 : x + 10;
          const anchor = left ? "end" : "start";
          return (
            <g key={s.city}>
              <circle cx={x} cy={y} r="6.5" fill="var(--color-cream)" stroke="var(--color-ink-muted)" strokeWidth="1" />
              <circle cx={x} cy={y} r="2.6" fill="var(--color-ink)" />
              <text x={tx} y={y - 2} textAnchor={anchor} fontSize="11" fontWeight="600" letterSpacing="1.1" fill="var(--color-ink-soft)">
                {s.city.toUpperCase()}
              </text>
              <text x={left ? tx : tx} y={y + 10} textAnchor={anchor} fontSize="9.5" letterSpacing="0.6" fill="var(--color-ink-faint)">
                {s.mapNote}
              </text>
            </g>
          );
        })}
      </g>

      <text x="15" y={H - 14} fontFamily="var(--font-sans)" fontSize="9.5" letterSpacing="1.4" fill="var(--color-ink-faint)">
        FOUR HOUSES · NATURAL EARTH GEOMETRY
      </text>
    </svg>
  );
}

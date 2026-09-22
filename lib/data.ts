// Static catalogue, copied from the reference board (doc/reference/design/Frame.png).
// Hingol and Deosai are placeholders for "the remaining two": the board names only six frames.

export type FinishId = "titanium" | "graphite" | "champagne";
export type ShapeFacet = "Rectangle" | "Panto" | "Square" | "Rimless";

export const finishes: Record<FinishId, { label: string; swatch: string }> = {
  titanium: { label: "Brushed titanium", swatch: "var(--color-finish-titanium)" },
  graphite: { label: "Graphite", swatch: "var(--color-finish-graphite)" },
  champagne: { label: "Champagne", swatch: "var(--color-finish-champagne)" },
};

export type Product = {
  slug: string;
  ref: string;
  name: string;
  price: number;
  style: string;
  shape: ShapeFacet;
  /** Eye size, bridge, temple in mm */
  eye: number;
  bridge: number;
  temple: number;
  /** Bridge widths the pads seat across */
  seat: [number, number];
  finishes: FinishId[];
  finishSummary: string;
  badge?: string;
  image: string;
  gallery?: string[];
  description?: string;
  addedAt: number;
};

export const products: Product[] = [
  {
    slug: "ravi",
    ref: "AF-201",
    name: "Ravi",
    price: 12000,
    style: "Rimless",
    shape: "Rimless",
    eye: 51,
    bridge: 18,
    temple: 140,
    seat: [14, 19],
    finishes: ["titanium", "graphite", "champagne"],
    finishSummary: "brushed titanium",
    badge: "Series entry",
    image: "/frames/ravi.webp",
    addedAt: 8,
  },
  {
    slug: "chenab",
    ref: "AF-202",
    name: "Chenab",
    price: 14900,
    style: "Square",
    shape: "Square",
    eye: 53,
    bridge: 19,
    temple: 145,
    seat: [17, 22],
    finishes: ["graphite", "titanium"],
    finishSummary: "graphite",
    image: "/frames/chenab.webp",
    addedAt: 7,
  },
  {
    slug: "kohsar",
    ref: "AF-203",
    name: "Kohsar",
    price: 16200,
    style: "Panto",
    shape: "Panto",
    eye: 50,
    bridge: 20,
    temple: 140,
    seat: [17, 22],
    finishes: ["champagne", "titanium", "graphite"],
    finishSummary: "champagne",
    image: "/frames/kohsar.webp",
    addedAt: 6,
  },
  {
    slug: "meridian",
    ref: "AF-204",
    name: "Meridian",
    price: 18500,
    style: "Soft rectangle",
    shape: "Rectangle",
    eye: 50,
    bridge: 18,
    temple: 140,
    seat: [14, 22],
    finishes: ["titanium", "graphite", "champagne"],
    finishSummary: "titanium",
    badge: "Most seated",
    image: "/frames/meridian.webp",
    gallery: [
      "/frames/meridian-hero.webp",
      "/frames/meridian-2.webp",
      "/frames/meridian-3.webp",
      "/frames/meridian-4.webp",
    ],
    description:
      "A soft rectangle in β-titanium, drawn a little wider than it needs to be. The pad arms carry the Adaptive Fit mechanism, so the frame seats itself in the first seconds of wear and holds the optical centre where your optician measured it.",
    addedAt: 5,
  },
  {
    slug: "clifton",
    ref: "AF-205",
    name: "Clifton",
    price: 17400,
    style: "Cat-eye",
    shape: "Panto",
    eye: 49,
    bridge: 17,
    temple: 138,
    seat: [14, 19],
    finishes: ["graphite", "champagne"],
    finishSummary: "graphite",
    image: "/frames/clifton.webp",
    addedAt: 4,
  },
  {
    slug: "margalla",
    ref: "AF-206",
    name: "Margalla",
    price: 21000,
    style: "Aviator",
    shape: "Rectangle",
    eye: 54,
    bridge: 16,
    temple: 145,
    seat: [14, 22],
    finishes: ["titanium", "champagne"],
    finishSummary: "champagne",
    badge: "Widest seat",
    image: "/frames/margalla.webp",
    addedAt: 3,
  },
  {
    slug: "hingol",
    ref: "AF-207",
    name: "Hingol",
    price: 15800,
    style: "Square",
    shape: "Square",
    eye: 52,
    bridge: 19,
    temple: 145,
    seat: [17, 22],
    finishes: ["titanium"],
    finishSummary: "brushed titanium",
    image: "/frames/chenab.webp",
    addedAt: 2,
  },
  {
    slug: "deosai",
    ref: "AF-208",
    name: "Deosai",
    price: 22500,
    style: "Rectangle",
    shape: "Rectangle",
    eye: 55,
    bridge: 20,
    temple: 145,
    seat: [17, 22],
    finishes: ["titanium"],
    finishSummary: "brushed titanium",
    image: "/frames/meridian.webp",
    addedAt: 1,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const eyeSizes = [
  { size: 48, label: "narrow" },
  { size: 50, label: "regular" },
  { size: 52, label: "wide" },
] as const;

export type LensId = "single" | "progressive";
export const lenses: Record<LensId, { label: string; price: number }> = {
  single: { label: "Single vision", price: 0 },
  progressive: { label: "Progressive", price: 9000 },
};

export const inTheBox = [
  { title: "Fitting card", body: "Your bridge, eye size and temple, written down." },
  { title: "Hard case", body: "Recycled board, cream on slate." },
  { title: "Cloth", body: "Microfibre, printed with the house line." },
  { title: "Warranty", body: "Two years on the pad mechanism." },
] as const;

export type Store = {
  city: string;
  address: string;
  hours: string;
  phone: string;
  distance?: string;
  opening?: string;
  /** lon, lat */
  coords: [number, number];
  mapNote: string;
};

export const stores: Store[] = [
  {
    city: "Karachi",
    address: "14-C, Khayaban-e-Shahbaz, Clifton Block 4",
    hours: "11:00 — 21:00",
    phone: "021 3530 0000",
    coords: [67.03, 24.81],
    mapNote: "Clifton, Block 4",
  },
  {
    city: "Lahore",
    address: "32 M.M. Alam Road, Gulberg III",
    hours: "11:00 — 21:00",
    phone: "042 3577 0000",
    distance: "1,020 km",
    coords: [74.35, 31.51],
    mapNote: "M.M. Alam Road",
  },
  {
    city: "Islamabad",
    address: "Shop 7, F-7 Markaz, Bhittai Road",
    hours: "11:00 — 20:30",
    phone: "051 2650 0000",
    distance: "1,140 km",
    coords: [73.05, 33.72],
    mapNote: "F-7 Markaz",
  },
  {
    city: "Multan",
    address: "Cantt Plaza, Abdali Road",
    hours: "From March",
    phone: "061 4500 000",
    distance: "780 km",
    opening: "Opening ’26",
    coords: [71.47, 30.2],
    mapNote: "Cantt · opening ’26",
  },
];

export const mapCities: { name: string; coords: [number, number] }[] = [
  { name: "Peshawar", coords: [71.58, 34.01] },
  { name: "Quetta", coords: [66.99, 30.18] },
  { name: "Faisalabad", coords: [73.08, 31.42] },
  { name: "Gwadar", coords: [62.33, 25.13] },
];

export type Reading = {
  eye: "Right (OD)" | "Left (OS)";
  sph: string;
  cyl: string;
  axis: string;
  add: string;
  prism: string;
};

export const prescription = {
  title: "Distance & progressive",
  taken: "14/03/2026",
  validTo: "03/2027",
  house: "Clifton",
  pd: "63",
  readings: [
    { eye: "Right (OD)", sph: "−2.25", cyl: "−0.75", axis: "175", add: "+1.75", prism: "—" },
    { eye: "Left (OS)", sph: "−1.75", cyl: "−0.50", axis: "010", add: "+1.75", prism: "—" },
  ] satisfies Reading[],
};

export const fitCard = [
  { value: "18.0", label: "Bridge, mm" },
  { value: "50", label: "Eye size" },
  { value: "140", label: "Temple, mm" },
] as const;

export const orders = [
  { id: "#OW-4182", name: "Meridian", date: "18/03/2026", total: 27500, status: "In the lab", image: "/frames/meridian.webp" },
  { id: "#OW-3907", name: "Kohsar", date: "02/12/2025", total: 16200, status: "Delivered", image: "/frames/kohsar.webp" },
  { id: "#OW-3611", name: "Clifton sun", date: "14/07/2025", total: 14000, status: "Delivered", image: "/frames/clifton-sun.webp" },
] as const;

export const account = { name: "Zoya Kamal", initials: "ZK" };

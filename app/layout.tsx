import type { Metadata } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { BagProvider } from "@/lib/bag";
import "./globals.css";

// Newsreader stands in for Footlight MT (display); Archivo for Haas Grotesk (text).
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal"],
  variable: "--font-newsreader",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "optrawear. — frames worth looking twice at", template: "%s — optrawear." },
  description: "Titanium frames designed in Karachi. Adaptive Fit nose pads that seat themselves, glazed to prescription in four working days.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK" className={`${newsreader.variable} ${archivo.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-xs focus:bg-cream focus:px-3 focus:py-2 focus:text-small"
        >
          Skip to content
        </a>
        <BagProvider>{children}</BagProvider>
      </body>
    </html>
  );
}

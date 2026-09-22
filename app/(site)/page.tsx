import { EngineeringNote, Hero, HouseLine, PromiseStrip, SeriesStrip } from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromiseStrip />
      <EngineeringNote />
      <SeriesStrip />
      <HouseLine />
    </>
  );
}

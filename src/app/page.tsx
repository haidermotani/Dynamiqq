import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { ShopSection } from "@/components/home/ShopSection";
import { CustomizeBand } from "@/components/home/CustomizeBand";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { BrandStory } from "@/components/home/BrandStory";

const ticker = [
  "Custom football jerseys",
  "Cricket kits",
  "Your name your number",
  "Team and club orders",
  "Made in Karachi",
  "EasyPaisa",
  "City-wide delivery",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={ticker} />
      <ShopSection />
      <CustomizeBand />
      <ProcessSteps />
      <BrandStory />
    </>
  );
}
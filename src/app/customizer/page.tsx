import type { Metadata } from "next";
import { Customizer } from "@/components/customizer/Customizer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Customizer",
  description:
    "Build a custom football or cricket kit in minutes. Choose the base, colours, pattern, name, number and crest, then send the full order to Dynamiq on WhatsApp.",
};

export default function CustomizerPage() {
  return (
    <section className="bg-ink py-14 sm:py-16 lg:py-20">
      <Container>
        <Customizer />
      </Container>
    </section>
  );
}
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { Reveal } from "@/components/ui/Reveal";

export function ShopSection() {
  return (
    <section id="shop" className="scroll-mt-24 border-b border-line bg-ink py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="The locker room"
              title={
                <>
                  Ready made, <span className="text-brand">or ours to build</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted lg:text-right">
              Every shirt here also works as a custom kit. Search and filter
              the range, then take your pick into the builder.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10" delay={0.05}>
          <ProductExplorer />
        </Reveal>
      </Container>
    </section>
  );
}
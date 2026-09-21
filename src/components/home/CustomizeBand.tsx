import { Container } from "@/components/ui/Container";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { KitPreview } from "@/components/customizer/KitPreview";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { defaultState } from "@/components/customizer/state";
import { Reveal } from "@/components/ui/Reveal";

export function CustomizeBand() {
  const preview = defaultState();

  return (
    <section className="border-b border-line bg-coal py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Custom kits"
              title={
                <>
                  Same shirt.
                  <br />
                  <span className="text-brand">Nobody has yours.</span>
                </>
              }
              description="Pick the base, drop your club colours, add the crest, the name and the number. The preview updates as you build, and the order lands on our WhatsApp ready to confirm."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/customizer" size="lg">
                Start customising
                <ArrowIcon />
              </Button>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">
              Football / Cricket / Training wear
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative border border-line bg-ink p-6 sm:p-10">
              <div className="mx-auto max-w-sm">
                <KitPreview state={preview} />
              </div>
              <p className="mt-4 border-t border-line pt-4 text-center font-display text-[11px] font-bold uppercase tracking-[0.25em] text-muted">
                Live preview inside the customizer
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
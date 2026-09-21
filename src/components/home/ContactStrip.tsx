import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { business } from "@/config/business";
import { waLink, waNumberDisplay } from "@/lib/contact";
import { Reveal } from "@/components/ui/Reveal";

export function ContactStrip() {
  return (
    <section className="border-b border-line bg-coal py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="font-display-italic text-4xl font-black uppercase italic leading-[0.95] text-mist sm:text-5xl">
              Orders run on{" "}
              <span className="text-brand">WhatsApp</span>, money on{" "}
              <span className="text-brand">EasyPaisa</span>.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              No checkout cart, no cards. You build the order, we confirm the
              price, you pay by EasyPaisa and we deliver in {business.deliveryArea}.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Button
                size="lg"
                href={waLink("Assalam o Alaikum Dynamiq! I want to order a custom kit.")}
                external
                fullWidth
              >
                Message us on WhatsApp
              </Button>
              <div className="border border-line bg-ink p-5">
                <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">
                  EasyPaisa account
                </p>
                <p className="mt-2 font-display-italic text-2xl font-black uppercase italic text-mist">
                  {waNumberDisplay(business.easypaisa)}
                </p>
                <p className="mt-2 text-xs text-muted">
                  Payment confirmed after we accept your order.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
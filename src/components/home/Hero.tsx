import { Wordmark } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JerseyArt } from "@/components/products/garment";
import { logoJersey } from "@/data/brandVisuals";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ink">
      <Container className="relative py-16 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-8">
          <div>
            <p className="flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.28em] text-brand">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
              Custom sportswear, Karachi
            </p>
            <h1 className="mt-6 font-display-italic text-5xl font-black uppercase italic leading-[0.9] tracking-tight text-mist sm:text-7xl lg:text-[5.5rem]">
              Your kit.
              <br />
              Your name.
              <br />
              <span className="text-brand">Your number.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-body sm:text-lg">
              Jerseys and kits for football and cricket, printed with your
              name, number and club logo. Built in Karachi, delivered across
              the city.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/customizer" size="lg">
                Build your kit
              </Button>
              <Button
                href="#shop"
                size="lg"
                variant="outline"
                ariaLabel="Skip to ready-made products"
              >
                Browse jerseys
              </Button>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">
              Single kits and full squads / EasyPaisa / Karachi delivery
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <Wordmark
              className="pointer-events-none absolute -right-8 top-0 w-[120%] max-w-none -rotate-6 opacity-20"
            />
            <div className="animate-drift relative w-full max-w-md border border-line bg-coal p-6 sm:p-10">
              <div className="mx-auto max-w-sm">
                <JerseyArt
                  body={logoJersey.body}
                  sleeves={logoJersey.sleeves}
                  trim={logoJersey.trim}
                  pattern={logoJersey.pattern}
                />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                <span className="font-display-italic text-xs font-black uppercase italic text-mist">
                  DYNAMIQ 10
                </span>
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                  Projected on: front
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function BrandStory() {
  return (
    <section className="border-b border-line bg-ink py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.4fr_1fr]">
          <Reveal>
            <LogoMark className="h-40 w-40 lg:h-52 lg:w-52" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.25em] text-brand">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
              Who we are
            </p>
            <h2 className="mt-4 font-display-italic text-3xl font-black uppercase italic leading-[0.95] tracking-tight text-mist sm:text-4xl lg:text-5xl">
              From Karachi, for the game
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-body">
              <p>
                Dynamiq started with a simple problem: players in Karachi were
                paying too much for kits that looked like someone else&apos;s.
                We build jerseys, kits and custom sportswear from scratch, so
                your team name, your colours and your numbers actually belong
                to you.
              </p>
              <p>
                No big warehouse, no minimum-order guessing. One simple
                flow: design a kit, confirm it on WhatsApp, pay by EasyPaisa,
                and pick up or get it delivered in Karachi.
              </p>
            </div>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 font-display text-sm font-black uppercase tracking-wider text-brand transition-colors hover:text-mist"
            >
              Read the full story
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
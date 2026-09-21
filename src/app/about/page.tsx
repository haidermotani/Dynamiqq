import type { Metadata } from "next";
import { LogoMark } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dynamiq is a Karachi-based sportswear startup building football and cricket jerseys, kits and custom sportswear for players, schools, clubs and tournament teams.",
};

const OFFERINGS = [
  {
    title: "Football kits",
    text: "Short-sleeve and keeper shirts, shorts and training layers, printed with your squad details.",
  },
  {
    title: "Cricket kits",
    text: "T20 and OD cut shirts with stiff collars, matched trousers, names and numbers in team colours.",
  },
  {
    title: "Custom printing",
    text: "Names, numbers, sleeve text and your crest. Upload a logo, tell us what goes where.",
  },
  {
    title: "Team orders",
    text: "A structured squad list with sizes for every player, so quotations come back fast.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-ink">
        <Container className="py-16 sm:py-20 lg:py-28">
          <Reveal>
            <p className="flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.25em] text-brand">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
              About Dynamiq
            </p>
            <h1 className="mt-5 max-w-3xl font-display-italic text-4xl font-black uppercase italic leading-[0.92] tracking-tight text-mist sm:text-6xl lg:text-7xl">
              A sportswear brand
              <br />
              built around{" "}
              <span className="text-brand">your team</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
              Dynamiq is a Pakistani sportswear startup from {business.city}.
              We started because youth football and cricket in Pakistan
              deserved kits that feel like the ones on television, without the
              import price tag.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-coal py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <LogoMark className="h-44 w-44 lg:h-60 lg:w-60" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-body">
                <p>
                  We design kits around the way teams actually play in{" "}
                  {business.city}: tournament football on weekend mornings,
                  club cricket through the summer, school squads that need ten
                  shirts in school colours by Friday.
                </p>
                <p>
                  Every order starts the same way. You pick a design, set the
                  colours, and put your name, number and crest on it. We
                  confirm price and details over WhatsApp, take payment
                  through EasyPaisa, and produce the kit. Nothing is shoved
                  through a checkout cart because for us, and for most teams,
                  the conversation <em>is</em> the ordering process.
                </p>
                <p>
                  The long game is bigger than one order. We want Dynamiq to
                  become a recognised sportswear brand from Pakistan, one that
                  young players choose because the design, the value and the
                  whole experience are built for them. Teams that start here
                  in {business.city} should be able to keep their identity as
                  they grow.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <h2 className="font-display-italic text-3xl font-black uppercase italic leading-none text-mist sm:text-4xl lg:text-5xl">
              What we build
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {OFFERINGS.map((item, i) => (
              <Reveal key={item.title} delay={0.06 * i}>
                <li className="border-t-2 border-brand pt-5">
                  <h3 className="font-display-italic text-2xl font-black uppercase italic text-mist">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-line bg-coal py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h2 className="font-display-italic text-3xl font-black uppercase italic leading-[0.95] text-mist sm:text-4xl lg:text-5xl">
                  Ordering a whole squad?
                  <br />
                  It takes one message.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                  Use the team flow on the customizer to list players with
                  their sizes, drop the crest, and send everything as one
                  structured quotation request. We come back with a per-player
                  price and a production date.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/customizer" size="lg">
                    Open the customizer
                    <ArrowIcon />
                  </Button>
                  <Button href="/contact" size="lg" variant="outline">
                    Talk to us first
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
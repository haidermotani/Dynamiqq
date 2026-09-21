import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Build your kit",
    text: "Choose a base, set the colours, add a name, number and crest in the customizer.",
  },
  {
    n: "02",
    title: "Send it on WhatsApp",
    text: "Your finished order arrives as a clean, structured message ready to confirm.",
  },
  {
    n: "03",
    title: "Confirm and pay",
    text: "We reply with the final price. Payment is manual through EasyPaisa.",
  },
  {
    n: "04",
    title: "Pick up or delivery",
    text: "Kits are produced and delivered across Karachi, or collected from us.",
  },
];

export function ProcessSteps() {
  return (
    <section className="border-b border-line bg-ink py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="flex items-center gap-3">
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand">
              <span aria-hidden="true" className="mr-3 inline-block h-px w-8 bg-brand" />
              How it works
            </p>
            <h2 className="font-display-italic text-3xl font-black uppercase italic leading-none text-mist sm:text-4xl lg:text-5xl">
              From build to pitch
            </h2>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={0.08 * i}>
              <li className="border-t-2 border-brand pt-5">
                <span className="font-display-italic text-4xl font-black italic text-brand">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display-italic text-xl font-black uppercase italic text-mist">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
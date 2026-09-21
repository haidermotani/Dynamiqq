import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/config/business";
import { waLink, waNumberDisplay } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Message Dynamiq on WhatsApp or email to order custom football and cricket jerseys in Karachi. Pay by EasyPaisa after our confirmation.",
};

const CHANNELS: Array<{
  name: string;
  detail: string;
  value: string;
  actionLabel: string;
  href?: string;
  mailto?: boolean;
}> = [
  {
    name: "WhatsApp",
    detail: "Fastest way to order. We confirm price, size details and delivery here.",
    value: waNumberDisplay(business.whatsapp),
    actionLabel: "Open WhatsApp",
    href: waLink("Assalam o Alaikum Dynamiq! I want to order a custom kit."),
  },
  {
    name: "Email",
    detail: "For longer briefs, file lists or anything that needs a written trail.",
    value: business.email,
    actionLabel: "Send an email",
    mailto: true,
    href: `mailto:${business.email}`,
  },
  {
    name: "EasyPaisa",
    detail: `Payment account after we confirm your order. Send to ${business.easypaisa} with your name.`,
    value: waNumberDisplay(business.easypaisa),
    actionLabel: "Pay after confirmation",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-ink">
        <Container className="py-16 sm:py-20 lg:py-28">
          <Reveal>
            <p className="flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.25em] text-brand">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
              Contact
            </p>
            <h1 className="mt-5 max-w-3xl font-display-italic text-4xl font-black uppercase italic leading-[0.92] tracking-tight text-mist sm:text-6xl">
              Talk to us before,
              <br />
              after and <span className="text-brand">while you build</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
              We handle orders as conversations, because that is how teams
              actually work. Message us with questions, a rough idea, a
              sketch, or a festival deadline, and we will get you a straight
              answer.
            </p>
          </Reveal>
        </Container>
      </section>

<section className="border-b border-line bg-coal py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col divide-y divide-line">
            {CHANNELS.map((channel, i) => (
              <Reveal key={channel.name} delay={0.06 * i}>
                <div className="grid gap-5 py-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
                  <div className="grid gap-2 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-6">
                    <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand">
                      {channel.name}
                    </p>
                    <div>
                      <p className="font-display-italic text-xl font-black uppercase break-words text-mist sm:text-2xl">
                        {channel.value}
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                        {channel.detail}
                      </p>
                    </div>
                  </div>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      {...(channel.mailto
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      className={
                        channel.mailto
                          ? "group inline-flex items-center justify-center gap-2 px-2 font-display text-sm font-black uppercase tracking-wider text-brand transition-colors hover:text-mist"
                          : "group inline-flex items-center justify-center gap-2 border-2 border-brand px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider text-brand transition-colors hover:bg-brand hover:text-ink"
                      }
                    >
                      {channel.actionLabel}
                      <ArrowIcon />
                    </a>
                  ) : (
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-muted">
                      {channel.actionLabel}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="grid items-center gap-8 border border-line bg-ink p-8 lg:grid-cols-[1.2fr_1fr] lg:p-12">
              <div>
                <h2 className="font-display-italic text-3xl font-black uppercase italic text-mist">
                  Where we deliver
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                  We currently make and deliver within {business.deliveryArea}.
                  If you are outside the city, message us on WhatsApp and we
                  will tell you what is possible before you pay for anything.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Button
                  href={waLink("Assalam o Alaikum Dynamiq! Quick question before I order.")}
                  external
                  fullWidth
                >
                  Ask us on WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand">
                  Elsewhere
                </p>
                <h2 className="mt-3 font-display-italic text-3xl font-black uppercase italic text-mist">
                  Kits on Instagram
                </h2>
                <p className="mt-2 text-sm text-muted">
                  We post finished kits, team drops and restock news there.
                </p>
              </div>
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-line px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider text-mist transition-colors hover:border-brand hover:text-brand"
              >
                dynamiq.pk on Instagram
                <ArrowIcon />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
import Link from "next/link";
import { LogoMark, Wordmark } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { mainNav, customizerCta } from "@/config/navigation";
import { business } from "@/config/business";
import { waLink, waNumberDisplay } from "@/lib/contact";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-coal">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-12 w-12" />
              <Wordmark className="h-9 w-auto" />
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {business.name} builds football and cricket kits, jerseys and
              custom sportswear in {business.city}. Name, number and logo
              printed your way, delivered across {business.deliveryArea}.
            </p>
            <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Made in {business.city}
            </p>
          </div>

          <div>
            <h3 className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-mist">
              Pages
            </h3>
            <ul className="mt-4 grid gap-2">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-sm text-muted transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={customizerCta.href}
                  className="inline-block py-1 font-display text-sm font-bold uppercase text-brand transition-colors hover:text-mist"
                >
                  {customizerCta.label}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-mist">
              Contact
            </h3>
            <ul className="mt-4 grid gap-2 text-sm text-muted">
              <li>
                <a
                  href={waLink("Assalam o Alaikum Dynamiq!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 transition-colors hover:text-brand"
                >
                  WhatsApp: {waNumberDisplay(business.whatsapp)}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-block py-1 break-all transition-colors hover:text-brand"
                >
                  {business.email}
                </a>
              </li>
              <li className="pt-2">
                EasyPaisa: {waNumberDisplay(business.easypaisa)}
                <span className="block text-xs text-muted">
                  Payment confirmed after order is accepted.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            &copy; {year} {business.legalName}. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Jerseys <span className="text-brand">/</span> Kits
            <span className="text-brand">/</span> Custom
          </p>
        </div>
      </Container>
    </footer>
  );
}
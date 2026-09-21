"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { mainNav, customizerCta } from "@/config/navigation";
import { cn } from "@/lib/cn";

function NavLink({
  label,
  href,
  active,
  onNavigate,
}: {
  label: string;
  href: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group relative px-1 py-2 font-display text-sm font-bold uppercase tracking-[0.14em] transition-colors",
        active ? "text-brand" : "text-mist hover:text-brand",
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-px left-0 h-[2px] bg-brand transition-all duration-200",
          active ? "w-full" : "w-0 group-hover:w-full",
        )}
      />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link
          href="/"
          aria-label="Dynamiq home"
          className="flex items-center gap-3"
        >
          <LogoMark className="h-9 w-9 lg:h-11 lg:w-11" priority />
          <span className="font-display-italic text-lg font-black italic tracking-tight text-mist">
            DYNAMIQ
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {mainNav.map((link) => (
            <NavLink
              key={link.href}
              label={link.label}
              href={link.href}
              active={pathname === link.href}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href={customizerCta.href}
            size="sm"
            className="hidden lg:inline-flex"
          >
            {customizerCta.label}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center border border-line bg-coal text-mist transition-colors hover:border-brand hover:text-brand lg:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 top-0 block h-0.5 w-full bg-current transition-transform duration-200",
                  open && "top-1/2 -translate-y-1/2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 bg-current transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 block h-0.5 w-full bg-current transition-transform duration-200",
                  open && "bottom-1/2 translate-y-1/2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-ink lg:hidden"
          >
            <ul className="flex flex-col px-4 py-4">
              {mainNav.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between border-b border-line/60 py-4 font-display-italic text-2xl font-black uppercase italic transition-colors",
                      pathname === link.href
                        ? "text-brand"
                        : "text-mist hover:text-brand",
                    )}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-brand">
                      /
                    </span>
                  </Link>
                </motion.li>
              ))}
              <li className="pt-4">
                <Button
                  href={customizerCta.href}
                  fullWidth
                  onClick={() => setOpen(false)}
                >
                  {customizerCta.label}
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
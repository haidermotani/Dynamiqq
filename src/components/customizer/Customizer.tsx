"use client";

import { useState } from "react";
import { SingleKitFlow } from "@/components/customizer/SingleKitFlow";
import { TeamFlow } from "@/components/customizer/TeamFlow";
import type { Sport } from "@/data/designs";
import { cn } from "@/lib/cn";

type Mode = "single" | "team";

export function Customizer() {
  const [mode, setMode] = useState<Mode>("single");
  const [sport, setSport] = useState<Sport>("football");

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.25em] text-brand">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
            Kit builder
          </p>
          <h1 className="mt-4 font-display-italic text-4xl font-black uppercase italic leading-[0.95] tracking-tight text-mist sm:text-6xl">
            Design your kit
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            One jersey or a full squad. Build it here, send it on WhatsApp, pay
            by EasyPaisa after we confirm, and we deliver across Karachi.
          </p>
        </div>

        <div
          className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
          role="group"
          aria-label="Order type"
        >
          {(
            [
              { value: "single", label: "Single kit" },
              { value: "team", label: "Team order" },
            ] as const
          ).map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setMode(t.value)}
              aria-pressed={mode === t.value}
              className={cn(
                "border px-6 py-3 font-display text-xs font-extrabold uppercase tracking-[0.2em] transition-colors duration-150",
                mode === t.value
                  ? "border-brand bg-brand text-ink"
                  : "border-line bg-coal text-muted hover:border-brand hover:text-brand",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-10">
        {mode === "single" ? (
          <SingleKitFlow key="single" />
        ) : (
          <TeamFlow key="team" sport={sport} onSportChange={setSport} />
        )}
      </div>
    </div>
  );
}
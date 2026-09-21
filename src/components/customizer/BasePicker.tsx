import type { CustomizerState } from "@/components/customizer/state";
import { stateForDesign } from "@/components/customizer/state";
import { JerseyArt } from "@/components/products/garment";
import type { Sport } from "@/data/designs";
import {
  CRICKET_DESIGNS,
  FOOTBALL_DESIGNS,
  SPORT_LABELS,
  hex,
} from "@/data/designs";
import { cn } from "@/lib/cn";

interface BasePickerProps {
  state: CustomizerState;
  onChange: (next: CustomizerState) => void;
}

function MiniDesign({ colors }: { colors: string[] }) {
  return (
    <JerseyArt
      body={hex(colors[0])}
      sleeves={hex(colors[1])}
      trim={hex(colors[2] ?? colors[0])}
    />
  );
}

export function BasePicker({ state, onChange }: BasePickerProps) {
  function pickSport(sport: Sport) {
    const first = sport === "cricket" ? CRICKET_DESIGNS[0] : FOOTBALL_DESIGNS[0];
    onChange(stateForDesign(state, first.id, sport));
  }

  const designs = state.sport === "cricket" ? CRICKET_DESIGNS : FOOTBALL_DESIGNS;

  return (
    <div>
      <div className="flex gap-2" role="group" aria-label="Choose your sport">
        {(["football", "cricket"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => pickSport(s)}
            aria-pressed={state.sport === s}
            className={cn(
              "flex-1 border px-4 py-3 font-display text-xs font-extrabold uppercase tracking-[0.2em] transition-colors duration-150",
              state.sport === s
                ? "border-brand bg-brand text-ink"
                : "border-line bg-coal text-muted hover:border-brand hover:text-brand",
            )}
          >
            {SPORT_LABELS[s]}
          </button>
        ))}
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {designs.map((design) => {
          const active = state.baseId === design.id;
          return (
            <li key={design.id}>
              <button
                type="button"
                onClick={() => onChange(stateForDesign(state, design.id, state.sport))}
                aria-pressed={active}
                className={cn(
                  "flex w-full items-center gap-4 border p-3 text-left transition-colors duration-150",
                  active
                    ? "border-brand bg-brand/5"
                    : "border-line bg-coal hover:border-brand/50",
                )}
              >
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center border border-line bg-ink p-1.5"
                >
                  <MiniDesign colors={design.defaultColors} />
                </span>
                <span>
                  <span
                    className={cn(
                      "block font-display-italic text-sm font-black uppercase italic",
                      active ? "text-brand" : "text-mist",
                    )}
                  >
                    {design.name}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-muted">
                    {design.description}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
import type { CustomizerState } from "@/components/customizer/state";
import { KIT_DESIGNS, PALETTE, hex } from "@/data/designs";
import { contrastOn } from "@/lib/color";
import { cn } from "@/lib/cn";

interface ColorPickerProps {
  state: CustomizerState;
  onChange: (next: CustomizerState) => void;
}

function setSlot(next: CustomizerState, colors: Record<string, string>): CustomizerState {
  return { ...next, colors };
}

export function ColorPicker({ state, onChange }: ColorPickerProps) {
  const design = KIT_DESIGNS.find((d) => d.id === state.baseId);

  if (!design) return null;

  return (
    <div>
      {design.slots.map((slot) => {
        const current = state.colors[slot.id] ?? design.defaultColors[0];
        return (
          <div key={slot.id} className="mb-6 last:mb-0">
            <p className="mb-2 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-mist">
              {slot.label}
            </p>
            <ul
              className="grid grid-cols-6 gap-2 sm:grid-cols-8"
              role="group"
              aria-label={`${slot.label} colour`}
            >
              {PALETTE.map((sw) => {
                const selected = current === sw.name;
                const bg = hex(sw.name);
                const fg = contrastOn(bg);
                return (
                  <li key={sw.name}>
                    <button
                      type="button"
                      onClick={() =>
                        onChange(setSlot(state, { ...state.colors, [slot.id]: sw.name }))
                      }
                      aria-pressed={selected}
                      aria-label={`${sw.name} for ${slot.label}`}
                      title={sw.name}
                      className={cn(
                        "relative flex aspect-square w-full items-center justify-center border-2 transition-transform duration-100",
                        selected
                          ? "border-brand scale-105"
                          : "border-line hover:border-muted",
                      )}
                      style={{ backgroundColor: bg }}
                    >
                      <span
                        className={cn(
                          "font-display text-[10px] font-bold",
                          selected ? "opacity-100" : "opacity-0",
                        )}
                        style={{ color: fg }}
                      >
                        {sw.name.slice(0, 4)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-1.5 text-[11px] uppercase tracking-widest text-muted">
              {current}
            </p>
          </div>
        );
      })}
    </div>
  );
}
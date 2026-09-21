import type { Sport } from "@/data/designs";
import { KIT_DESIGNS } from "@/data/designs";

export interface UploadedLogo {
  dataUrl: string;
  fileName: string;
}

export interface CustomizerState {
  sport: Sport;
  baseId: string;
  colors: Record<string, string>;
  pattern: string;
  playerName: string;
  playerNumber: string;
  customText: string;
  logo: UploadedLogo | null;
  size: string;
  quantity: string;
  contactName: string;
  phone: string;
  area: string;
  address: string;
  notes: string;
}

export function defaultState(): CustomizerState {
  const base = KIT_DESIGNS[0];
  const colors: Record<string, string> = {};
  base.slots.forEach((slot, i) => {
    colors[slot.id] = base.defaultColors[i];
  });
  return {
    sport: base.sport,
    baseId: base.id,
    colors,
    pattern: "none",
    playerName: "",
    playerNumber: "",
    customText: "",
    logo: null,
    size: "",
    quantity: "1",
    contactName: "",
    phone: "",
    area: "",
    address: "",
    notes: "",
  };
}

export function stateForDesign(state: CustomizerState, baseId: string, sport: Sport): CustomizerState {
  const base = KIT_DESIGNS.find((d) => d.id === baseId && d.sport === sport) ?? KIT_DESIGNS[0];
  const colors: Record<string, string> = {};
  base.slots.forEach((slot, i) => {
    colors[slot.id] = base.defaultColors[i];
  });
  return { ...state, sport: base.sport, baseId: base.id, colors };
}
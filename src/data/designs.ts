export type Sport = "football" | "cricket" | "other";

export interface Swatch {
  name: string;
  hex: string;
}

export const PALETTE: Swatch[] = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "White", hex: "#f4f5f2" },
  { name: "Cyan", hex: "#2fe6e0" },
  { name: "Red", hex: "#dd3b31" },
  { name: "Blue", hex: "#2456b8" },
  { name: "Navy", hex: "#10233f" },
  { name: "Green", hex: "#1a9c5c" },
  { name: "Gold", hex: "#d9b23d" },
  { name: "Yellow", hex: "#f2c020" },
  { name: "Orange", hex: "#ef7a28" },
  { name: "Grey", hex: "#8d9196" },
  { name: "Maroon", hex: "#7c1f24" },
];

export function swatch(name: string): Swatch {
  return PALETTE.find((s) => s.name === name) ?? PALETTE[0];
}

export function hex(name: string): string {
  return swatch(name).hex;
}

export interface KitSlot {
  id: string;
  label: string;
}

export interface KitDesign {
  id: string;
  sport: Sport;
  name: string;
  description: string;
  slots: KitSlot[];
  defaultColors: string[];
}

export const FOOTBALL_DESIGNS: KitDesign[] = [
  {
    id: "home-classic",
    sport: "football",
    name: "Home Classic",
    description: "Clean short-sleeve shirt with bold colour blocking.",
    slots: [
      { id: "body", label: "Shirt" },
      { id: "sleeves", label: "Sleeves" },
      { id: "trim", label: "Collar and trim" },
    ],
    defaultColors: ["Black", "Black", "Cyan"],
  },
  {
    id: "striker",
    sport: "football",
    name: "Striker V2",
    description: "Contrast sleeves and a sharp trim line for strikers.",
    slots: [
      { id: "body", label: "Shirt" },
      { id: "sleeves", label: "Sleeves" },
      { id: "trim", label: "Collar and trim" },
    ],
    defaultColors: ["White", "Black", "Cyan"],
  },
  {
    id: "away-modern",
    sport: "football",
    name: "Away Modern",
    description: "Reversed colour way, built to stand out on the road.",
    slots: [
      { id: "body", label: "Shirt" },
      { id: "sleeves", label: "Sleeves" },
      { id: "trim", label: "Collar and trim" },
    ],
    defaultColors: ["Cyan", "Black", "White"],
  },
  {
    id: "keeper",
    sport: "football",
    name: "Goalkeeper",
    description: "Long-sleeve cut for keepers, with high-visibility body.",
    slots: [
      { id: "body", label: "Shirt" },
      { id: "sleeves", label: "Sleeves" },
      { id: "trim", label: "Collar and trim" },
    ],
    defaultColors: ["Yellow", "Black", "Black"],
  },
];

export const CRICKET_DESIGNS: KitDesign[] = [
  {
    id: "cricket-t20",
    sport: "cricket",
    name: "T20 Pro",
    description: "Lightweight short-sleeve with a modern polo collar.",
    slots: [
      { id: "body", label: "Shirt" },
      { id: "sleeves", label: "Sleeves" },
      { id: "trim", label: "Collar and placket" },
    ],
    defaultColors: ["Navy", "Navy", "Cyan"],
  },
  {
    id: "cricket-od",
    sport: "cricket",
    name: "OD Classic",
    description: "Traditional cut with a deep collar and side trim.",
    slots: [
      { id: "body", label: "Shirt" },
      { id: "sleeves", label: "Sleeves" },
      { id: "trim", label: "Collar and placket" },
    ],
    defaultColors: ["Green", "White", "Gold"],
  },
  {
    id: "cricket-striker",
    sport: "cricket",
    name: "Striker Pro",
    description: "Two-tone sleeves with a strong centre stripe.",
    slots: [
      { id: "body", label: "Shirt" },
      { id: "sleeves", label: "Sleeves" },
      { id: "trim", label: "Collar and placket" },
    ],
    defaultColors: ["Black", "Cyan", "White"],
  },
];

export const KIT_DESIGNS: KitDesign[] = [...FOOTBALL_DESIGNS, ...CRICKET_DESIGNS];

export interface KitPattern {
  id: string;
  name: string;
  hint: string;
}

export const PATTERNS: KitPattern[] = [
  { id: "none", name: "Clean", hint: "Plain body, no striping" },
  { id: "chest-stripe", name: "Chest stripe", hint: "Horizontal band across the chest" },
  { id: "diagonal", name: "Diagonal slash", hint: "Angled slash across the front" },
  { id: "sleeve-band", name: "Sleeve bands", hint: "Ring bands on the sleeves" },
  { id: "split", name: "Half split", hint: "Body split across the middle" },
];

export const STANDARD_SIZES: string[] = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export const SPORT_LABELS: Record<Sport, string> = {
  football: "Football",
  cricket: "Cricket",
  other: "Other",
};
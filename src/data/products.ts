import type { Sport } from "@/data/designs";

export interface ProductVisual {
  style: "shirt" | "shorts" | "jacket";
  body: string;
  sleeves: string;
  trim: string;
  pattern?: string;
  sleeve?: "short" | "long";
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  sport: Sport;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  available: boolean;
  featured?: boolean;
  readyMade: boolean;
  customizable: boolean;
  tag?: string;
  visual: ProductVisual;
  /**
   * Optional real photo override. Drop an image into `public/products/`
   * (e.g. `public/products/home-jersey.jpg`) and set this to
   * `/products/home-jersey.jpg`. Leave empty to keep the built-in artwork.
   */
  image?: string;
}

export const products: Product[] = [
  {
    slug: "home-jersey-25",
    name: "Home Jersey 2025",
    category: "Jerseys",
    sport: "football",
    description:
      "Built for Saturday league football. Short-sleeve poly jersey with finished collar, printed crest and your name and number on the back.",
    price: 1850,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Cyan", "White"],
    available: true,
    featured: true,
    readyMade: true,
    customizable: true,
    tag: "Best seller",
    visual: {
      style: "shirt",
      body: "Black",
      sleeves: "Black",
      trim: "Cyan",
      pattern: "sleeve-band",
      sleeve: "short",
    },
  },
  {
    slug: "away-jersey-25",
    name: "Away Jersey 2025",
    category: "Jerseys",
    sport: "football",
    description:
      "The white alternate kit, with black panels and cyan trim. Same cut as the home shirt, ready to print.",
    price: 1850,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Cyan"],
    available: true,
    readyMade: true,
    customizable: true,
    tag: "New",
    visual: {
      style: "shirt",
      body: "White",
      sleeves: "Black",
      trim: "Cyan",
      pattern: "none",
      sleeve: "short",
    },
  },
  {
    slug: "goalkeeper-kit-25",
    name: "Goalkeeper Kit 2025",
    category: "Kits",
    sport: "football",
    description:
      "Long-sleeve keeper shirt with padded-look finish and high-visibility yellow body, matched shorts not included.",
    price: 2100,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Yellow", "Black", "White"],
    available: true,
    readyMade: true,
    customizable: true,
    visual: {
      style: "shirt",
      body: "Yellow",
      sleeves: "Black",
      trim: "Black",
      pattern: "none",
      sleeve: "long",
    },
  },
  {
    slug: "cricket-t20-jersey-25",
    name: "Cricket T20 Jersey 2025",
    category: "Jerseys",
    sport: "cricket",
    description:
      "Modern T20 cut with a stiff collar and lightweight knit. Sleeve and collar piping as printed, name and number added on request.",
    price: 2100,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Black", "Cyan"],
    available: true,
    featured: true,
    readyMade: true,
    customizable: true,
    tag: "Best seller",
    visual: {
      style: "shirt",
      body: "Navy",
      sleeves: "Navy",
      trim: "Cyan",
      pattern: "chest-stripe",
      sleeve: "short",
    },
  },
  {
    slug: "cricket-od-kit",
    name: "Cricket OD Kit",
    category: "Kits",
    sport: "cricket",
    description:
      "Full cricket kit: shirt and trousers set in one order. Traditional OD layout with gold trim. Team blocks welcome.",
    price: 2600,
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: ["Green", "White", "Gold"],
    available: true,
    readyMade: false,
    customizable: true,
    visual: {
      style: "shirt",
      body: "Green",
      sleeves: "White",
      trim: "Gold",
      pattern: "split",
      sleeve: "short",
    },
  },
  {
    slug: "pro-training-top",
    name: "Pro Training Top",
    category: "Training",
    sport: "football",
    description:
      "Breathable training layer for full sessions. Track-ready fit, printed sleeve trim, plain back for squad printing.",
    price: 1450,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Grey", "Black", "Cyan"],
    available: true,
    featured: true,
    readyMade: true,
    customizable: true,
    visual: {
      style: "shirt",
      body: "Grey",
      sleeves: "Black",
      trim: "Cyan",
      pattern: "diagonal",
      sleeve: "short",
    },
  },
  {
    slug: "club-shorts",
    name: "Club Shorts",
    category: "Kits",
    sport: "football",
    description:
      "Match shorts with elastic waist and printed side panels. Sold per pair, available in team quantities.",
    price: 850,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Cyan"],
    available: true,
    readyMade: true,
    customizable: false,
    visual: {
      style: "shorts",
      body: "Black",
      sleeves: "Black",
      trim: "Cyan",
      pattern: "none",
    },
  },
  {
    slug: "training-track-jacket",
    name: "Training Track Jacket",
    category: "Training",
    sport: "other",
    description:
      "Zip-up jacket for warm-ups and travel days. Heavy fabric, printed chest mark, set-in sleeves.",
    price: 2300,
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: ["Black", "Cyan", "White"],
    available: true,
    readyMade: true,
    customizable: false,
    visual: {
      style: "jacket",
      body: "Black",
      sleeves: "Black",
      trim: "Cyan",
      pattern: "none",
      sleeve: "long",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const PRODUCT_CATEGORIES = ["All", ...Array.from(new Set(products.map((p) => p.category)))] as const;

export const SPORT_FILTERS: Array<{ label: string; value: "all" | Sport }> = [
  { label: "All sports", value: "all" },
  { label: "Football", value: "football" },
  { label: "Cricket", value: "cricket" },
  { label: "Other", value: "other" },
];

export const PRICE_BANDS: Array<{ label: string; min: number; max: number }> = [
  { label: "Under Rs 1,500", min: 0, max: 1499 },
  { label: "Rs 1,500 to 2,000", min: 1500, max: 2000 },
  { label: "Over Rs 2,000", min: 2001, max: Infinity },
];
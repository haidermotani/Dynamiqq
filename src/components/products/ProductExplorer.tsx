"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { PRICE_BANDS, products, SPORT_FILTERS } from "@/data/products";
import { cn } from "@/lib/cn";

function sortKey(p: (typeof products)[number]) {
  return {
    featured: p.featured ? 0 : 1,
    rank: p.available ? 0 : 1,
  };
}

export function ProductExplorer() {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState<(typeof SPORT_FILTERS)[number]["value"]>("all");
  const [price, setPrice] = useState<string>("all");
  const [readyMade, setReadyMade] = useState(false);
  const [customizable, setCustomizable] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => {
        if (sport !== "all" && p.sport !== sport) return false;
        if (price !== "all") {
          const band = PRICE_BANDS.find((b) => b.label === price);
          if (band && (p.price < band.min || p.price > band.max)) return false;
        }
        if (readyMade && !p.readyMade) return false;
        if (customizable && !p.customizable) return false;
        if (q) {
          const haystack = `${p.name} ${p.category} ${p.description} ${p.colors.join(" ")}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return p.available;
      })
      .sort((a, b) => {
        const ka = sortKey(a);
        const kb = sortKey(b);
        return ka.featured - kb.featured || ka.rank - kb.rank;
      });
  }, [query, sport, price, readyMade, customizable]);

  const activeFilters =
    sport !== "all" ||
    price !== "all" ||
    readyMade ||
    customizable ||
    query.trim() !== "";

  const filterChip = (active: boolean) =>
    cn(
      "shrink-0 border px-3 py-2 font-display text-[11px] font-extrabold uppercase tracking-[0.15em] transition-colors duration-150",
      active
        ? "border-brand bg-brand text-ink"
        : "border-line bg-coal text-muted hover:border-brand hover:text-brand",
    );

  return (
    <div>
      <div className="flex flex-col gap-4">
        <label className="sr-only" htmlFor="product-search">
          Search products
        </label>
        <div className="relative">
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jerseys, cricket kits, training tops..."
            autoComplete="off"
            className="w-full border border-line bg-coal py-4 pl-4 pr-4 font-sans text-sm text-mist placeholder:text-muted focus:border-brand focus:outline-none"
          />
        </div>

        <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {SPORT_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setSport(f.value)}
              className={filterChip(sport === f.value)}
              aria-pressed={sport === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="price-filter">
            Price range
          </label>
          <select
            id="price-filter"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-line bg-coal px-3 py-2 font-display text-[11px] font-extrabold uppercase tracking-[0.15em] text-muted focus:border-brand focus:outline-none"
            aria-label="Filter by price"
          >
            <option value="all">All prices</option>
            {PRICE_BANDS.map((b) => (
              <option key={b.label} value={b.label}>
                {b.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setReadyMade((v) => !v)}
            className={filterChip(readyMade)}
            aria-pressed={readyMade}
          >
            Ready made
          </button>
          <button
            type="button"
            onClick={() => setCustomizable((v) => !v)}
            className={filterChip(customizable)}
            aria-pressed={customizable}
          >
            Customisable
          </button>

          {activeFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSport("all");
                setPrice("all");
                setReadyMade(false);
                setCustomizable(false);
              }}
              className="ml-auto shrink-0 px-2 py-2 font-display text-[11px] font-bold uppercase tracking-[0.15em] text-brand underline-offset-4 hover:underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-4 border border-line bg-coal p-10 text-center">
          <p className="font-display-italic text-lg font-black uppercase italic text-mist">
            Nothing matches that
          </p>
          <p className="mt-2 text-sm text-muted">
            Try another search or clear the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSport("all");
              setPrice("all");
              setReadyMade(false);
              setCustomizable(false);
            }}
            className="mt-6 inline-flex border-2 border-brand px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider text-brand transition-colors hover:bg-brand hover:text-ink"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/products/ProductVisual";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/data/products";
import { SPORT_LABELS } from "@/data/designs";
import { formatPrice } from "@/lib/format";
import { waLink } from "@/lib/contact";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col border border-line bg-coal transition-colors duration-300 hover:border-brand/60">
      <div className="relative aspect-square overflow-hidden border-b border-line">
        <ProductVisual
          product={product}
          className="h-full w-full p-6 transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:p-8"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.tag && <Badge tone="brand">{product.tag}</Badge>}
          {product.featured && <Badge tone="line">Featured</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
          <span className="text-brand">{product.category}</span>
          <span aria-hidden="true">/</span>
          <span>{SPORT_LABELS[product.sport]}</span>
        </div>

        <h3 className="font-display-italic text-xl font-black uppercase italic text-mist">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {product.readyMade && (
            <Badge tone="line">Ready made</Badge>
          )}
          {product.customizable && (
            <Badge tone="brand">Customisable</Badge>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="font-display text-lg font-black text-mist">
            {formatPrice(product.price)}
          </p>
          {product.available ? (
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              Available
            </span>
          ) : (
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
              Made to order
            </span>
          )}
        </div>

        <div className="pt-3">
          {product.customizable ? (
            <Link
              href="/customizer"
              className="inline-flex w-full items-center justify-center gap-2 border-2 border-brand bg-brand/0 px-4 py-2.5 font-display text-xs font-extrabold uppercase tracking-wider text-brand transition-all duration-200 hover:bg-brand hover:text-ink"
            >
              Customise this kit
            </Link>
          ) : (
            <a
              href={waLink(
                `Assalam o Alaikum! I want to enquire about the ${product.name} priced ${formatPrice(product.price)}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 border-2 border-line px-4 py-2.5 font-display text-xs font-extrabold uppercase tracking-wider text-mist transition-all duration-200 hover:border-brand hover:text-brand"
            >
              Enquire on WhatsApp
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
import Image from "next/image";
import type { Product } from "@/data/products";
import { hex } from "@/data/designs";
import { JerseyArt, ShortsArt, JacketArt } from "@/components/products/garment";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface ProductVisualProps {
  product: Product;
  className?: string;
  children?: ReactNode;
}

export function ProductVisual({ product, className, children }: ProductVisualProps) {
  const { body, sleeves, trim, pattern, sleeve } = product.visual;
  const common = {
    body: hex(body),
    sleeves: hex(sleeves),
    trim: hex(trim),
    pattern,
    children,
  };

  if (product.image) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <Image
          src={product.image}
          alt={`${product.name} product image`}
          width={800}
          height={800}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {product.visual.style === "shorts" ? (
        <ShortsArt {...common} />
      ) : product.visual.style === "jacket" ? (
        <JacketArt {...common} />
      ) : (
        <JerseyArt {...common} longSleeve={sleeve === "long"} />
      )}
    </div>
  );
}
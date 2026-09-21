import type { SVGProps } from "react";
import { JerseyArt } from "@/components/products/garment";
import type { CustomizerState } from "@/components/customizer/state";
import { hex } from "@/data/designs";
import { contrastOn } from "@/lib/color";

interface KitPreviewProps {
  state: CustomizerState;
  className?: string;
}

export function KitPreview({ state, className, ...rest }: KitPreviewProps & SVGProps<SVGSVGElement>) {
  const design = state.colors;
  const body = hex(design.body ?? "Black");
  const sleeves = hex(design.sleeves ?? "Black");
  const trim = hex(design.trim ?? "Cyan");
  const frontInk = contrastOn(body);

  const hasNumber = state.playerNumber.trim().length > 0;
  const hasName = state.playerName.trim().length > 0;
  const hasCustomText = state.customText.trim().length > 0;

  return (
    <JerseyArt
      body={body}
      sleeves={sleeves}
      trim={trim}
      pattern={state.pattern}
      longSleeve={state.baseId === "keeper"}
      className={className}
      {...rest}
    >
      {state.logo && (
        <g>
          <rect
            x="91"
            y="83"
            width="32"
            height="24"
            fill="#ffffff"
            stroke={frontInk}
            strokeWidth="1"
          />
          <image
            href={state.logo.dataUrl}
            x="92"
            y="84"
            width="30"
            height="22"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      )}
      {hasNumber && (
        <text
          x="120"
          y="156"
          textAnchor="middle"
          fontFamily="Archivo, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="52"
          fill={frontInk}
        >
          {state.playerNumber}
        </text>
      )}
      {hasName && (
        <text
          x="120"
          y="122"
          textAnchor="middle"
          fontFamily="Archivo, sans-serif"
          fontWeight="800"
          fontSize="12"
          letterSpacing="1.5"
          fill={frontInk}
        >
          {state.playerName.toUpperCase()}
        </text>
      )}
      {hasCustomText && (
        <text
          x="120"
          y="196"
          textAnchor="middle"
          fontFamily="Archivo, sans-serif"
          fontWeight="700"
          fontStyle="italic"
          fontSize="11"
          letterSpacing="1"
          fill={frontInk}
        >
          {state.customText.toUpperCase()}
        </text>
      )}
    </JerseyArt>
  );
}
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ArtProps {
  body: string;
  sleeves: string;
  trim: string;
  pattern?: string;
  longSleeve?: boolean;
  className?: string;
  children?: ReactNode;
}

export function JerseyArt({
  body,
  sleeves,
  trim,
  pattern = "none",
  longSleeve = false,
  className,
  children,
}: ArtProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `jersey-body-${uid}`;

  return (
    <svg viewBox="0 0 240 260" role="img" aria-label="Jersey preview" className={cn(className)}>
      <defs>
        <clipPath id={clip}>
          <path d="M120 38 C108 40 96 44 90 50 L74 64 L78 74 L72 218 L168 218 L162 74 L166 64 L150 50 C144 44 132 40 120 38 Z" />
        </clipPath>
      </defs>

      {/* sleeves */}
      <path d="M90 50 L74 64 L68 62 L64 80 L58 80 L54 74 L60 118 L82 118 L84 66 L96 60 L99 54 C98 52 96 51 94 50 Z" fill={sleeves} />
      <path d="M150 50 L166 64 L172 62 L176 80 L182 80 L186 74 L180 118 L158 118 L156 66 L144 60 L141 54 C142 52 144 51 146 50 Z" fill={sleeves} />

      {/* pattern layer clipped to body */}
      <g clipPath={`url(#${clip})`}>
        {pattern === "chest-stripe" && (
          <>
            <rect x="60" y="104" width="130" height="22" fill={trim} opacity="0.9" />
            <rect x="60" y="152" width="130" height="8" fill={trim} opacity="0.55" />
          </>
        )}
        {pattern === "diagonal" && (
          <>
            <path d="M60 60 L180 190 L180 218 L60 88 Z" fill={trim} opacity="0.85" />
            <path d="M60 100 L120 240 L100 240 L40 100 Z" fill={trim} opacity="0.35" />
          </>
        )}
        {pattern === "sleeve-band" && (
          <>
            <rect x="60" y="120" width="130" height="10" fill={trim} />
            <rect x="60" y="172" width="130" height="10" fill={trim} opacity="0.7" />
          </>
        )}
        {pattern === "split" && (
          <>
            <rect x="120" y="38" width="70" height="182" fill={sleeves} opacity="0.35" />
            <path d="M120 38 L124 38 L126 218 L120 218 Z" fill={trim} />
          </>
        )}
      </g>

      {/* body */}
      <path
        d="M120 38 C108 40 96 44 90 50 L74 64 L78 74 L72 218 L168 218 L162 74 L166 64 L150 50 C144 44 132 40 120 38 Z"
        fill={body}
      />

      {/* shoulder trim */}
      <path d="M92 52 L76 64" stroke={trim} strokeWidth="5" strokeLinecap="square" />
      <path d="M148 52 L164 64" stroke={trim} strokeWidth="5" strokeLinecap="square" />

      {/* side panels */}
      <path d="M78 74 L72 218 L80 218 L86 74 Z" fill={trim} opacity="0.9" />
      <path d="M162 74 L168 218 L160 218 L154 74 Z" fill={trim} opacity="0.9" />

      {/* sleeves again (over body) with cuff */}
      <g>
        <path d="M90 50 L74 64 L68 62 L64 80 L58 80 L54 74 L60 118 L82 118 L84 66 L96 60 L99 54 C98 52 96 51 94 50 Z" fill={sleeves} />
        <rect x="55" y={longSleeve ? 186 : 108} width="27" height="10" fill={trim} />
        <path d="M150 50 L166 64 L172 62 L176 80 L182 80 L186 74 L180 118 L158 118 L156 66 L144 60 L141 54 C142 52 144 51 146 50 Z" fill={sleeves} />
        <rect x="158" y={longSleeve ? 186 : 108} width="27" height="10" fill={trim} />
      </g>

      {/* collar */}
      <path d="M100 42 Q120 40 140 42 L136 52 Q120 60 104 52 Z" fill={trim} />
      <path d="M106 45 Q120 52 134 45 L132 49 Q120 54 108 49 Z" fill={body} />

      {children}
    </svg>
  );
}

export function ShortsArt({ body, sleeves, trim, pattern }: ArtProps) {
  void sleeves;
  void pattern;
  return (
    <svg viewBox="0 0 240 260" role="img" aria-label="Shorts preview">
      <rect x="52" y="52" width="136" height="16" fill={trim} />
      <path d="M52 58 L88 232 L124 232 L124 58 Z" fill={body} />
      <path d="M188 58 L152 232 L116 232 L116 58 Z" fill={body} opacity="0.9" />
      <path d="M84 58 L92 232 L100 232 L94 58 Z" fill={trim} opacity="0.9" />
      <path d="M156 58 L148 232 L140 232 L146 58 Z" fill={trim} opacity="0.9" />
      <rect x="52" y="52" width="136" height="8" fill={body} />
    </svg>
  );
}

export function JacketArt({
  body,
  sleeves,
  trim,
  pattern,
  longSleeve = true,
  children,
}: ArtProps) {
  void pattern;
  void longSleeve;
  return (
    <svg viewBox="0 0 240 260" role="img" aria-label="Jacket preview">
      <path d="M90 46 L66 58 L62 52 L58 78 L52 76 L46 72 L54 200 L86 200 L96 140 L96 62 L99 50 C99 50 100 48 102 46 Z" fill={sleeves} />
      <path d="M150 46 L174 58 L178 52 L182 78 L188 76 L194 72 L186 200 L154 200 L144 140 L144 62 L141 50 C141 50 140 48 138 46 Z" fill={sleeves} />
      <path d="M102 46 L96 62 L96 140 L66 200 L174 200 L144 140 L144 62 L138 46 C138 46 138 70 120 74 C102 70 102 46 102 46 Z" fill={body} />
      <path d="M120 62 L120 202" stroke={trim} strokeWidth="4" strokeDasharray="8 6" />
      <rect x="96" y="44" width="48" height="14" rx="2" fill={trim} />
      <rect x="70" y="52" width="24" height="12" fill={trim} opacity="0.9" />
      <rect x="146" y="52" width="24" height="12" fill={trim} opacity="0.9" />
      <rect x="78" y="190" width="20" height="10" fill={trim} />
      <rect x="142" y="190" width="20" height="10" fill={trim} />
      {children}
    </svg>
  );
}
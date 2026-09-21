import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoMarkProps {
  className?: string;
  priority?: boolean;
}

export function LogoMark({ className, priority }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm bg-ink",
        className,
      )}
    >
      <Image
        src="/darkmode.jpg"
        alt="Dynamiq logo"
        width={1254}
        height={1254}
        priority={priority}
        draggable={false}
        className="h-full w-full object-cover mix-blend-screen"
      />
    </span>
  );
}

interface WordmarkProps {
  className?: string;
  boltClass?: string;
}

export function Wordmark({ className, boltClass }: WordmarkProps) {
  return (
    <svg
      viewBox="0 0 236 58"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <text
        x="0"
        y="46"
        fontFamily="Archivo, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="46"
        fill="#f2f4f3"
      >
        DYN
      </text>
      <path
        d="M106 4h15l-8 19h14l-23 31 6-23H94l12-27Z"
        className={cn("fill-brand", boltClass)}
      />
      <text
        x="130"
        y="46"
        fontFamily="Archivo, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="46"
        fill="#2fe6e0"
      >
        MIQ
      </text>
    </svg>
  );
}
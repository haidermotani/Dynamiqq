export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(m)) return null;
  const int = parseInt(m, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

export function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
}

export function contrastOn(hex: string): string {
  return luminance(hex) > 150 ? "#0a0a0a" : "#f2f4f3";
}
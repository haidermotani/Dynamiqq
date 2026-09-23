import { business } from "@/config/business";

export function waNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith(business.countryCode)) return digits;
  if (digits.startsWith("0")) return business.countryCode + digits.slice(1);
  return business.countryCode + digits;
}

export function waLink(message: string): string {
  const url = `https://wa.me/${waNumber(business.whatsapp)}`;
  const text = encodeURIComponent(message);
  return `${url}?text=${text}`;
}

export function waNumberDisplay(raw: string): string {
  const d = raw.replace(/\D/g, "");
  return `${d.slice(0, 4)} ${d.slice(4)}`;
}
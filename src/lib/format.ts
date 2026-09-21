import { business } from "@/config/business";

export function formatPrice(amount: number): string {
  const formatted = amount.toLocaleString("en-PK");
  return `${business.currency.symbol} ${formatted}`;
}
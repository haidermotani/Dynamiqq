import { business } from "@/config/business";

export interface CustomColorChoice {
  slot: string;
  colorName: string;
}

export interface IndividualOrder {
  sport: string;
  design: string;
  colors: CustomColorChoice[];
  pattern: string;
  playerName: string;
  playerNumber: string;
  customText: string;
  hasLogo: boolean;
  size: string;
  quantity: string;
  contactName: string;
  phone: string;
  area: string;
  address: string;
  notes: string;
}

export interface TeamPlayerEntry {
  name: string;
  number: string;
  size: string;
}

export interface TeamOrder {
  teamName: string;
  sport: string;
  players: TeamPlayerEntry[];
  totalQuantity: number;
  hasLogo: boolean;
  requirements: string;
  contactName: string;
  phone: string;
  deliveryLocation: string;
}

const MSG_MARK = { copy: "DYNAMIQ" };

export function buildIndividualWhatsApp(order: IndividualOrder): string {
  const lines: string[] = [];
  lines.push(`*${MSG_MARK.copy} CUSTOM KIT ORDER*`);
  lines.push("");
  lines.push("*KIT DETAILS*");
  if (order.sport) lines.push(`Sport: ${order.sport}`);
  if (order.design) lines.push(`Design: ${order.design}`);
  const colorRows = order.colors
    .filter((c) => c.colorName)
    .map((c) => `${c.slot}: ${c.colorName}`);
  if (colorRows.length) {
    lines.push(`Colors: ${colorRows.join(" / ")}`);
  }
  lines.push(`Pattern: ${order.pattern || "Clean"}`);
  lines.push(`Player: ${order.playerName || "-"} (${order.playerNumber || "-"})`);
  lines.push(`Extra text: ${order.customText || "-"}`);
  lines.push(`Logo: ${order.hasLogo ? "Yes, sending image" : "No"}`);
  lines.push("");
  lines.push("*ORDER*");
  lines.push(`Size: ${order.size}`);
  lines.push(`Quantity: ${order.quantity}`);
  lines.push("");
  lines.push("*CONTACT*");
  lines.push(`Name: ${order.contactName}`);
  lines.push(`Phone: ${order.phone}`);
  lines.push(`Area: ${order.area || business.city}`);
  lines.push(`Delivery address: ${order.address || "To be confirmed"}`);
  lines.push("");
  lines.push(`*Delivery: ${business.deliveryArea}*`);
  if (order.notes) lines.push("");
  if (order.notes) lines.push("*NOTES*");
  if (order.notes) lines.push(order.notes);
  lines.push("");
  lines.push("Payment: EasyPaisa, confirmed after quotation.");

  return lines.filter((l) => l.trim() !== "").join("\n");
}

export function buildTeamWhatsApp(order: TeamOrder): string {
  const lines: string[] = [];
  lines.push(`*${MSG_MARK.copy} TEAM / BULK QUOTATION*`);
  lines.push("");
  lines.push(`*Team:* ${order.teamName || "-"}`);
  lines.push(`*Sport:* ${order.sport}`);
  lines.push("");
  lines.push("*PLAYERS*");
  if (order.players.length) {
    order.players.forEach((p, i) => {
      const name = p.name || `Player ${i + 1}`;
      const num = p.number ? ` (#${p.number})` : "";
      const size = p.size ? ` size ${p.size}` : "";
      lines.push(`${i + 1}. ${name}${num}${size}`);
    });
  } else {
    lines.push("Details to be shared");
  }
  lines.push("");
  lines.push(`*Total quantity:* ${order.totalQuantity}`);
  lines.push(`*Team logo:* ${order.hasLogo ? "Yes, sending image" : "No"}`);
  lines.push(`*Requirements:* ${order.requirements || "-"}`);
  lines.push("");
  lines.push("*CONTACT*");
  lines.push(`Name: ${order.contactName}`);
  lines.push(`Phone: ${order.phone}`);
  lines.push(`Delivery location: ${order.deliveryLocation || business.deliveryArea}`);
  lines.push("");
  lines.push("Payment: EasyPaisa, confirmed after quotation.");

  return lines.filter((l) => l.trim() !== "").join("\n");
}
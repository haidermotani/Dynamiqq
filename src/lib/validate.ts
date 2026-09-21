import type { CustomizerState } from "@/components/customizer/state";

export interface SingleErrors {
  contactName?: string;
  phone?: string;
  size?: string;
  quantity?: string;
}

export function validatePhone(raw: string): boolean {
  const digits = raw.replace(/\s|-/g, "");
  return /^(\+?92)?3\d{9}$/.test(digits);
}

export function validateSingle(state: CustomizerState): SingleErrors {
  const errors: SingleErrors = {};

  if (!state.contactName.trim()) {
    errors.contactName = "Enter your name so we know who to contact.";
  }
  if (!state.phone.trim()) {
    errors.phone = "Enter a phone number. Prefer a mobile number.";
  } else if (!validatePhone(state.phone)) {
    errors.phone = "That number does not look right. Use a Pakistani mobile number.";
  }
  if (!state.size) {
    errors.size = "Pick a size.";
  }
  if (!/^[1-9]\d*$/.test(state.quantity)) {
    errors.quantity = "Quantity must be at least 1.";
  }

  return errors;
}

export interface TeamErrors {
  teamName?: string;
  contactName?: string;
  phone?: string;
  players?: string;
}

export function validateTeam(fields: {
  teamName: string;
  contactName: string;
  phone: string;
  players: Array<{ name: string; size: string }>;
}): TeamErrors {
  const errors: TeamErrors = {};

  if (!fields.teamName.trim()) {
    errors.teamName = "Enter your team or club name.";
  }
  if (!fields.contactName.trim()) {
    errors.contactName = "Enter the contact person's name.";
  }
  if (!fields.phone.trim()) {
    errors.phone = "Enter a phone number.";
  } else if (!validatePhone(fields.phone)) {
    errors.phone = "That number does not look right. Use a Pakistani mobile number.";
  }
  if (!fields.players.some((p) => p.name.trim())) {
    errors.players = "Add at least one player with a name.";
  }

  return errors;
}
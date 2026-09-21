"use client";

import { useState } from "react";
import { LogoUpload } from "@/components/customizer/LogoUpload";
import { Section } from "@/components/customizer/Section";
import { TextInput, SelectInput, TextArea } from "@/components/customizer/fields";
import { Button, ArrowIcon } from "@/components/ui/Button";
import type { UploadedLogo } from "@/components/customizer/state";
import { SPORT_LABELS, STANDARD_SIZES, type Sport } from "@/data/designs";
import { business } from "@/config/business";
import { validateTeam, type TeamErrors } from "@/lib/validate";
import { waLink } from "@/lib/contact";
import { buildTeamWhatsApp, type TeamPlayerEntry } from "@/lib/whatsapp";

const MAX_PLAYERS = 22;

interface TeamFlowProps {
  sport: Sport;
  onSportChange: (sport: Sport) => void;
}

function emptyRow(): TeamPlayerEntry {
  return { name: "", number: "", size: "" };
}

export function TeamFlow({ sport, onSportChange }: TeamFlowProps) {
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState<TeamPlayerEntry[]>([emptyRow()]);
  const [logo, setLogo] = useState<UploadedLogo | null>(null);
  const [requirements, setRequirements] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [errors, setErrors] = useState<TeamErrors>({});

  const filledPlayers = players.filter((p) => p.name.trim() || p.number.trim() || p.size);
  const totalQuantity = players.filter((p) => p.name.trim()).length;

  function updatePlayer(index: number, field: keyof TeamPlayerEntry, value: string) {
    setPlayers((list) =>
      list.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );
  }

  function addRow() {
    setPlayers((list) => (list.length < MAX_PLAYERS ? [...list, emptyRow()] : list));
  }

  function removeRow(index: number) {
    setPlayers((list) => (list.length > 1 ? list.filter((_, i) => i !== index) : list));
  }

  function submit() {
    const errs = validateTeam({
      teamName,
      contactName,
      phone,
      players: players.filter((p) => p.name.trim()),
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const message = buildTeamWhatsApp({
      teamName,
      sport: SPORT_LABELS[sport],
      players: players.filter((p) => p.name.trim()),
      totalQuantity,
      hasLogo: logo !== null,
      requirements,
      contactName,
      phone,
      deliveryLocation,
    });
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-line bg-coal p-6">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand">
            Team order
          </p>
          <h3 className="mt-3 font-display-italic text-2xl font-black uppercase italic text-mist">
            Bulk kits for squads and clubs
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            We quote full team kits: matching shirts, names and numbers for
            every player, plus your crest. Trade price gets better as the squad
            gets bigger, so tell us your real numbers.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
            <div>
              <dt className="font-display text-[11px] font-extrabold uppercase tracking-widest text-muted">
                Sport
              </dt>
              <dd className="mt-1 font-display font-bold text-mist">
                {SPORT_LABELS[sport]}
              </dd>
            </div>
            <div>
              <dt className="font-display text-[11px] font-extrabold uppercase tracking-widest text-muted">
                Players listed
              </dt>
              <dd className="mt-1 font-display font-bold text-mist">
                {filledPlayers.length}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-10">
          <Section
            step={1}
            title="Team basics"
            subtitle="Who is ordering, and what sport?"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                label="Team name"
                required
                placeholder="e.g. Falcons FC"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                error={errors.teamName}
              />
              <SelectInput
                label="Sport"
                value={sport}
                onChange={(e) => onSportChange(e.target.value as Sport)}
                options={[
                  { value: "football", label: "Football" },
                  { value: "cricket", label: "Cricket" },
                ]}
              />
            </div>
          </Section>

          <Section
            step={2}
            title="Players"
            subtitle="List the squad with name, number and size. You can add up to 22 rows."
          >
            {errors.players && (
              <p
                role="alert"
                className="mb-4 flex items-center gap-2 text-xs font-medium text-brand"
              >
                <span aria-hidden="true" className="inline-block h-2 w-2 bg-brand" />
                {errors.players}
              </p>
            )}
            <ul className="flex flex-col gap-3">
              {players.map((player, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[1.6fr_1fr_1fr_auto] items-end gap-3"
                >
                  <TextInput
                    label={`Player ${index + 1} name`}
                    hideLabel={index > 0}
                    placeholder={`Player ${index + 1}`}
                    value={player.name}
                    onChange={(e) => updatePlayer(index, "name", e.target.value)}
                  />
                  <TextInput
                    label={`Player ${index + 1} number`}
                    hideLabel={index > 0}
                    placeholder="#"
                    inputMode="numeric"
                    maxLength={3}
                    value={player.number}
                    onChange={(e) =>
                      updatePlayer(index, "number", e.target.value.replace(/[^\d]/g, ""))
                    }
                  />
                  <SelectInput
                    label={`Player ${index + 1} size`}
                    hideLabel={index > 0}
                    value={player.size}
                    onChange={(e) => updatePlayer(index, "size", e.target.value)}
                    options={[
                      { value: "", label: "Size" },
                      ...STANDARD_SIZES.map((s) => ({ value: s, label: s })),
                    ]}
                  />
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    aria-label={`Remove player ${index + 1}`}
                    className="mb-1 flex h-11 items-center justify-center border border-line px-3 font-display text-sm font-bold text-muted transition-colors hover:border-brand hover:text-brand"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={addRow}
              disabled={players.length >= MAX_PLAYERS}
              className="mt-4 inline-flex border-2 border-dashed border-line px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:border-brand hover:text-brand disabled:opacity-40"
            >
              Add player row
            </button>
            <p className="mt-3 text-xs text-muted">
              {totalQuantity} shirt{totalQuantity === 1 ? "" : "s"} with names
              and numbers.
            </p>
          </Section>

          <Section
            step={3}
            title="Team logo and extras"
            subtitle="Crest or badge, plus anything else printed on the kit."
          >
            <div className="flex flex-col gap-6">
              <LogoUpload
                label="Team logo"
                logo={logo}
                onChange={setLogo}
              />
              <TextArea
                label="Customisation requirements"
                hint="Optional"
                placeholder="e.g. same print on all shirts, gold trim, shorts included"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              />
            </div>
          </Section>

          <Section
            step={4}
            title="Contact and delivery"
            subtitle="Where the quotation and the kits go."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                label="Contact person"
                required
                autoComplete="name"
                placeholder="Full name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                error={errors.contactName}
              />
              <TextInput
                label="Phone / WhatsApp"
                required
                inputMode="tel"
                placeholder="03xx xxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
              />
              <div className="sm:col-span-2">
                <TextInput
                  label="Delivery location"
                  hint={`${business.deliveryArea} for now`}
                  placeholder="Ground, club or pickup point"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                />
              </div>
            </div>
          </Section>

          <Section
            step={5}
            title="Send for quotation"
            subtitle="A structured summary goes straight to our WhatsApp. No data is stored."
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button size="lg" onClick={submit} ariaLabel="Request bulk quotation on WhatsApp">
                Request quotation
                <ArrowIcon />
              </Button>
              <p className="max-w-xs text-xs leading-relaxed text-muted">
                We reply with a full price per player, payment via EasyPaisa
                ({business.easypaisa}) and a production date.
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
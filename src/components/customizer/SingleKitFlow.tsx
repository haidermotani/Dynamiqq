"use client";

import { useMemo, useState } from "react";
import { KitPreview } from "@/components/customizer/KitPreview";
import { Section } from "@/components/customizer/Section";
import { BasePicker } from "@/components/customizer/BasePicker";
import { ColorPicker } from "@/components/customizer/ColorPicker";
import { PatternPicker } from "@/components/customizer/PatternPicker";
import { LogoUpload } from "@/components/customizer/LogoUpload";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { TextInput, SelectInput, TextArea } from "@/components/customizer/fields";
import type { CustomizerState } from "@/components/customizer/state";
import { defaultState } from "@/components/customizer/state";
import { KIT_DESIGNS, SPORT_LABELS, STANDARD_SIZES } from "@/data/designs";
import { business } from "@/config/business";
import { validateSingle, type SingleErrors } from "@/lib/validate";
import { waLink } from "@/lib/contact";
import { buildIndividualWhatsApp, type IndividualOrder } from "@/lib/whatsapp";

export function SingleKitFlow() {
  const [state, setState] = useState<CustomizerState>(defaultState);
  const [errors, setErrors] = useState<SingleErrors>({});

  const design = KIT_DESIGNS.find((d) => d.id === state.baseId);

  const needsReview = useMemo(
    () => Object.keys(validateSingle(state)).length === 0,
    [state],
  );

  function submit() {
    const errs = validateSingle(state);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const order: IndividualOrder = {
      sport: SPORT_LABELS[state.sport],
      design: design?.name ?? "",
      colors: (design?.slots ?? []).map((slot) => ({
        slot: slot.label,
        colorName: state.colors[slot.id] ?? "",
      })),
      pattern: state.pattern,
      playerName: state.playerName,
      playerNumber: state.playerNumber,
      customText: state.customText,
      hasLogo: state.logo !== null,
      size: state.size,
      quantity: state.quantity,
      contactName: state.contactName,
      phone: state.phone,
      area: state.area,
      address: state.address,
      notes: state.notes,
    };

    const message = buildIndividualWhatsApp(order);
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  const set = (patch: Partial<CustomizerState>) => setState((s) => ({ ...s, ...patch }));

  const summaryRows: Array<[string, string]> = [
    ["Sport", SPORT_LABELS[state.sport]],
    ["Design", design?.name ?? ""],
    [
      "Colours",
      (design?.slots ?? [])
        .map((slot) => state.colors[slot.id])
        .filter(Boolean)
        .join(" / "),
    ],
    ["Pattern", state.pattern],
    ["Player", `${state.playerName || "-"} / ${state.playerNumber || "-"}`.trim()],
    ["Extra text", state.customText || "none"],
    ["Logo", state.logo ? "Uploaded, will send" : "none"],
    ["Size and qty", `${state.size || "not set"} x ${state.quantity || "0"}`],
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-line bg-coal p-5">
          <p className="flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.25em] text-brand">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
            Live preview
          </p>
          <div className="mx-auto mt-4 max-w-sm">
            <KitPreview state={state} className="animate-drift" />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-4 text-xs">
            <div>
              <dt className="uppercase tracking-widest text-muted">Kit</dt>
              <dd className="mt-1 font-display font-bold text-mist">
                {SPORT_LABELS[state.sport]} / {design?.name}
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-muted">
                Size / Qty
              </dt>
              <dd className="mt-1 font-display font-bold text-mist">
                {state.size || "pick a size"} x {state.quantity}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div>
        <SectionHeading
          eyebrow="Build your kit"
          title={
            <>
              Your kit, <span className="text-brand">your call</span>
            </>
          }
          description="Pick a base, set the colours, add a name and number. Everything below updates the preview live."
        />
        <div className="mt-10 flex flex-col gap-12">
          <Section
            step={1}
            title="Kit base"
            subtitle="Choose your sport and starting design. You can change everything after."
          >
            <BasePicker state={state} onChange={setState} />
          </Section>

          <Section
            step={2}
            title="Colours"
            subtitle="Set each part of the kit from the Dynamiq palette."
          >
            <ColorPicker state={state} onChange={setState} />
          </Section>

          <Section
            step={3}
            title="Pattern"
            subtitle="Optional styling printed across the front. Clean works too."
          >
            <PatternPicker state={state} onChange={setState} />
          </Section>

          <Section
            step={4}
            title="Player details"
            subtitle="Name on the back, number on the front. Extra text goes under the number."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                label="Player name"
                placeholder="e.g. Hassan"
                value={state.playerName}
                onChange={(e) => set({ playerName: e.target.value })}
                maxLength={16}
              />
              <TextInput
                label="Player number"
                placeholder="e.g. 10"
                value={state.playerNumber}
                onChange={(e) =>
                  set({ playerNumber: e.target.value.replace(/[^\d]/g, "") })
                }
                maxLength={3}
                inputMode="numeric"
              />
              <div className="sm:col-span-2">
                <TextInput
                  label="Extra custom text"
                  hint="Optional"
                  placeholder="e.g. Captain, or a slogan"
                  value={state.customText}
                  onChange={(e) => set({ customText: e.target.value })}
                  maxLength={24}
                />
              </div>
            </div>
          </Section>

          <Section
            step={5}
            title="Team logo"
            subtitle="Add your crest, club badge or school logo. Nothing is stored."
          >
            <LogoUpload
              label="Logo or image"
              logo={state.logo}
              onChange={(logo) => set({ logo })}
            />
          </Section>

          <Section
            step={6}
            title="Order details"
            subtitle="Where do we confirm your order on WhatsApp, and where do we send it in Karachi?"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectInput
                label="Size"
                required
                value={state.size}
                onChange={(e) => set({ size: e.target.value })}
                options={[
                  { value: "", label: "Pick a size" },
                  ...STANDARD_SIZES.map((s) => ({ value: s, label: s })),
                ]}
                error={errors.size}
              />
              <TextInput
                label="Quantity"
                required
                inputMode="numeric"
                value={state.quantity}
                onChange={(e) =>
                  set({ quantity: e.target.value.replace(/[^\d]/g, "") })
                }
                error={errors.quantity}
              />
              <TextInput
                label="Your name"
                required
                placeholder="Full name"
                autoComplete="name"
                value={state.contactName}
                onChange={(e) => set({ contactName: e.target.value })}
                error={errors.contactName}
              />
              <TextInput
                label="Phone / WhatsApp"
                required
                placeholder="03xx xxxxxxx"
                autoComplete="tel"
                inputMode="tel"
                value={state.phone}
                onChange={(e) => set({ phone: e.target.value })}
                error={errors.phone}
              />
              <TextInput
                label="Area"
                hint={`${business.deliveryArea} city`}
                placeholder="e.g. Gulshan-e-Iqbal"
                value={state.area}
                onChange={(e) => set({ area: e.target.value })}
              />
              <TextInput
                label="Delivery address"
                hint="Optional"
                placeholder="Street, house or pickup point"
                value={state.address}
                onChange={(e) => set({ address: e.target.value })}
              />
              <div className="sm:col-span-2">
                <TextArea
                  label="Notes"
                  hint="Optional"
                  placeholder="Anything the team should know before confirming"
                  value={state.notes}
                  onChange={(e) => set({ notes: e.target.value })}
                />
              </div>
            </div>
          </Section>

          <Section
            step={7}
            title="Review and order"
            subtitle="Check your kit before sending. We confirm price, payment and pickup or delivery on WhatsApp."
          >
            <dl className="border border-line bg-coal">
              {summaryRows.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-start justify-between gap-6 border-b border-line/60 px-4 py-3 last:border-0"
                >
                  <dt className="shrink-0 font-display text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted">
                    {k}
                  </dt>
                  <dd className="text-right text-sm text-mist">{v}</dd>
                </div>
              ))}
            </dl>

            {!needsReview && (
              <p
                role="alert"
                className="mt-4 flex items-center gap-2 text-xs font-medium text-brand"
              >
                <span aria-hidden="true" className="inline-block h-2 w-2 bg-brand" />
                Complete the required order details above to send on WhatsApp.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                size="lg"
                onClick={submit}
                disabled={!needsReview}
                ariaLabel={
                  needsReview
                    ? "Open WhatsApp with your order"
                    : "Order not ready to send yet"
                }
              >
                Send order on WhatsApp
                <ArrowIcon />
              </Button>
              <p className="max-w-xs text-xs leading-relaxed text-muted">
                Payment via EasyPaisa ({business.easypaisa}) is confirmed
                manually after we accept your order. Delivery within{" "}
                {business.deliveryArea}.
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
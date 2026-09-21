"use client";

import { useId } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

export const controlClass =
  "w-full border border-line bg-coal px-4 py-3 text-sm text-mist placeholder:text-muted transition-colors focus:border-brand focus:outline-none";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  hideLabel?: boolean;
  children: ReactNode;
}

function FieldShell({ id, label, hint, error, required, hideLabel, children }: FieldShellProps) {
  return (
    <div>
      <div
        className={cn(
          "mb-2 flex items-baseline justify-between gap-3",
          hideLabel && "sr-only",
        )}
      >
        <label
          htmlFor={id}
          className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-mist"
        >
          {label}
          {required && (
            <span className="text-brand" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-start gap-2 text-xs font-medium text-brand"
        >
          <span aria-hidden="true" className="mt-0.5 inline-block h-2 w-2 bg-brand" />
          {error}
        </p>
      )}
    </div>
  );
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
}

export function TextInput({ label, hint, error, required, hideLabel, id, ...rest }: TextInputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell id={fieldId} label={label} hint={hint} error={error} required={required} hideLabel={hideLabel}>
      <input
        id={fieldId}
        className={cn(controlClass, error && "border-brand")}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        required={required}
        {...rest}
      />
    </FieldShell>
  );
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
  options: Array<{ value: string; label: string }>;
}

export function SelectInput({ label, hint, error, required, hideLabel, id, options, ...rest }: SelectInputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell id={fieldId} label={label} hint={hint} error={error} required={required} hideLabel={hideLabel}>
      <select
        id={fieldId}
        className={cn(controlClass, error && "border-brand")}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        required={required}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
}

export function TextArea({ label, hint, error, required, hideLabel, id, ...rest }: TextAreaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell id={fieldId} label={label} hint={hint} error={error} required={required} hideLabel={hideLabel}>
      <textarea
        id={fieldId}
        className={cn(controlClass, "min-h-28 resize-y", error && "border-brand")}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        required={required}
        {...rest}
      />
    </FieldShell>
  );
}
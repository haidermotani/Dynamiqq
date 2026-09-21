"use client";

import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import type { UploadedLogo } from "@/components/customizer/state";

interface LogoUploadProps {
  logo: UploadedLogo | null;
  onChange: (logo: UploadedLogo | null) => void;
  label: string;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

export function LogoUpload({ logo, onChange, label }: LogoUploadProps) {
  const inputId = useId();
  const [error, setError] = useState<string | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    setError(null);
    if (!file) return;

    if (!ACCEPTED.includes(file.type)) {
      setError("Please upload a PNG, JPG, WebP or SVG image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("File is too large. Keep it under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange({ dataUrl: String(reader.result), fileName: file.name });
    };
    reader.onerror = () => {
      setError("Could not read that file. Try another image.");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <p className="mb-2 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-mist">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-muted">
        Add your team crest or school logo. It only previews here and will be
        sent with your order, nothing is stored.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {logo ? (
          <>
            <div className="flex h-20 w-20 items-center justify-center border border-line bg-graphite p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.dataUrl}
                alt={`Uploaded ${logo.fileName}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <p className="max-w-40 truncate text-xs text-muted">{logo.fileName}</p>
            <button
              type="button"
              onClick={() => {
                setError(null);
                onChange(null);
              }}
              className="border border-line px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:border-brand hover:text-brand"
            >
              Remove
            </button>
            <label
              htmlFor={`${inputId}-replace`}
              className="cursor-pointer border border-brand px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-brand transition-colors hover:bg-brand hover:text-ink"
            >
              Replace
            </label>
            <input
              id={`${inputId}-replace`}
              type="file"
              accept={ACCEPTED.join(",")}
              onChange={handleFile}
              className="sr-only"
            />
          </>
        ) : (
          <label
            htmlFor={inputId}
            className="inline-flex cursor-pointer items-center gap-2 border-2 border-dashed border-line px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:border-brand hover:text-brand"
          >
            Upload logo
          </label>
        )}
      </div>

      {!logo && (
        <input
          id={inputId}
          type="file"
          accept={ACCEPTED.join(",")}
          onChange={handleFile}
          className="sr-only"
        />
      )}

      {error && (
        <p role="alert" className="mt-3 flex items-center gap-2 text-xs font-medium text-brand">
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-brand" />
          {error}
        </p>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";

import { useLocale } from "@/i18n/locale-provider";

type CopyButtonProps = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label }: CopyButtonProps) {
  const { messages } = useLocale();
  const [copied, setCopied] = useState(false);
  const resolvedLabel = label ?? messages.common.copyCommand;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className="copy-button"
      type="button"
      onClick={copy}
      aria-label={copied ? messages.common.copied : resolvedLabel}
    >
      <span aria-hidden="true">{copied ? "✓" : "⌘"}</span>
      <span>
        {copied ? messages.common.copied : messages.common.copy}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? messages.common.copiedAnnouncement : ""}
      </span>
    </button>
  );
}

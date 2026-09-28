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
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{copied ? <path d="m5 12 4 4L19 6" /> : <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h4" /></>}</svg>
      <span>
        {copied ? messages.common.copied : messages.common.copy}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? messages.common.copiedAnnouncement : ""}
      </span>
    </button>
  );
}

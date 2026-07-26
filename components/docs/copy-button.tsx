"use client";

import { useState } from "react";

type CopyButtonProps = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label = "명령 복사" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

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
      aria-label={copied ? "복사됨" : label}
    >
      <span aria-hidden="true">{copied ? "✓" : "⌘"}</span>
      <span>{copied ? "복사됨" : "복사"}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? "클립보드에 복사했습니다." : ""}
      </span>
    </button>
  );
}

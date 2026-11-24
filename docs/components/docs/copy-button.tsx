"use client";

import { useEffect, useRef, useState } from "react";

import { useLocale } from "@/i18n/locale-provider";
import styles from "./copy-button.module.css";

type CopyButtonProps = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label }: CopyButtonProps) {
  const { messages } = useLocale();
  const [result, setResult] = useState<{ text: string; status: "copied" | "failed" } | null>(null);
  const latestCopy = useRef<object | undefined>(undefined);
  const resetTimer = useRef<number | undefined>(undefined);
  const status = result?.text === text ? result.status : "idle";
  const copied = status === "copied";
  const failed = status === "failed";
  const resolvedLabel = label ?? messages.common.copyCommand;

  useEffect(() => () => {
    latestCopy.current = undefined;
    window.clearTimeout(resetTimer.current);
  }, []);

  async function copy() {
    const request = {};
    latestCopy.current = request;
    window.clearTimeout(resetTimer.current);
    let status: "copied" | "failed" = "copied";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      status = "failed";
    }
    if (latestCopy.current !== request) return;
    setResult({ text, status });
    if (status === "copied") {
      resetTimer.current = window.setTimeout(() => setResult(null), 1800);
    }
  }

  return (
    <>
      <button
        className="copy-button"
        type="button"
        onClick={copy}
        aria-label={copied ? messages.common.copied : resolvedLabel}
      >
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{copied ? <path d="m5 12 4 4L19 6" /> : <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h4" /></>}</svg>
        <span>
          {copied ? messages.common.copied : failed ? messages.common.copyFailed : messages.common.copy}
        </span>
        <span className="sr-only" aria-live="polite">
          {copied ? messages.common.copiedAnnouncement : ""}
        </span>
      </button>
      {failed && (
        <div className={styles.error}>
          <p role="alert">{messages.common.manualCopyHint}</p>
          <textarea
            className={styles.manualText}
            aria-label={messages.common.manualCopyLabel}
            readOnly
            value={text}
            onFocus={(event) => event.currentTarget.select()}
          />
        </div>
      )}
    </>
  );
}

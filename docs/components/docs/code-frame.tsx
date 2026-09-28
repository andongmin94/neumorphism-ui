"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { CopyButton } from "./copy-button";
import styles from "./copyable-code.module.css";

export type CodeProps = {
  code: string;
  lang: "bash" | "tsx" | "ts" | "css" | "json" | "text";
  label?: string;
  multiline?: boolean;
};

// Highlighted markup and the original clipboard bytes have separate owners.
export function CodeFrame({ code, lang, label, multiline = false, children }: CodeProps & { children: ReactNode }) {
  const { messages } = useLocale();
  const resolvedLabel = label ?? messages.common.code;
  return (
    <div
      className={`code-shell ${styles.shell}${multiline ? ` ${styles.multiline}` : ""}`}
      role="group"
      aria-label={resolvedLabel}
      data-code-language={lang}
      data-code-theme="dark-plus"
    >
      {children}
      <CopyButton text={code} label={`${messages.common.copy}: ${resolvedLabel}`} />
    </div>
  );
}

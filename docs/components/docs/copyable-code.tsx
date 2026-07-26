"use client";

import { useLocale } from "@/i18n/locale-provider";

import { CopyButton } from "./copy-button";

type CopyableCodeProps = {
  code: string;
  label?: string;
  multiline?: boolean;
};

export function CopyableCode({
  code,
  label,
  multiline = false,
}: CopyableCodeProps) {
  const { messages } = useLocale();
  const resolvedLabel = label ?? messages.common.code;

  return (
    <div className={`code-shell${multiline ? " code-shell-multiline" : ""}`}>
      <span className="sr-only">{resolvedLabel}</span>
      {multiline ? <pre>{code}</pre> : <code>{code}</code>}
      <CopyButton
        text={code}
        label={`${messages.common.copy}: ${resolvedLabel}`}
      />
    </div>
  );
}

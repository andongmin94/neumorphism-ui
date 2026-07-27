"use client";

import { useLocale } from "@/i18n/locale-provider";

import { CopyableCode } from "./copyable-code";
import { CopyButton } from "./copy-button";
import { getInstallCommand } from "./registry-config";

type InstallCommandProps = {
  compact?: boolean;
  name: string;
  label?: string;
};

export function InstallCommand({
  compact = false,
  name,
  label,
}: InstallCommandProps) {
  const { messages } = useLocale();
  const command = getInstallCommand(name);
  const resolvedLabel =
    label ?? `${messages.common.installation}: ${name}`;

  if (compact) {
    return (
      <div className="compact-install">
        <code>{`@neumorphism-ui/${name}`}</code>
        <CopyButton text={command} label={resolvedLabel} />
      </div>
    );
  }

  return <CopyableCode code={command} label={resolvedLabel} />;
}

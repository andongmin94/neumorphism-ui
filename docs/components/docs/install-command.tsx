import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

import { CopyableCode } from "./copyable-code";
import { CopyButton } from "./copy-button";
import { getInstallCommand } from "./registry-config";

type InstallCommandProps = {
  compact?: boolean;
  name: string;
  locale: Locale;
  label?: string;
};

export function InstallCommand({
  compact = false,
  name,
  locale,
  label,
}: InstallCommandProps) {
  const messages = getMessages(locale);
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

  return <CopyableCode lang="bash" code={command} label={resolvedLabel} />;
}

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
  label = `${name} 컴포넌트 설치 명령`,
}: InstallCommandProps) {
  const command = getInstallCommand(name);

  if (compact) {
    return (
      <div className="compact-install">
        <code>{`@neumorphism-ui/${name}`}</code>
        <CopyButton text={command} label={label} />
      </div>
    );
  }

  return <CopyableCode code={command} label={label} />;
}

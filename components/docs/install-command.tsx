import { CopyableCode } from "./copyable-code";
import { getInstallCommand } from "./registry-config";

type InstallCommandProps = {
  name: string;
  label?: string;
};

export function InstallCommand({
  name,
  label = `${name} 컴포넌트 설치 명령`,
}: InstallCommandProps) {
  return <CopyableCode code={getInstallCommand(name)} label={label} />;
}

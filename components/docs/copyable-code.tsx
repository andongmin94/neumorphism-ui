import { CopyButton } from "./copy-button";

type CopyableCodeProps = {
  code: string;
  label?: string;
  multiline?: boolean;
};

export function CopyableCode({
  code,
  label = "코드",
  multiline = false,
}: CopyableCodeProps) {
  return (
    <div className={`code-shell${multiline ? " code-shell-multiline" : ""}`}>
      <span className="sr-only">{label}</span>
      {multiline ? <pre>{code}</pre> : <code>{code}</code>}
      <CopyButton text={code} label={`${label} 복사`} />
    </div>
  );
}

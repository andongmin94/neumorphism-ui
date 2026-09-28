import { highlight } from "fumadocs-core/highlight";
import { CodeFrame, type CodeProps } from "./code-frame";
import { darkPlusOptions } from "./code-highlight";

// Static documentation is highlighted during server/static rendering, not after hydration.
export async function CopyableCode(props: CodeProps) {
  const content = await highlight(props.code, { ...darkPlusOptions, lang: props.lang });
  return <CodeFrame {...props}>{content}</CodeFrame>;
}

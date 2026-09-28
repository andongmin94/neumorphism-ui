"use client";

import { Suspense } from "react";
import { useShiki } from "fumadocs-core/highlight/client";
import { CodeFrame, type CodeProps } from "./code-frame";
import { CodePre, darkPlusOptions } from "./code-highlight";

function HighlightedCode({ code, lang }: Pick<CodeProps, "code" | "lang">) {
  return useShiki(code, { ...darkPlusOptions, lang });
}

// Only fetched registry source and client-edited output need live highlighting.
export function DynamicCode(props: CodeProps) {
  return (
    <CodeFrame {...props}>
      <Suspense key={`${props.lang}:${props.code}`} fallback={<CodePre><code>{props.code}</code></CodePre>}>
        <HighlightedCode code={props.code} lang={props.lang} />
      </Suspense>
    </CodeFrame>
  );
}

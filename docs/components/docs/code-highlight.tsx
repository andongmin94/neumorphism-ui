import type { ComponentProps } from "react";

export function CodePre(props: ComponentProps<"pre">) {
  return <pre {...props} tabIndex={0} />;
}

export const darkPlusOptions = {
  themes: { dark: "dark-plus" as const },
  defaultColor: false as const,
  components: { pre: CodePre },
};

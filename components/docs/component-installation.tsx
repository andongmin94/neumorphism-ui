"use client";

import * as React from "react";

import { CopyableCode } from "@/components/docs/copyable-code";
import { InstallCommand } from "@/components/docs/install-command";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/src/components/ui/tabs";

type RegistryFile = {
  content: string;
  path: string;
  target?: string;
};

type RegistryCssNode = string | { [key: string]: RegistryCssNode };

type RegistryItem = {
  dependencies?: string[];
  css?: { [key: string]: RegistryCssNode };
  cssVars?: {
    dark?: Record<string, string>;
    light?: Record<string, string>;
    theme?: Record<string, string>;
  };
  files?: RegistryFile[];
  name: string;
  registryDependencies?: string[];
  type: string;
};

type ManualBundle = {
  dependencies: RegistryItem[];
  item: RegistryItem;
};

function normalizeManualSource(source: string) {
  return source.replaceAll(
    '"@/registry/src/lib/utils"',
    '"@/lib/utils"',
  );
}

function getDependencySlug(dependency: string) {
  return dependency.split("/").at(-1) ?? dependency;
}

function getManualTarget(file: RegistryFile, itemSlug: string) {
  if (file.target) {
    return file.target
      .replace(/^@\//, "")
      .replace(/^@lib\//, "lib/");
  }

  return itemSlug === "utils"
    ? "lib/utils.ts"
    : `components/ui/${itemSlug}.tsx`;
}

function formatVariables(
  selector: string,
  variables: Record<string, string> | undefined,
) {
  if (!variables) {
    return "";
  }

  const declarations = Object.entries(variables)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join("\n");

  return `${selector} {\n${declarations}\n}`;
}

function serializeCss(
  rules: { [key: string]: RegistryCssNode },
  level = 0,
): string {
  const indentation = "  ".repeat(level);

  return Object.entries(rules)
    .map(([property, value]) => {
      if (typeof value === "string") {
        return `${indentation}${property}: ${value};`;
      }

      if (property.startsWith("@apply ") && Object.keys(value).length === 0) {
        return `${indentation}${property};`;
      }

      return `${indentation}${property} {\n${serializeCss(
        value,
        level + 1,
      )}\n${indentation}}`;
    })
    .join("\n");
}

function formatBaseCss(item: RegistryItem) {
  return [
    formatVariables("@theme inline", item.cssVars?.theme),
    formatVariables(":root", item.cssVars?.light),
    formatVariables(".dark", item.cssVars?.dark),
    item.css ? serializeCss(item.css) : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

async function fetchRegistryItem(name: string, signal: AbortSignal) {
  const response = await fetch(`/r/${encodeURIComponent(name)}.json`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Registry source request failed: ${response.status}`);
  }

  return (await response.json()) as RegistryItem;
}

export function ComponentInstallation({ slug }: { slug: string }) {
  const [bundle, setBundle] = React.useState<ManualBundle | null>(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const controller = new AbortController();

    async function loadSource() {
      try {
        const item = await fetchRegistryItem(slug, controller.signal);
        const dependencyNames = Array.from(
          new Set(
            (item.registryDependencies ?? []).map(getDependencySlug),
          ),
        );
        const dependencies = await Promise.all(
          dependencyNames.map((name) =>
            fetchRegistryItem(name, controller.signal),
          ),
        );

        setBundle({ dependencies, item });
      } catch (sourceError) {
        if (
          sourceError instanceof DOMException &&
          sourceError.name === "AbortError"
        ) {
          return;
        }

        setError(true);
      }
    }

    void loadSource();

    return () => controller.abort();
  }, [slug]);

  return (
    <Tabs className="component-installation" defaultValue="cli">
      <TabsList aria-label="설치 방법">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent className="component-installation-panel" value="cli">
        <InstallCommand name={slug} />
        <p>
          CLI가 npm 의존성, base 토큰, utils와 컴포넌트 소스를 순서대로
          확인하고 설치합니다.
        </p>
      </TabsContent>
      <TabsContent className="component-installation-panel" value="manual">
        {error ? (
          <div className="component-source-status" role="alert">
            소스를 불러오지 못했습니다. 우측 상단 Registry JSON 링크에서 원본을
            확인하세요.
          </div>
        ) : bundle ? (
          <div className="component-manual-install">
            <div className="component-manual-meta">
              <div>
                <span>Save to</span>
                <code>components/ui/{slug}.tsx</code>
              </div>
              <div>
                <span>npm dependencies</span>
                <code>
                  {bundle.item.dependencies?.length
                    ? bundle.item.dependencies.join(", ")
                    : "none"}
                </code>
              </div>
              <div>
                <span>registry dependencies</span>
                <code>
                  {bundle.item.registryDependencies?.length
                    ? bundle.item.registryDependencies.join(", ")
                    : "none"}
                </code>
              </div>
            </div>

            <div className="component-manual-sequence">
              <span aria-hidden="true">i</span>
              <p>
                아래 단계를 순서대로 적용해야 동일하게 동작합니다. 컴포넌트
                파일만 복사하면 utils import와 뉴모피즘 토큰이 빠집니다.
              </p>
            </div>

            <section className="component-manual-step">
              <div className="component-manual-step-heading">
                <span>01</span>
                <div>
                  <h3>npm dependencies</h3>
                  <p>컴포넌트가 직접 사용하는 외부 패키지를 먼저 설치합니다.</p>
                </div>
              </div>
              {bundle.item.dependencies?.length ? (
                <CopyableCode
                  code={`npm install ${bundle.item.dependencies.join(" ")}`}
                  label={`${slug} npm 의존성 설치 명령`}
                />
              ) : (
                <div className="component-source-status">
                  추가 npm 패키지가 필요하지 않습니다.
                </div>
              )}
            </section>

            {bundle.dependencies
              .filter((dependency) => dependency.type === "registry:base")
              .map((dependency) => (
                <section
                  className="component-manual-step"
                  key={dependency.name}
                >
                  <div className="component-manual-step-heading">
                    <span>02</span>
                    <div>
                      <h3>Theme tokens</h3>
                      <p>
                        기존 globals.css에 아래 토큰과 utility layer를 병합합니다.
                      </p>
                    </div>
                  </div>
                  <div className="component-source-file">
                    <div>
                      <span>app/globals.css</span>
                      <small>{dependency.name}.json / cssVars + css</small>
                    </div>
                    <CopyableCode
                      code={formatBaseCss(dependency)}
                      label="뉴모피즘 base CSS"
                      multiline
                    />
                  </div>
                </section>
              ))}

            {bundle.dependencies
              .filter((dependency) => dependency.type !== "registry:base")
              .flatMap((dependency) =>
                (dependency.files ?? []).map((file) => (
                  <section
                    className="component-manual-step"
                    key={`${dependency.name}-${file.path}`}
                  >
                    <div className="component-manual-step-heading">
                      <span>03</span>
                      <div>
                        <h3>{dependency.name}</h3>
                        <p>Registry 컴포넌트가 공유하는 로컬 의존성입니다.</p>
                      </div>
                    </div>
                    <div className="component-source-file">
                      <div>
                        <span>{getManualTarget(file, dependency.name)}</span>
                        <small>{file.path}</small>
                      </div>
                      <CopyableCode
                        code={normalizeManualSource(file.content)}
                        label={`${dependency.name} 전체 소스`}
                        multiline
                      />
                    </div>
                  </section>
                )),
              )}

            {(bundle.item.files ?? []).map((file) => (
              <section className="component-manual-step" key={file.path}>
                <div className="component-manual-step-heading">
                  <span>04</span>
                  <div>
                    <h3>{slug}</h3>
                    <p>마지막으로 컴포넌트 소스를 UI 디렉터리에 저장합니다.</p>
                  </div>
                </div>
                <div className="component-source-file">
                  <div>
                    <span>{getManualTarget(file, slug)}</span>
                    <small>{file.path}</small>
                  </div>
                  <CopyableCode
                    code={normalizeManualSource(file.content)}
                    label={`${slug} 전체 소스`}
                    multiline
                  />
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="component-source-status" aria-live="polite">
            Registry에서 현재 소스를 불러오는 중입니다…
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

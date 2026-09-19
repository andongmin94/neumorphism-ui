"use client";

import * as React from "react";

import { CopyableCode } from "@/components/docs/copyable-code";
import { InstallCommand } from "@/components/docs/install-command";
import { useLocale } from "@/i18n/locale-provider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neumorphism-ui/registry/ui/tabs";

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

      if ((property.startsWith("@apply ") || property.startsWith("@import ")) && Object.keys(value).length === 0) {
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
  const { messages } = useLocale();
  const [source, setSource] = React.useState<{ slug: string; bundle: ManualBundle | null; error: boolean } | null>(null);
  const bundle = source?.slug === slug ? source.bundle : null;
  const error = source?.slug === slug && source.error;

  React.useEffect(() => {
    const controller = new AbortController();

    async function loadSource() {
      try {
        const item = await fetchRegistryItem(slug, controller.signal);
        const dependencies: RegistryItem[] = [];
        const visited = new Set([slug]);
        async function visit(name: string) {
          if (visited.has(name)) return;
          visited.add(name);
          const dependency = await fetchRegistryItem(name, controller.signal);
          for (const child of dependency.registryDependencies ?? []) await visit(getDependencySlug(child));
          dependencies.push(dependency);
        }
        await visit("neumorphism-ui");
        for (const dependency of item.registryDependencies ?? []) await visit(getDependencySlug(dependency));

        if (!controller.signal.aborted) setSource({ slug, bundle: { dependencies, item }, error: false });
      } catch (sourceError) {
        if (
          sourceError instanceof DOMException &&
          sourceError.name === "AbortError"
        ) {
          return;
        }

        if (!controller.signal.aborted) setSource({ slug, bundle: null, error: true });
      }
    }

    void loadSource();

    return () => controller.abort();
  }, [slug]);

  const packages = Array.from(new Set([...(bundle?.dependencies ?? []), ...(bundle ? [bundle.item] : [])].flatMap(item => item.dependencies ?? [])));

  return (
    <Tabs className="component-installation" defaultValue="cli">
      <TabsList aria-label={messages.installationPanel.methodsLabel}>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">
          {messages.installationPanel.componentSource}
        </TabsTrigger>
      </TabsList>
      <TabsContent className="component-installation-panel" value="cli">
        <InstallCommand name={slug} />
        <p>{messages.installationPanel.cli}</p>
      </TabsContent>
      <TabsContent className="component-installation-panel" value="manual">
        {error ? (
          <div className="component-source-status" role="alert">
            {messages.installationPanel.loadError}
          </div>
        ) : bundle ? (
          <div className="component-manual-install">
            <div className="component-manual-meta">
              <div>
                <span>{messages.installationPanel.componentSource}</span>
                <code>components/ui/{slug}.tsx</code>
              </div>
              <div>
                <span>{messages.installationPanel.packages}</span>
                <code>
                  {packages.length
                    ? packages.join(", ")
                    : "—"}
                </code>
              </div>
              <div>
                <span>{messages.installationPanel.localDependencies}</span>
                <code>
                  {bundle.item.registryDependencies?.length
                    ? bundle.item.registryDependencies.join(", ")
                    : "—"}
                </code>
              </div>
            </div>

            <div className="component-manual-sequence">
              <span aria-hidden="true">i</span>
              <p>{messages.installationPanel.manualIntro}</p>
            </div>

            <section className="component-manual-step">
              <div className="component-manual-step-heading">
                <span>01</span>
                <div>
                  <h3>{messages.installationPanel.packages}</h3>
                  <p>{messages.installationPanel.packagesBody}</p>
                </div>
              </div>
              {packages.length ? (
                <CopyableCode
                  code={`npm install ${packages.join(" ")}`}
                  label={`${slug} ${messages.installationPanel.packages}`}
                />
              ) : (
                <div className="component-source-status">
                  {messages.installationPanel.noPackages}
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
                      <h3>{messages.installationPanel.baseTokens}</h3>
                      <p>{messages.installationPanel.baseTokensBody}</p>
                    </div>
                  </div>
                  <div className="component-source-file">
                    <div>
                      <span>app/globals.css</span>
                      <small>{dependency.name}.json / cssVars + css</small>
                    </div>
                    <CopyableCode
                      code={formatBaseCss(dependency)}
                      label={messages.installationPanel.baseTokens}
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
                        <p>
                          {messages.installationPanel.localDependenciesBody}
                        </p>
                      </div>
                    </div>
                    <div className="component-source-file">
                      <div>
                        <span>{getManualTarget(file, dependency.name)}</span>
                        <small>{file.path}</small>
                      </div>
                      <CopyableCode
                        code={file.content}
                        label={`${dependency.name} ${messages.installationPanel.localDependencies}`}
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
                    <p>{messages.installationPanel.componentSourceBody}</p>
                  </div>
                </div>
                <div className="component-source-file">
                  <div>
                    <span>{getManualTarget(file, slug)}</span>
                    <small>{file.path}</small>
                  </div>
                  <CopyableCode
                    code={file.content}
                    label={`${slug} ${messages.installationPanel.componentSource}`}
                    multiline
                  />
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="component-source-status" aria-live="polite">
            {messages.installationPanel.loading}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

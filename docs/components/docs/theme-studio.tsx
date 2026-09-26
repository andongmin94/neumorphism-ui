"use client";

import * as React from "react";
import { ThemePreview } from "./theme-preview";

import { CopyableCode } from "@/components/docs/copyable-code";
import { getInstallCommand } from "@/components/docs/registry-config";
import { useLocale } from "@/i18n/locale-provider";
import {
  applyThemeSettings,
  buildThemeVariables,
  buildThemeCss,
  clearThemeSettings,
  defaultThemeSettings,
  getThemePreset,
  parseThemeSettings,
  type ThemeControlShape,
  type ThemeDepth,
  type ThemeLightDirection,
  type ThemeMotion,
  type ThemeSettings,
  themePresets,
  THEME_STORAGE_KEY,
} from "@/components/docs/theme-config";







import { Tabs, TabsContent, TabsList, TabsTrigger } from "@neumorphism-ui/registry/ui/tabs";

type PreviewMode = "light" | "dark";

function ControlGroup({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <fieldset className="theme-control-group">
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}

export function ThemeStudio() {
  const { messages, locale } = useLocale();
  const copy = messages.themeStudio;
  const depthOptions: {
    id: ThemeDepth;
    label: string;
    summary: string;
  }[] = [
    {
      id: "subtle",
      label: copy.depthSubtle,
      summary: copy.depthSubtleSummary,
    },
    {
      id: "balanced",
      label: copy.depthBalanced,
      summary: copy.depthBalancedSummary,
    },
    {
      id: "deep",
      label: copy.depthDeep,
      summary: copy.depthDeepSummary,
    },
  ];
  const shapeOptions: { id: ThemeControlShape; label: string }[] = [
    { id: "rounded", label: copy.rounded },
    { id: "soft", label: copy.soft },
    { id: "pill", label: copy.pill },
  ];
  const directionOptions: {
    id: ThemeLightDirection;
    label: string;
    arrow: string;
  }[] = [
    { id: "top-left", label: copy.topLeft, arrow: "↘" },
    { id: "top-right", label: copy.topRight, arrow: "↙" },
    { id: "bottom-left", label: copy.bottomLeft, arrow: "↗" },
    { id: "bottom-right", label: copy.bottomRight, arrow: "↖" },
  ];
  const [settings, setSettings] =
    React.useState<ThemeSettings>(defaultThemeSettings);
  const [ready, setReady] = React.useState(false);
  const [previewMode, setPreviewMode] = React.useState<PreviewMode>("light");
  const preset = getThemePreset(settings.presetId);
  const accent = settings.accent ?? preset[previewMode].primary;
  const generatedCss = React.useMemo(
    () => buildThemeCss(settings),
    [settings],
  );
  const previewStyle = React.useMemo(
    () =>
      ({
        ...buildThemeVariables(settings, previewMode),
        colorScheme: previewMode,
      }) as React.CSSProperties,
    [previewMode, settings],
  );

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = parseThemeSettings(localStorage.getItem(THEME_STORAGE_KEY));
      setSettings(stored ?? defaultThemeSettings);
      setReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    applyThemeSettings(settings);
  }, [ready, settings]);

  function updateSettings(patch: Partial<ThemeSettings>) {
    const nextSettings = { ...settings, ...patch };
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(nextSettings));
    setSettings(nextSettings);
  }

  function resetTheme() {
    localStorage.removeItem(THEME_STORAGE_KEY);
    clearThemeSettings();
    applyThemeSettings(defaultThemeSettings);
    setSettings(defaultThemeSettings);
  }

  function setThemeMode(mode: PreviewMode) {
    setPreviewMode(mode);
  }

  return (
    <div className="theme-studio">
      <aside
        className="theme-studio-controls"
        aria-label={copy.settings}
        aria-busy={!ready}
        id="theme-settings"
        inert={!ready}
      >
        <div className="theme-studio-panel-heading">
          <div>
            <h2>{copy.settings}</h2>
            <span>
              {preset.name} ·{" "}
              {
                depthOptions.find((option) => option.id === settings.depth)
                  ?.summary
              }
            </span>
          </div>
          <button onClick={resetTheme} type="button">
            {copy.reset}
          </button>
        </div>

        <ControlGroup label={copy.preset}>
          <div className="theme-preset-grid">
            {themePresets.map((item) => (
              <button
                aria-pressed={settings.presetId === item.id}
                className={settings.presetId === item.id ? "is-active" : undefined}
                key={item.id}
                onClick={() =>
                  updateSettings({
                    presetId: item.id,
                    accent: null,
                    ...item.defaults,
                  })
                }
                type="button"
              >
                <span
                  className="theme-preset-swatch"
                  style={{
                    background: item[previewMode].surface,
                  }}
                />
                <span
                  className="theme-preset-accent"
                  style={{ background: item[previewMode].primary }}
                />
                <strong>{item.name}</strong>
                {settings.presetId === item.id ? (
                  <span className="theme-preset-check" aria-hidden="true">✓</span>
                ) : null}
              </button>
            ))}
          </div>
        </ControlGroup>

        <ControlGroup label={copy.accent}>
          <div className="theme-accent-control">
            <label>
              <span className="sr-only">{copy.accent}</span>
              <input
                aria-label={copy.accent}
                onChange={(event) =>
                  updateSettings({ accent: event.target.value })
                }
                type="color"
                value={accent}
              />
              <code>{accent.toUpperCase()}</code>
            </label>
            {settings.accent ? (
              <button
                onClick={() => updateSettings({ accent: null })}
                type="button"
              >
                {copy.defaultValue}
              </button>
            ) : null}
          </div>
        </ControlGroup>

        <ControlGroup label={copy.depth}>
          <div className="theme-segmented theme-segmented-stacked">
            {depthOptions.map((option) => (
              <button
                aria-pressed={settings.depth === option.id}
                className={settings.depth === option.id ? "is-active" : undefined}
                key={option.id}
                onClick={() => updateSettings({ depth: option.id })}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </ControlGroup>

        <ControlGroup label={copy.light}>
          <div className="theme-direction-grid">
            {directionOptions.map((option) => (
              <button
                aria-label={option.label}
                aria-pressed={settings.lightDirection === option.id}
                className={
                  settings.lightDirection === option.id ? "is-active" : undefined
                }
                key={option.id}
                onClick={() =>
                  updateSettings({ lightDirection: option.id })
                }
                title={option.label}
                type="button"
              >
                {option.arrow}
              </button>
            ))}
          </div>
        </ControlGroup>

        <ControlGroup label={copy.radius}>
          <div className="theme-radius-control">
            <input
              aria-label={copy.radius}
              max="32"
              min="8"
              onChange={(event) =>
                updateSettings({ surfaceRadius: Number(event.target.value) })
              }
              step="2"
              type="range"
              value={settings.surfaceRadius}
            />
            <output>{settings.surfaceRadius}px</output>
          </div>
        </ControlGroup>

        <ControlGroup label={copy.controlShape}>
          <div className="theme-segmented">
            {shapeOptions.map((option) => (
              <button
                aria-pressed={settings.controlShape === option.id}
                className={
                  settings.controlShape === option.id ? "is-active" : undefined
                }
                key={option.id}
                onClick={() => updateSettings({ controlShape: option.id })}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </ControlGroup>

        <ControlGroup label={copy.motion}>
          <div className="theme-segmented">
            {([120, 180, 260] as ThemeMotion[]).map((motion) => (
              <button
                aria-pressed={settings.motion === motion}
                className={settings.motion === motion ? "is-active" : undefined}
                key={motion}
                onClick={() => updateSettings({ motion })}
                type="button"
              >
                {motion}ms
              </button>
            ))}
          </div>
        </ControlGroup>
      </aside>

      <div className="theme-studio-workbench" id="theme-preview">
        <div className="theme-preview-toolbar">
          <div>
            <strong>{copy.preview}</strong>
            <small>{copy.previewCaption}</small>
          </div>
          <div
            className="theme-preview-mode"
            aria-label={copy.previewTheme}
          >
            <button
              aria-pressed={previewMode === "light"}
              className={previewMode === "light" ? "is-active" : undefined}
              onClick={() => setThemeMode("light")}
              type="button"
            >
              Light
            </button>
            <button
              aria-pressed={previewMode === "dark"}
              className={previewMode === "dark" ? "is-active" : undefined}
              onClick={() => setThemeMode("dark")}
              type="button"
            >
              Dark
            </button>
          </div>
          <span>{preset.name} · {depthOptions.find((option) => option.id === settings.depth)?.label}</span>
        </div>

        <ThemePreview copy={copy} locale={locale} previewMode={previewMode} style={previewStyle} />

        <Tabs className="theme-output" defaultValue="css" id="theme-output">
          <div className="theme-output-heading">
            <h2>{copy.output}</h2>
            <TabsList aria-label={copy.outputFormat}>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="registry">CLI</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="css">
            <p>{copy.cssBody}</p>
            <div className="theme-output-code">
              <CopyableCode
                code={generatedCss}
                label={copy.cssLabel}
                multiline
              />
            </div>
          </TabsContent>
          <TabsContent value="registry">
            <p>{copy.cliBody}</p>
            <div className="theme-registry-commands">
              <div>
                <span>{copy.dryRun}</span>
                <CopyableCode
                  code={`${getInstallCommand(preset.registryName)} --dry-run`}
                  label={`${preset.name} · ${copy.dryRun}`}
                />
              </div>
              <div>
                <span>{copy.install}</span>
                <CopyableCode
                  code={getInstallCommand(preset.registryName)}
                  label={`${preset.name} · ${copy.install}`}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { ThemePreview } from "./theme-preview";

import { DynamicCode } from "@/components/docs/dynamic-code";
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

import { ToggleGroup, ToggleGroupItem } from "@neumorphism-ui/registry/ui/toggle-group";
import styles from "./theme-studio.module.css";

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
    path: string;
  }[] = [
    { id: "top-left", label: copy.topLeft, path: "M6 6 18 18M8 18h10V8" },
    { id: "top-right", label: copy.topRight, path: "M18 6 6 18M6 8v10h10" },
    { id: "bottom-left", label: copy.bottomLeft, path: "M6 18 18 6M8 6h10v10" },
    { id: "bottom-right", label: copy.bottomRight, path: "M18 18 6 6M6 16V6h10" },
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
                  <span className="theme-preset-check" aria-hidden="true"><svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg></span>
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
          <ToggleGroup className={styles.choices} aria-label={copy.depth} data-theme-choice="depth"
            value={[String(settings.depth)]} onValueChange={(value) => { if (value[0]) updateSettings({ depth: value[0] as ThemeDepth }); }}>
            {depthOptions.map((option) => (
              <ToggleGroupItem key={option.id} value={option.id}>{option.label}</ToggleGroupItem>
            ))}
          </ToggleGroup>
        </ControlGroup>

        <ControlGroup label={copy.light}>
          <ToggleGroup className={`theme-direction-grid ${styles.directions}`} aria-label={copy.light}
            value={[settings.lightDirection]} onValueChange={(value) => {
              if (value[0]) updateSettings({ lightDirection: value[0] as ThemeLightDirection });
            }}>
            {directionOptions.map((option) => (
              <ToggleGroupItem key={option.id} value={option.id} aria-label={option.label} title={option.label}>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={option.path} /></svg>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
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
          <ToggleGroup className={styles.choices} aria-label={copy.controlShape} data-theme-choice="controlShape"
            value={[String(settings.controlShape)]} onValueChange={(value) => { if (value[0]) updateSettings({ controlShape: value[0] as ThemeControlShape }); }}>
            {shapeOptions.map((option) => (
              <ToggleGroupItem key={option.id} value={option.id}>{option.label}</ToggleGroupItem>
            ))}
          </ToggleGroup>
        </ControlGroup>

        <ControlGroup label={copy.motion}>
          <ToggleGroup className={styles.choices} aria-label={copy.motion} data-theme-choice="motion"
            value={[String(settings.motion)]} onValueChange={(value) => { if (value[0]) updateSettings({ motion: Number(value[0]) as ThemeMotion }); }}>
            {([120, 180, 260] as ThemeMotion[]).map((motion) => (
              <ToggleGroupItem key={motion} value={String(motion)}>{motion}ms</ToggleGroupItem>
            ))}
          </ToggleGroup>
        </ControlGroup>
      </aside>

      <div className="theme-studio-workbench" id="theme-preview">
        <div className="theme-preview-toolbar">
          <div className="theme-preview-title">
            <strong>{copy.preview}</strong>
            <small>{copy.previewCaption}</small>
          </div>
          <ToggleGroup className="theme-preview-mode" aria-label={copy.previewTheme}
            value={[previewMode]} onValueChange={(value) => {
              if (value[0]) setThemeMode(value[0] as PreviewMode);
            }}>
            <ToggleGroupItem value="light">Light</ToggleGroupItem>
            <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
          </ToggleGroup>
          <span>{preset.name} · {depthOptions.find((option) => option.id === settings.depth)?.label}</span>
        </div>

        <ThemePreview copy={copy} locale={locale} previewMode={previewMode} style={previewStyle} />

        <Tabs className="theme-output" defaultValue="css" id="theme-output">
          <div className={`theme-output-heading ${styles.outputHeading}`}>
            <h2>{copy.output}</h2>
            <TabsList aria-label={copy.outputFormat}>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="registry">CLI</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="css">
            <p>{copy.cssBody}</p>
            <div className="theme-output-code">
              <DynamicCode lang="css"
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
                <DynamicCode lang="bash"
                  code={`${getInstallCommand(preset.registryName)} --dry-run`}
                  label={`${preset.name} · ${copy.dryRun}`}
                />
              </div>
              <div>
                <span>{copy.install}</span>
                <DynamicCode lang="bash"
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

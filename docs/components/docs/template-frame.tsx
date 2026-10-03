import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import styles from "./template-frame.module.css";

const copy = {
  en: { preview: "Template preview", install: "Install", source: "Source" },
  ko: { preview: "템플릿 미리보기", install: "설치", source: "소스" },
  ja: { preview: "テンプレートのプレビュー", install: "インストール", source: "ソース" },
  zh: { preview: "模板预览", install: "安装", source: "源码" },
} as const;

// Documentation framing only. The installed workspace keeps its own layout/state.
export function TemplateFrame({ locale, name, children }: {
  locale: Locale;
  name: string;
  children: ReactNode;
}) {
  const t = copy[locale];
  return (
    <section className={styles.frame} data-template-frame aria-labelledby="template-preview-heading">
      <header className={styles.toolbar} data-template-toolbar>
        <div className={styles.identity}>
          <h2 id="template-preview-heading">{t.preview}</h2>
          <code>{name}</code>
        </div>
        <nav className={styles.links} aria-label={t.preview}>
          <a href="#installation">{t.install}</a>
          <a href="#installed-source">{t.source}</a>
        </nav>
      </header>
      <div className={styles.canvas} data-template-canvas>{children}</div>
    </section>
  );
}

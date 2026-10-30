import { notFound } from "fumapress/router";
import { DocsToc } from "@/components/docs/docs-toc";
import { PageMetadata } from "@/components/docs/page-metadata";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { referenceDocCopy } from "@/i18n/reference-doc-copy";

const dependencies = ["@base-ui/react", "shadcn", "Fumapress / Fumadocs", "Recharts", "@tanstack/react-table", "@daypicker/react", "cmdk", "input-otp", "embla-carousel-react", "react-resizable-panels", "Pretendard", "Pretendard JP", "Noto Sans SC / Fontsource"];

export default function CreditsPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const t = referenceDocCopy[lang].credits;
  const toc = Object.entries(t.sections).map(([id, label]) => ({ href: `#${id}`, label }));

  return (
    <div className="docs-content-layout docs-reference-layout">
      <article className="docs-content docs-article docs-reference-article">
        <PageMetadata locale={lang} title={t.title} description={t.intro} />
        <header className="docs-page-header">
          <h1>{t.title}</h1><p>{t.intro}</p>
          <nav className="component-doc-quicknav" aria-label={getMessages(lang).common.pageToc}>
            {toc.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
          </nav>
        </header>
        <section className="docs-content-section" id="packages">
          <h2>{t.sections.packages}</h2>
          <table>
            <thead><tr><th>{t.package}</th><th>{t.role}</th></tr></thead>
            <tbody>{dependencies.map((name, index) => <tr key={name}><th scope="row"><code>{name}</code></th><td>{t.roles[index]}</td></tr>)}</tbody>
          </table>
        </section>
        <section className="docs-content-section" id="licenses">
          <h2>{t.sections.licenses}</h2><p>{t.note}</p>
          <ul>
            <li><a href="https://github.com/andongmin94/neumorphism-ui/blob/main/LICENSE">Neumorphism UI (MIT)</a></li>
            <li><a href="/third-party-licenses.md">{t.thirdPartyLicenses}</a></li>
            <li><a href="/shadcn-LICENSE.txt">shadcn/ui (MIT)</a></li>
            <li><a href="/embla-LICENSE.txt">Embla Carousel (MIT)</a></li>
            <li><a href="/vite-plugin-rsc-LICENSE.txt">@vitejs/plugin-rsc (MIT)</a></li>
            <li><a href="/victory-vendor-LICENSE.txt">victory-vendor</a></li>
            <li><a href="/octicons-LICENSE.txt">GitHub Octicons (MIT)</a></li>
            <li><a href="/pretendard-font-LICENSE.txt">Pretendard (OFL-1.1)</a></li>
            <li><a href="/pretendard-jp-font-LICENSE.txt">Pretendard JP (OFL-1.1)</a></li>
            <li><a href="/noto-sans-sc-font-LICENSE.txt">Noto Sans SC (OFL-1.1)</a></li>
          </ul>
        </section>
      </article>
      <DocsToc items={toc} />
    </div>
  );
}

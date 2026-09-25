import { notFound } from "fumapress/router";

import { isLocale } from "@/i18n/config";

const copy = {
  ko: { title: "Credits & dependencies", intro: "Neumorphism UI가 의존하는 주요 오픈소스 패키지와 각 역할을 정리합니다.", note: "각 패키지는 자체 라이선스와 저작권 조건을 유지합니다. 이 페이지는 attribution 안내이며 프로젝트 자체 LICENSE를 대신하지 않습니다." },
  en: { title: "Credits & dependencies", intro: "The major open-source packages used by Neumorphism UI and the responsibility each one retains.", note: "Each package retains its own license and copyright terms. This page documents dependencies; it does not substitute for the project's own LICENSE." },
  ja: { title: "Credits & dependencies", intro: "Neumorphism UI が利用する主要オープンソースパッケージと各役割です。", note: "各パッケージにはそれぞれのライセンスと著作権条件があります。このページは依存関係の説明であり、プロジェクト自身の LICENSE の代わりではありません。" },
  zh: { title: "Credits & dependencies", intro: "Neumorphism UI 使用的主要开源包以及各自负责的范围。", note: "每个包保留自己的许可证和版权条款。本页用于说明依赖关系，不能替代项目自身的 LICENSE。" },
} as const;

const dependencies = [
  ["@base-ui/react", "Accessible interaction primitives and state machines"],
  ["shadcn", "Registry schema, CLI installation and source distribution workflow"],
  ["Fumapress / Fumadocs", "Documentation routing, layouts and internationalization infrastructure"],
  ["Recharts", "Chart rendering"],
  ["@tanstack/react-table", "Caller-owned table state model"],
  ["@daypicker/react", "Calendar and date selection"],
  ["cmdk", "Command palette filtering and keyboard navigation"],
  ["input-otp", "One-time-code input behavior"],
  ["embla-carousel-react", "Carousel scrolling and drag state"],
  ["react-resizable-panels", "Resizable panel sizing and separator semantics"],
  ["Pretendard", "Bundled UI font dependency"],
] as const;

export default function CreditsPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const t = copy[lang];

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-8 pb-16 sm:px-8 sm:pt-12">
      <article className="docs-content docs-article">
        <header className="docs-page-header"><h1>{t.title}</h1><p>{t.intro}</p></header>
        <section className="docs-content-section">
          <table>
            <thead><tr><th>Package</th><th>Role</th></tr></thead>
            <tbody>{dependencies.map(([name, role]) => <tr key={name}><th scope="row"><code>{name}</code></th><td>{role}</td></tr>)}</tbody>
          </table>
          <p className="docs-section-note">{t.note}</p>
        </section>
      </article>
    </div>
  );
}

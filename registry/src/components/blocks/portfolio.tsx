import * as React from "react";

import { cn } from "@/lib/utils";

export type PortfolioLocale = "ko" | "en" | "ja" | "zh";

export type PortfolioProfile = {
  name: string;
  role: string;
  location?: string;
  intro: readonly string[];
  email?: string;
  github?: string;
  linkedin?: string;
};

export type PortfolioProject = {
  title: string;
  type: string;
  year: string;
  summary: string;
  challenge: string;
  approach: string;
  deliverables: string;
  outcome: string;
};

export interface PortfolioProps {
  profile: PortfolioProfile;
  projects: readonly PortfolioProject[];
  locale?: PortfolioLocale;
  className?: string;
}

const copy = {
  ko: {
    practice: "독립 작업",
    work: "선정 작업",
    challenge: "문제",
    approach: "접근",
    delivered: "제공한 결과",
    outcome: "성과",
    contact: "연락",
    email: "이메일",
    back: "맨 위로",
    newTab: "새 탭에서 열림",
    cta: "복잡한 흐름을 더 단순하게 만들고 싶나요?",
    ctaBody: "누가 사용하고 무엇이 불편한지, 첫 번째 유용한 릴리스가 무엇을 해야 하는지 알려주세요.",
  },
  en: {
    practice: "Independent practice",
    work: "Selected work",
    challenge: "The challenge",
    approach: "The approach",
    delivered: "Delivered",
    outcome: "The outcome",
    contact: "Contact",
    email: "Email",
    back: "Back to top",
    newTab: "Opens in a new tab",
    cta: "Have a complex workflow to simplify?",
    ctaBody: "Share who uses it, where the friction is, and what a useful first release should accomplish.",
  },
  ja: {
    practice: "独立した仕事",
    work: "主な実績",
    challenge: "課題",
    approach: "アプローチ",
    delivered: "提供したもの",
    outcome: "成果",
    contact: "連絡先",
    email: "メール",
    back: "先頭へ",
    newTab: "新しいタブで開きます",
    cta: "複雑なワークフローをシンプルにしませんか？",
    ctaBody: "誰が使い、どこに摩擦があり、最初の有用なリリースが何をすべきか教えてください。",
  },
  zh: {
    practice: "独立实践",
    work: "精选项目",
    challenge: "问题",
    approach: "方法",
    delivered: "交付内容",
    outcome: "成果",
    contact: "联系",
    email: "邮箱",
    back: "返回顶部",
    newTab: "在新标签页打开",
    cta: "想简化一个复杂流程吗？",
    ctaBody: "告诉我谁在使用、当前阻力在哪里，以及第一个有价值的版本应该完成什么。",
  },
} as const;

export function Portfolio({
  profile,
  projects,
  locale = "en",
  className,
}: PortfolioProps) {
  const t = copy[locale];

  return (
    <div
      id="portfolio-top"
      data-slot="portfolio"
      className={cn("mx-auto w-full max-w-4xl text-[var(--foreground)]", className)}
    >
      <header className="flex items-center justify-between gap-4 border-b border-[var(--border)] py-4">
        <a href="#portfolio-top" className="rounded-md text-sm font-semibold no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
          {profile.name}
        </a>
        <nav aria-label={t.contact} className="flex items-center gap-4 text-sm">
          <a href="#portfolio-work" className="hover:underline">{t.work}</a>
          <a href="#portfolio-contact" className="hover:underline">{t.contact}</a>
        </nav>
      </header>

      <main className="grid gap-10 py-8 sm:py-10">
        <section aria-labelledby="portfolio-title" className="grid gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
            {t.practice}{profile.location ? " / " + profile.location : ""}
          </p>
          <h2 id="portfolio-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h2>
          <p className="text-lg font-semibold sm:text-xl">{profile.role}</p>
          <div className="grid max-w-2xl gap-2 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
            {profile.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section id="portfolio-work" aria-labelledby="portfolio-work-title" className="scroll-mt-8">
          <h3 id="portfolio-work-title" className="text-xl font-semibold">{t.work}</h3>
          <div className="mt-4 grid gap-4">
            {projects.map((project) => (
              <details
                key={project.title + ":" + project.year}
                className="group overflow-hidden rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-raised-sm)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">
                    <span className="block font-semibold">{project.title}</span>
                    <span className="mt-1 block text-sm text-[var(--muted-foreground)]">{project.type}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-sm text-[var(--muted-foreground)]">
                    {project.year}
                    <span aria-hidden="true" className="transition-transform group-open:rotate-180 motion-reduce:transition-none">⌄</span>
                  </span>
                </summary>
                <div className="border-t border-[var(--border)]">
                  <p className="px-5 py-4 text-sm leading-relaxed text-[var(--muted-foreground)]">{project.summary}</p>
                  <dl className="grid gap-4 bg-[var(--neu-surface-soft)] p-5 sm:grid-cols-2">
                    {[
                      [t.challenge, project.challenge],
                      [t.approach, project.approach],
                      [t.delivered, project.deliverables],
                      [t.outcome, project.outcome],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-xs font-semibold uppercase tracking-[0.12em]">{label}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="grid gap-2">
          <h3 className="text-xl font-semibold">{t.cta}</h3>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)]">{t.ctaBody}</p>
        </section>

        <section id="portfolio-contact" aria-label={t.contact} className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--border)] pt-5 text-sm">
          {profile.email ? (
            <a href={"mailto:" + profile.email} className="rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-2 font-semibold no-underline [box-shadow:var(--neu-shadow-raised-sm)] outline-none hover:[box-shadow:var(--neu-shadow-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] active:[box-shadow:var(--neu-shadow-inset)]">{t.email}</a>
          ) : null}
          {profile.github ? (
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:underline">
              GitHub <span aria-hidden="true">↗</span><span className="sr-only">{t.newTab}</span>
            </a>
          ) : null}
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
              LinkedIn <span aria-hidden="true">↗</span><span className="sr-only">{t.newTab}</span>
            </a>
          ) : null}
        </section>
      </main>

      <footer className="flex items-center justify-between gap-4 border-t border-[var(--border)] py-4 text-xs text-[var(--muted-foreground)]">
        <p>© 2026 {profile.name}</p>
        <a href="#portfolio-top" className="hover:underline">{t.back}</a>
      </footer>
    </div>
  );
}

const exampleProjects: PortfolioProject[] = [
  {
    title: "Wayline",
    type: "Product design and front-end",
    year: "2026",
    summary: "A dispatch planning workspace that turns route changes into clear next actions.",
    challenge: "Dispatchers needed to distinguish urgent route changes from routine updates.",
    approach: "Mapped planning and dispatch handoffs, then prototyped one shared queue.",
    deliverables: "Workflow map, interaction prototype, accessible React workspace.",
    outcome: "One view of ownership, exceptions and the next action for each route.",
  },
  {
    title: "Ledgerline",
    type: "Product design",
    year: "2025",
    summary: "A calm reporting system for finance teams reviewing a busy monthly close.",
    challenge: "Reporting assumptions were scattered across tables, slides and messages.",
    approach: "Designed a common review structure with comparable periods and visible definitions.",
    deliverables: "Reporting model, chart language, reusable review components.",
    outcome: "Reviewers can trace each summary back to its source and unresolved questions.",
  },
  {
    title: "Open Index",
    type: "Web design and development",
    year: "2025",
    summary: "An accessible directory for shared tools, datasets and practical guides.",
    challenge: "A growing collection of public resources was difficult to browse and maintain.",
    approach: "Organized resources around user tasks and tested search, filters and empty states.",
    deliverables: "Information architecture, responsive directory, keyboard interaction checks.",
    outcome: "A searchable directory with clear categories and maintainable contribution rules.",
  },
];

export function PortfolioExample({ locale = "en" }: { locale?: PortfolioLocale }) {
  return (
    <Portfolio
      locale={locale}
      profile={{
        name: "Sora Han",
        role: "Product designer and front-end developer.",
        location: "Seoul",
        intro: [
          "I design focused digital products for people doing complex work.",
          "I work from early product thinking through accessible front-end delivery.",
        ],
        email: "hello@example.com",
        github: "https://github.com",
        linkedin: "https://www.linkedin.com",
      }}
      projects={exampleProjects}
    />
  );
}

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
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] py-4">
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
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring)] [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 break-words">
                    <span className="block font-semibold">{project.title}</span>
                    <span className="mt-1 block text-sm text-[var(--muted-foreground)]">{project.type}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-sm text-[var(--muted-foreground)]">
                    {project.year}
                    <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M5 12h14" />
                      <path d="M12 5v14" className="origin-center transition-transform group-open:scale-y-0 motion-reduce:transition-none" />
                    </svg>
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

        <section id="portfolio-contact" aria-labelledby="portfolio-contact-title" className="grid gap-4 border-t border-[var(--border)] pt-5 text-sm">
          <h3 id="portfolio-contact-title" className="text-xl font-semibold">{t.contact}</h3>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {profile.email ? (
            <a href={"mailto:" + profile.email} className="rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-2 font-semibold no-underline [box-shadow:var(--neu-shadow-raised-sm)] outline-none hover:[box-shadow:var(--neu-shadow-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] active:[box-shadow:var(--neu-shadow-inset)]">{t.email}</a>
          ) : null}
          {profile.github ? (
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:underline">
              GitHub <svg aria-hidden="true" className="inline-block size-4 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M8 6h10v10" /></svg><span className="sr-only">{t.newTab}</span>
            </a>
          ) : null}
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
              LinkedIn <svg aria-hidden="true" className="inline-block size-4 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M8 6h10v10" /></svg><span className="sr-only">{t.newTab}</span>
            </a>
          ) : null}
          </div>
        </section>
      </main>

      <footer className="flex items-center justify-between gap-4 border-t border-[var(--border)] py-4 text-xs text-[var(--muted-foreground)]">
        <p>© 2026 {profile.name}</p>
        <a href="#portfolio-top" className="hover:underline">{t.back}</a>
      </footer>
    </div>
  );
}

const exampleContent = {
  "en": {
    "profile": {
      "name": "Sora Han",
      "role": "Product designer and front-end developer.",
      "location": "Seoul",
      "intro": [
        "I design scheduling, reporting and inventory tools.",
        "My work covers the screen layout, interaction prototype and React implementation."
      ],
      "email": "hello@example.com"
    },
    "projects": [
      {
        "title": "Dispatch queue",
        "type": "Product design · React",
        "year": "2026",
        "summary": "A queue for assigning changed delivery routes before the morning shift.",
        "challenge": "Route changes and driver assignments arrived in separate messages.",
        "approach": "Put the route, assigned driver and unresolved stops in the same row.",
        "deliverables": "Queue, route detail and reassignment form.",
        "outcome": "The prototype keeps an unassigned route visible until a dispatcher selects a driver."
      },
      {
        "title": "Month-end review",
        "type": "Product design",
        "year": "2025",
        "summary": "A monthly report with the source entries next to each account total.",
        "challenge": "Reviewers had to leave the report to check an unexplained balance.",
        "approach": "Link each account row to its entries and keep the comparison period visible.",
        "deliverables": "Account table, period selector and entry detail.",
        "outcome": "The prototype shows which entries make up a total and which still need review."
      },
      {
        "title": "Equipment directory",
        "type": "Web design · React",
        "year": "2025",
        "summary": "A searchable inventory of shared cameras, microphones and lighting.",
        "challenge": "Availability was recorded in a spreadsheet separate from the equipment list.",
        "approach": "Show availability with each item and group equipment by its use.",
        "deliverables": "Inventory, category filters and equipment detail.",
        "outcome": "The prototype distinguishes available equipment from checked-out items."
      }
    ],
    "note": "Fictional profile and project briefs for this example."
  },
  "ko": {
    "profile": {
      "name": "Sora Han",
      "role": "제품 디자이너 · 프런트엔드 개발자",
      "location": "서울",
      "intro": [
        "일정 관리, 보고서, 재고 관리 도구를 디자인합니다.",
        "화면 설계부터 인터랙션 시제품과 React 구현까지 작업합니다."
      ],
      "email": "hello@example.com"
    },
    "projects": [
      {
        "title": "배차 대기 목록",
        "type": "제품 디자인 · React",
        "year": "2026",
        "summary": "아침 근무 전에 변경된 배송 경로에 기사를 배정하는 화면입니다.",
        "challenge": "경로 변경과 기사 배정이 서로 다른 메시지로 전달됐습니다.",
        "approach": "경로, 담당 기사, 미해결 배송지를 같은 행에 배치했습니다.",
        "deliverables": "대기 목록, 경로 상세, 기사 재배정 폼.",
        "outcome": "시제품에서는 기사를 선택할 때까지 미배정 경로가 목록에 남습니다."
      },
      {
        "title": "월말 계정 검토",
        "type": "제품 디자인",
        "year": "2025",
        "summary": "계정별 합계 옆에서 원본 거래 내역을 확인하는 월간 보고서입니다.",
        "challenge": "설명되지 않은 잔액을 확인하려면 보고서를 벗어나야 했습니다.",
        "approach": "계정 행과 거래 내역을 연결하고 비교 기간을 표시했습니다.",
        "deliverables": "계정 표, 기간 선택, 거래 상세.",
        "outcome": "시제품에서 합계에 포함된 거래와 검토가 필요한 항목을 구별할 수 있습니다."
      },
      {
        "title": "공용 장비 목록",
        "type": "웹 디자인 · React",
        "year": "2025",
        "summary": "카메라, 마이크, 조명의 대여 가능 여부를 검색하는 목록입니다.",
        "challenge": "대여 현황과 장비 목록이 별도 문서에 기록돼 있었습니다.",
        "approach": "각 장비 옆에 대여 상태를 표시하고 용도별로 분류했습니다.",
        "deliverables": "장비 목록, 분류 필터, 장비 상세.",
        "outcome": "시제품에서 대여 가능한 장비와 사용 중인 장비를 구별할 수 있습니다."
      }
    ],
    "note": "이 예제의 인물과 프로젝트는 가상의 사례입니다."
  },
  "ja": {
    "profile": {
      "name": "Sora Han",
      "role": "プロダクトデザイナー · フロントエンド開発者",
      "location": "ソウル",
      "intro": [
        "予定管理、レポート、在庫管理のツールをデザインしています。",
        "画面設計から操作の試作、Reactでの実装まで担当します。"
      ],
      "email": "hello@example.com"
    },
    "projects": [
      {
        "title": "配車待ち一覧",
        "type": "プロダクトデザイン · React",
        "year": "2026",
        "summary": "朝のシフト前に、変更された配送ルートへ担当者を割り当てる画面です。",
        "challenge": "ルート変更と担当者の割り当てが別々のメッセージで届いていました。",
        "approach": "ルート、担当者、未解決の配送先を同じ行に配置しました。",
        "deliverables": "待ち一覧、ルート詳細、担当者の変更フォーム。",
        "outcome": "試作画面では、担当者を選ぶまで未割り当てのルートが一覧に残ります。"
      },
      {
        "title": "月次決算の確認",
        "type": "プロダクトデザイン",
        "year": "2025",
        "summary": "勘定ごとの合計と、その元となる明細を確認する月次レポートです。",
        "challenge": "不明な残高を調べるには、レポートを離れる必要がありました。",
        "approach": "勘定の行と明細をつなぎ、比較対象の期間を表示しました。",
        "deliverables": "勘定一覧、期間選択、明細画面。",
        "outcome": "試作画面で、合計に含まれる明細と未確認の項目を区別できます。"
      },
      {
        "title": "共有機材の一覧",
        "type": "Webデザイン · React",
        "year": "2025",
        "summary": "カメラ、マイク、照明の貸出状況を検索する一覧です。",
        "challenge": "貸出状況と機材一覧は、別々の文書に記録されていました。",
        "approach": "各機材の横に貸出状況を表示し、用途で分類しました。",
        "deliverables": "機材一覧、分類フィルター、機材詳細。",
        "outcome": "試作画面で、利用可能な機材と貸出中の機材を区別できます。"
      }
    ],
    "note": "この例の人物とプロジェクトは架空のものです。"
  },
  "zh": {
    "profile": {
      "name": "Sora Han",
      "role": "产品设计师 · 前端开发者",
      "location": "首尔",
      "intro": [
        "我设计排期、报表和库存管理工具。",
        "工作包括界面布局、交互原型与 React 实现。"
      ],
      "email": "hello@example.com"
    },
    "projects": [
      {
        "title": "配送调度列表",
        "type": "产品设计 · React",
        "year": "2026",
        "summary": "在早班开始前，为变更后的配送路线分配司机的界面。",
        "challenge": "路线变更与司机分配通过不同的消息传达。",
        "approach": "将路线、司机和待处理站点放在同一行。",
        "deliverables": "待分配列表、路线详情与重新分配表单。",
        "outcome": "在原型中，未分配的路线会保留在列表中，直到调度员选择司机。"
      },
      {
        "title": "月末账目核对",
        "type": "产品设计",
        "year": "2025",
        "summary": "在账户合计旁查看原始交易记录的月度报表。",
        "challenge": "核对不明余额时，审核人员必须离开报表。",
        "approach": "将账户行与交易记录关联，并显示比较期间。",
        "deliverables": "账户表、期间选择与交易详情。",
        "outcome": "原型区分了计入合计的交易和仍待核对的项目。"
      },
      {
        "title": "共享设备目录",
        "type": "网页设计 · React",
        "year": "2025",
        "summary": "可查询相机、麦克风和灯具借用状态的目录。",
        "challenge": "设备目录和借用状态分别记录在不同文档中。",
        "approach": "在每件设备旁显示借用状态，并按用途分类。",
        "deliverables": "设备列表、类别筛选与设备详情。",
        "outcome": "原型明确区分可借用设备和已借出的设备。"
      }
    ],
    "note": "此示例中的人物和项目均为虚构。"
  }
} satisfies Record<PortfolioLocale, { profile: PortfolioProfile; projects: PortfolioProject[]; note: string }>;

export function PortfolioExample({ locale = "en" }: { locale?: PortfolioLocale }) {
  const sample = exampleContent[locale];
  return (
    <div className="grid gap-4">
      <Portfolio locale={locale} profile={sample.profile} projects={sample.projects} />
      <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">{sample.note}</p>
    </div>
  );
}

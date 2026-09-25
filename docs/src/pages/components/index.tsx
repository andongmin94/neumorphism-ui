import { notFound } from "fumapress/router";

import { ComponentDirectory } from "@/components/docs/component-directory";
import { isLocale } from "@/i18n/config";

const pageCopy = {
  ko: {
    kicker: "COMPONENT DIRECTORY",
    title: "필요한 인터페이스 부품만 source로.",
    body: "폼, 오버레이, 탐색, 데이터 표시와 피드백을 같은 표면·상태 규칙으로 조합합니다.",
  },
  en: {
    kicker: "COMPONENT DIRECTORY",
    title: "Install only the interface parts you need.",
    body: "Forms, overlays, navigation, data display and feedback share one surface and interaction language.",
  },
  ja: {
    kicker: "COMPONENT DIRECTORY",
    title: "必要なインターフェース部品だけを source として。",
    body: "フォーム、overlay、navigation、data display、feedback を同じ surface と state のルールで組み合わせます。",
  },
  zh: {
    kicker: "COMPONENT DIRECTORY",
    title: "只安装你需要的界面部件。",
    body: "表单、浮层、导航、数据展示和反馈共享同一套表面与交互语言。",
  },
} as const;

export default function ComponentsPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const copy = pageCopy[lang];

  return (
    <div className="directory-page component-directory-page">
      <header className="special-page-header">
        <div className="special-page-header-inner">
          <p className="directory-eyebrow">{copy.kicker}</p>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>
        </div>
      </header>
      <ComponentDirectory />
    </div>
  );
}

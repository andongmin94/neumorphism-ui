import { notFound } from "fumapress/router";

import { ComponentDirectory } from "@/components/docs/component-directory";
import { isLocale } from "@/i18n/config";

const pageCopy = {
  ko: {
    title: "컴포넌트",
    body: "컴포넌트를 검색하고 예제와 설치 코드를 확인하세요.",
  },
  en: {
    title: "Components",
    body: "Search components, try the examples and copy their installation commands.",
  },
  ja: {
    title: "コンポーネント",
    body: "コンポーネントを検索し、動作例とインストールコードを確認できます。",
  },
  zh: {
    title: "组件",
    body: "搜索组件、试用示例并复制安装命令。",
  },
} as const;

export default function ComponentsPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const copy = pageCopy[lang];

  return (
    <div className="directory-page component-directory-page">
      <header className="special-page-header">
        <div className="special-page-header-inner">
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>
        </div>
      </header>
      <ComponentDirectory />
    </div>
  );
}

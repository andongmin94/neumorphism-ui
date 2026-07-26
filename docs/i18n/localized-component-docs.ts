import {
  componentDocCategories,
  componentDocs,
  type ComponentDoc,
} from "@/components/docs/component-docs-data";
import { componentDocCopyEn } from "@/i18n/component-doc-copy.en";
import { componentDocCopyJa } from "@/i18n/component-doc-copy.ja";
import { componentDocCopyZh } from "@/i18n/component-doc-copy.zh";
import {
  type ComponentDocCopyMap,
  validateComponentDocCopy,
} from "@/i18n/component-doc-copy";
import { componentUsageCodeEn } from "@/i18n/component-usage-code.en";
import { componentUsageCodeJa } from "@/i18n/component-usage-code.ja";
import { componentUsageCodeZh } from "@/i18n/component-usage-code.zh";
import {
  type ComponentUsageCodeMap,
  validateComponentUsageCode,
} from "@/i18n/component-usage-code";
import type { Locale } from "@/i18n/config";

const localizedCategoryCopy = {
  ko: {
    "actions-overlays": {
      label: "행동과 오버레이",
      description: "행동을 시작하고 맥락을 유지하는 인터랙션",
    },
    "forms-selection": {
      label: "폼과 선택",
      description: "입력, 선택, 설정을 위한 뉴모피즘 폼 컨트롤",
    },
    "navigation-disclosure": {
      label: "탐색과 공개",
      description: "위치, 전환, 접힌 정보를 명확히 보여주는 구조",
    },
    "data-feedback": {
      label: "데이터와 피드백",
      description: "상태, 진행, 콘텐츠와 데이터를 표현하는 표면",
    },
  },
  en: {
    "actions-overlays": {
      label: "Actions & overlays",
      description: "Interactions that start actions without losing context",
    },
    "forms-selection": {
      label: "Forms & selection",
      description: "Neumorphic controls for input, selection, and settings",
    },
    "navigation-disclosure": {
      label: "Navigation & disclosure",
      description: "Structures for location, transitions, and hidden content",
    },
    "data-feedback": {
      label: "Data & feedback",
      description: "Surfaces for status, progress, content, and data",
    },
  },
  zh: {
    "actions-overlays": {
      label: "操作与浮层",
      description: "在保留上下文的同时发起操作",
    },
    "forms-selection": {
      label: "表单与选择",
      description: "用于输入、选择和设置的新拟态控件",
    },
    "navigation-disclosure": {
      label: "导航与展开",
      description: "清晰呈现位置、切换与折叠内容",
    },
    "data-feedback": {
      label: "数据与反馈",
      description: "展示状态、进度、内容和数据的表面",
    },
  },
  ja: {
    "actions-overlays": {
      label: "アクションとオーバーレイ",
      description: "文脈を保ちながら操作を始めるインタラクション",
    },
    "forms-selection": {
      label: "フォームと選択",
      description: "入力、選択、設定のためのニューモーフィズムコントロール",
    },
    "navigation-disclosure": {
      label: "ナビゲーションと開示",
      description: "位置、切り替え、折りたたみ情報を明確に示す構造",
    },
    "data-feedback": {
      label: "データとフィードバック",
      description: "状態、進捗、コンテンツ、データを表すサーフェス",
    },
  },
} as const;

const translatedDocCopy: Partial<
  Record<Exclude<Locale, "ko">, ComponentDocCopyMap>
> = {
  en: componentDocCopyEn,
  zh: componentDocCopyZh,
  ja: componentDocCopyJa,
};

const translatedUsageCode: Record<
  Exclude<Locale, "ko">,
  ComponentUsageCodeMap
> = {
  en: componentUsageCodeEn,
  zh: componentUsageCodeZh,
  ja: componentUsageCodeJa,
};

for (const [locale, copy] of Object.entries(translatedDocCopy)) {
  if (copy) {
    validateComponentDocCopy(locale as Exclude<Locale, "ko">, copy);
  }
}

for (const copy of Object.values(translatedUsageCode)) {
  validateComponentUsageCode(copy);
}

export function getLocalizedComponentCategories(locale: Locale) {
  const copy = localizedCategoryCopy[locale];

  return componentDocCategories.map((category) => ({
    ...category,
    ...copy[category.id],
  }));
}

export function getLocalizedComponentDocs(locale: Locale): readonly ComponentDoc[] {
  if (locale === "ko") {
    return componentDocs;
  }

  const copy = translatedDocCopy[locale];

  if (!copy) {
    throw new Error(`Missing component documentation for ${locale}`);
  }

  return componentDocs.map((component) => {
    const translated = copy[component.slug];

    return {
      ...component,
      summary: translated.summary,
      description: translated.description,
      usageCode: translatedUsageCode[locale][component.slug],
      props: component.props.map((prop, index) => ({
        ...prop,
        description: translated.props[index],
      })),
      accessibility: translated.accessibility,
    };
  });
}

export function getLocalizedComponentDoc(locale: Locale, slug: string) {
  return getLocalizedComponentDocs(locale).find(
    (component) => component.slug === slug,
  );
}

export function getLocalizedComponentDocGroups(locale: Locale) {
  const categories = getLocalizedComponentCategories(locale);
  const docs = getLocalizedComponentDocs(locale);

  return categories.map((category) => ({
    category,
    items: docs.filter((component) => component.category === category.id),
  }));
}

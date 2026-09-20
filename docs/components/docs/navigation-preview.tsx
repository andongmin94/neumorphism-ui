"use client";

import * as React from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport } from "@neumorphism-ui/registry/ui/navigation-menu";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarCheckboxItem } from "@neumorphism-ui/registry/ui/menubar";
import type { Locale } from "@/i18n/config";

const copy = {
  en: { product: "Product", guides: "Guides", components: "Components", themes: "Themes", guideText: "Choose a destination from the navigation menu.", file: "File", view: "View", create: "New document", archived: "Archive", status: "Show status", ready: "Ready", created: "New document created" },
  ko: { product: "제품", guides: "안내", components: "컴포넌트", themes: "테마", guideText: "메뉴에서 이동할 섹션을 선택하세요.", file: "파일", view: "보기", create: "새 문서", archived: "보관", status: "상태 표시", ready: "준비됨", created: "새 문서를 만들었습니다" },
  ja: { product: "製品", guides: "ガイド", components: "コンポーネント", themes: "テーマ", guideText: "メニューから移動先を選んでください。", file: "ファイル", view: "表示", create: "新規文書", archived: "保管", status: "状態を表示", ready: "準備完了", created: "新しい文書を作成しました" },
  zh: { product: "产品", guides: "指南", components: "组件", themes: "主题", guideText: "从菜单选择目标区域。", file: "文件", view: "视图", create: "新建文档", archived: "归档", status: "显示状态", ready: "就绪", created: "已创建新文档" },
};
export function NavigationPreview({ slug, locale }: { slug: "navigation-menu" | "menubar"; locale: Locale }) {
  const t = copy[locale]; const id = React.useId();
  const [showStatus, setShowStatus] = React.useState(true); const [created, setCreated] = React.useState(false);
  if (slug === "navigation-menu") return <div className="grid w-full gap-5"><NavigationMenu aria-label={t.product}><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>{t.product}</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href={`#${id}-components`}>{t.components}</NavigationMenuLink><NavigationMenuLink href={`#${id}-themes`}>{t.themes}</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href={`#${id}-guide`}>{t.guides}</NavigationMenuLink></NavigationMenuItem></NavigationMenuList><NavigationMenuViewport /></NavigationMenu><div className="grid gap-2 text-sm text-[var(--muted-foreground)]"><p id={`${id}-guide`}>{t.guideText}</p><p id={`${id}-components`}>{t.components} · 46</p><p id={`${id}-themes`}>{t.themes} · 5</p></div></div>;
  return <div className="grid w-full gap-4"><Menubar aria-label={t.file}><MenubarMenu><MenubarTrigger>{t.file}</MenubarTrigger><MenubarContent><MenubarItem onClick={() => setCreated(true)}>{t.create}</MenubarItem><MenubarItem disabled>{t.archived}</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>{t.view}</MenubarTrigger><MenubarContent><MenubarCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>{t.status}</MenubarCheckboxItem></MenubarContent></MenubarMenu></Menubar>{showStatus && <p role="status" className="text-sm text-[var(--muted-foreground)]">{created ? t.created : t.ready}</p>}</div>;
}

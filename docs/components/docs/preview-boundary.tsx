"use client";

import { Component, Suspense, type ReactNode } from "react";
import { Button } from "@neumorphism-ui/registry/ui/button";
import type { Locale } from "@/i18n/config";

const copy = {
  ko: { loading: "미리보기를 불러오는 중입니다.", failed: "미리보기를 불러오지 못했습니다.", reload: "페이지 새로고침" },
  en: { loading: "Loading preview.", failed: "Preview could not be loaded.", reload: "Reload page" },
  ja: { loading: "プレビューを読み込んでいます。", failed: "プレビューを読み込めませんでした。", reload: "ページを再読み込み" },
  zh: { loading: "正在加载预览。", failed: "无法加载预览。", reload: "刷新页面" },
} as const;

export class PreviewBoundary extends Component<{ children: ReactNode; locale: Locale }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    const t = copy[this.props.locale];
    if (this.state.failed) {
      return (
        <div className="grid justify-items-center gap-3 text-center text-sm" role="alert">
          <p>{t.failed}</p>
          <Button type="button" size="sm" onClick={() => window.location.reload()}>{t.reload}</Button>
        </div>
      );
    }
    return <Suspense fallback={<p role="status" className="text-sm text-[var(--muted-foreground)]">{t.loading}</p>}>{this.props.children}</Suspense>;
  }
}

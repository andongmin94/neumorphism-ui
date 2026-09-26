"use client";

import { useId, useRef, useState } from "react";
import { Link } from "fumapress/client";
import { Badge } from "@neumorphism-ui/registry/ui/badge";
import { Button } from "@neumorphism-ui/registry/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@neumorphism-ui/registry/ui/card";
import { Input } from "@neumorphism-ui/registry/ui/input";
import { Label } from "@neumorphism-ui/registry/ui/label";
import { Switch } from "@neumorphism-ui/registry/ui/switch";
import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import styles from "./home-showcase.module.css";

const copy = {
  en: {
    caption: "Real controls. Shared rules.", try: "Try it out ↓", badge: "Built with Neumorphism UI",
    title: "One interface. Not loose parts.", body: "Edit a field, change a setting, then save.",
    name: "Workspace name", notifications: "Keep me in the loop", notificationHint: "Only the updates that matter.",
    save: "Save workspace", reset: "Reset", cms: "Try the CMS demo", required: "Enter a workspace name, not only spaces.",
    demo: "Demo only. Edits reset when you refresh.", dirty: "Unsaved changes", saved: "Saved for this page view. Nothing was sent.", discarded: "Changes discarded. Saved values restored.",
  },
  ko: {
    caption: "실제 컴포넌트. 같은 규칙.", try: "직접 사용해보기 ↓", badge: "Neumorphism UI로 제작",
    title: "부품을 넘어 하나의 인터페이스로.", body: "이름과 설정을 바꾸고 저장해보세요.",
    name: "작업 공간 이름", notifications: "업데이트 받기", notificationHint: "필요한 소식만 전달합니다.",
    save: "작업 공간 저장", reset: "되돌리기", cms: "CMS 데모 열기", required: "공백이 아닌 작업 공간 이름을 입력하세요.",
    demo: "로컬 데모입니다. 새로고침하면 초기화됩니다.", dirty: "저장하지 않은 변경 사항", saved: "현재 페이지에 저장했습니다. 서버로 전송하지 않았습니다.", discarded: "변경을 취소하고 저장된 값으로 돌아갔습니다.",
  },
  ja: {
    caption: "実際のコンポーネント。同じルール。", try: "試してみる ↓", badge: "Neumorphism UIで制作",
    title: "部品ではなく、一つのインターフェース。", body: "名前と設定を変更して保存してください。",
    name: "ワークスペース名", notifications: "更新を受け取る", notificationHint: "必要な情報だけをお届けします。",
    save: "保存する", reset: "元に戻す", cms: "CMSデモを開く", required: "空白以外の名前を入力してください。",
    demo: "ローカルデモです。再読み込みで初期化されます。", dirty: "未保存の変更", saved: "このページに保存しました。送信はしていません。", discarded: "保存済みの値に戻しました。",
  },
  zh: {
    caption: "真实组件。同一套规则。", try: "试试看 ↓", badge: "使用 Neumorphism UI 构建",
    title: "一个界面，而不是零散部件。", body: "修改名称与设置，然后保存。",
    name: "工作空间名称", notifications: "接收更新", notificationHint: "只接收重要的信息。",
    save: "保存工作空间", reset: "重置", cms: "打开 CMS 演示", required: "请输入非空白名称。",
    demo: "本地演示，刷新后重置。", dirty: "有未保存的更改", saved: "已保存在当前页面，没有发送任何数据。", discarded: "已放弃更改并恢复保存的值。",
  },
} as const;

const initialValues = { name: "Side project studio", notifications: true };

export function HomeShowcase() {
  const { locale } = useLocale();
  const t = copy[locale];
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(initialValues);
  const [draft, setDraft] = useState(initialValues);
  const [message, setMessage] = useState<"demo" | "saved" | "discarded">("demo");
  const [invalid, setInvalid] = useState(false);
  const dirty = draft.name !== saved.name || draft.notifications !== saved.notifications;

  return (
    <section className="home-showcase" data-home-showcase aria-labelledby={`${id}-title`}>
      <div className="home-showcase-caption"><span>{t.caption}</span><span>{t.try}</span></div>
      <Card>
        <CardHeader className={styles.header}>
          <Badge className={styles.badge}>{t.badge}</Badge>
          <h2 id={`${id}-title`} className={styles.title}>{t.title}</h2>
          <CardDescription>{t.body}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              const name = draft.name.trim();
              if (!name) {
                setInvalid(true);
                input.current?.focus();
                return;
              }
              const snapshot = { ...draft, name };
              setSaved(snapshot);
              setDraft(snapshot);
              setInvalid(false);
              setMessage("saved");
            }}
            onReset={(event) => {
              event.preventDefault();
              setDraft({ ...saved });
              setInvalid(false);
              setMessage("discarded");
            }}
          >
            <div className={styles.field}>
              <Label htmlFor={`${id}-name`}>{t.name}</Label>
              <Input
                ref={input}
                id={`${id}-name`}
                name="workspaceName"
                value={draft.name}
                required
                maxLength={60}
                aria-invalid={invalid || undefined}
                aria-describedby={invalid ? `${id}-error` : undefined}
                onChange={(event) => {
                  setDraft(current => ({ ...current, name: event.target.value }));
                  setInvalid(false);
                }}
              />
              {invalid && <p id={`${id}-error`} className={styles.error} role="alert">{t.required}</p>}
            </div>
            <div className={styles.setting}>
              <div className={styles.settingCopy}>
                <Label htmlFor={`${id}-notifications`}>{t.notifications}</Label>
                <p id={`${id}-notification-hint`}>{t.notificationHint}</p>
              </div>
              <Switch
                id={`${id}-notifications`}
                name="notifications"
                checked={draft.notifications}
                aria-describedby={`${id}-notification-hint`}
                onCheckedChange={(checked) => setDraft(current => ({ ...current, notifications: checked }))}
              />
            </div>
            <div className={styles.actions}>
              <Button type="submit" variant="primary">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg>
                {t.save}
              </Button>
              <Button type="reset" variant="ghost" disabled={!dirty}>{t.reset}</Button>
            </div>
            <output className={styles.status} aria-live="polite">{dirty ? t.dirty : t[message]}</output>
            <Link className={styles.demoLink} href={localeHref(locale, "/templates/cms")}>
              {t.cms}<span aria-hidden="true">↗</span>
            </Link>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

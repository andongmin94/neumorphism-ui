"use client";

import { useId, useRef, useState } from "react";
import { Link } from "fumapress/client";
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
    title: "Workspace settings", body: "Rename the workspace and choose its notification setting.",
    name: "Workspace name", notifications: "Email notifications", notificationHint: "Example preference. No email is sent.",
    save: "Save workspace", reset: "Reset", cms: "Try the CMS demo", required: "Enter a workspace name, not only spaces.",
    demo: "Demo only. Edits reset when you refresh.", dirty: "Unsaved changes", saved: "Saved for this page view. Nothing was sent.", discarded: "Changes discarded. Saved values restored.",
  },
  ko: {
    title: "작업 공간 설정", body: "작업 공간 이름과 이메일 알림 설정을 변경하세요.",
    name: "작업 공간 이름", notifications: "이메일 알림", notificationHint: "설정 예제이며 실제 메일은 발송하지 않습니다.",
    save: "작업 공간 저장", reset: "되돌리기", cms: "CMS 데모 열기", required: "공백이 아닌 작업 공간 이름을 입력하세요.",
    demo: "로컬 데모입니다. 새로고침하면 초기화됩니다.", dirty: "저장하지 않은 변경 사항", saved: "현재 페이지에 저장했습니다. 서버로 전송하지 않았습니다.", discarded: "변경을 취소하고 저장된 값으로 돌아갔습니다.",
  },
  ja: {
    title: "ワークスペース設定", body: "ワークスペース名とメール通知を設定します。",
    name: "ワークスペース名", notifications: "メール通知", notificationHint: "設定例です。メールは送信されません。",
    save: "保存する", reset: "元に戻す", cms: "CMSデモを開く", required: "空白以外の名前を入力してください。",
    demo: "ローカルデモです。再読み込みで初期化されます。", dirty: "未保存の変更", saved: "このページに保存しました。送信はしていません。", discarded: "保存済みの値に戻しました。",
  },
  zh: {
    title: "工作空间设置", body: "修改工作空间名称并设置邮件通知。",
    name: "工作空间名称", notifications: "邮件通知", notificationHint: "仅演示设置，不会发送邮件。",
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
      <Card>
        <CardHeader className={styles.header}>
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
                {t.save}
              </Button>
              <Button type="reset" variant="ghost" disabled={!dirty}>{t.reset}</Button>
            </div>
            <output className={styles.status} aria-live="polite">{dirty ? t.dirty : t[message]}</output>
            <Link className={styles.demoLink} href={localeHref(locale, "/templates/cms")}>
              {t.cms}<svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
            </Link>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

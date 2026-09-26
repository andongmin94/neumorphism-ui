"use client";

import { useId, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Link } from "fumapress/client";
import { Alert, AlertDescription, AlertTitle } from "@neumorphism-ui/registry/ui/alert";
import { Button } from "@neumorphism-ui/registry/ui/button";
import { Card } from "@neumorphism-ui/registry/ui/card";
import { Input } from "@neumorphism-ui/registry/ui/input";
import { Progress } from "@neumorphism-ui/registry/ui/progress";
import { Switch } from "@neumorphism-ui/registry/ui/switch";
import { localeHref, type Locale } from "@/i18n/config";
import type { getMessages } from "@/i18n/messages";
import styles from "./theme-preview.module.css";

const words = {
  en: { demo: "Local preview only. No alert is sent.", saved: "Target", current: "Current price", paused: "Alerts paused", removed: "Alert removed. Save a target to recreate it.", invalid: "Enter a price greater than zero.", progress: "Of target", edit: "Set your target", reset: "Reset", unsaved: "Unsaved target", savedState: "Target saved", noTarget: "No target" },
  ko: { demo: "로컬 미리보기입니다. 알림을 전송하지 않습니다.", saved: "목표 가격", current: "현재 가격", paused: "알림 일시 정지", removed: "알림을 삭제했습니다. 목표 가격을 저장하면 다시 만들 수 있습니다.", invalid: "0보다 큰 가격을 입력하세요.", progress: "목표 대비", edit: "목표 가격 설정", reset: "되돌리기", unsaved: "저장하지 않은 목표", savedState: "목표 저장됨", noTarget: "목표 없음" },
  ja: { demo: "ローカルプレビューです。通知は送信されません。", saved: "目標価格", current: "現在価格", paused: "通知を一時停止", removed: "通知を削除しました。目標価格を保存すると再作成できます。", invalid: "0より大きい価格を入力してください。", progress: "目標比", edit: "目標価格を設定", reset: "元に戻す", unsaved: "未保存の目標", savedState: "目標を保存しました", noTarget: "目標なし" },
  zh: { demo: "仅为本地预览，不会发送提醒。", saved: "目标价格", current: "当前价格", paused: "提醒已暂停", removed: "已删除提醒。保存目标价格即可重新创建。", invalid: "请输入大于零的价格。", progress: "目标比例", edit: "设置目标价格", reset: "还原", unsaved: "未保存的目标", savedState: "目标已保存", noTarget: "无目标" },
} as const;

type Props = {
  copy: ReturnType<typeof getMessages>["themeStudio"];
  locale: Locale;
  previewMode: "light" | "dark";
  style: CSSProperties;
};

const currentPrice = 188.32;

export function ThemePreview({ copy, locale, previewMode, style }: Props) {
  const t = words[locale];
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("210");
  const [saved, setSaved] = useState<number | null>(210);
  const [notifications, setNotifications] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const dirty = saved === null || Number(draft) !== saved;
  const progress = saved === null ? 0 : Math.min(100, currentPrice / saved * 100);
  const money = new Intl.NumberFormat(locale, { style: "currency", currency: "USD" });

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const price = Number(draft);
    if (!Number.isFinite(price) || price <= 0) {
      setInvalid(true);
      input.current?.focus();
      return;
    }
    setSaved(price);
    setDraft(String(price));
    setInvalid(false);
  }

  return (
    <div className={styles.canvas} data-theme-price-preview data-preview-mode={previewMode} style={style}>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>NVDA <span>NASDAQ</span></p>
          <h2>{copy.priceAlert}</h2>
        </div>
        <span className={styles.state} data-dirty={dirty || undefined}>
          <span aria-hidden="true" />
          {saved === null ? t.noTarget : dirty ? t.unsaved : t.savedState}
        </span>
      </header>

      <dl className={styles.metrics} data-price-metrics>
        <Card className={`${styles.metric} ${styles.featured}`} variant="raised">
          <dt>{t.current}</dt><dd>{money.format(currentPrice)}</dd>
        </Card>
        <Card className={styles.metric} variant="inset">
          <dt>{t.saved}</dt><dd>{saved === null ? "—" : money.format(saved)}</dd>
        </Card>
        <Card className={styles.metric} variant="inset">
          <dt>{copy.changeToday}</dt><dd>+2.14%</dd>
        </Card>
        <Card className={styles.metric} variant="inset">
          <dt>{t.progress}</dt><dd>{saved === null ? "—" : `${Math.round(progress)}%`}</dd>
        </Card>
      </dl>

      <div className={styles.body}>
        <section className={styles.editor} aria-labelledby={`${id}-edit`}>
          <h3 id={`${id}-edit`}>{t.edit}</h3>
          <form className={styles.form} noValidate onSubmit={save}>
            <label htmlFor={`${id}-price`}>{copy.targetPrice} <span>USD</span></label>
            <div className={styles.fieldRow}>
              <Input ref={input} id={`${id}-price`} type="number" inputMode="decimal" min="0.01" step="0.01" value={draft} aria-invalid={invalid || undefined} aria-describedby={invalid ? `${id}-error` : undefined} onChange={event => { setDraft(event.target.value); setInvalid(false); }} />
              <Button type="submit" variant="primary" disabled={!dirty}>{copy.save}</Button>
            </div>
            {invalid && <p id={`${id}-error`} className={styles.error} role="alert">{t.invalid}</p>}
          </form>
          <div className={styles.progress}>
            <span><strong>{copy.currentPrice}</strong><small>{Math.round(progress)}% {t.progress.toLocaleLowerCase(locale)}</small></span>
            <Progress aria-label={copy.targetProgress} value={progress} />
          </div>
          <footer className={styles.footer}>
            <Link className={styles.chartLink} href={localeHref(locale, "/charts")}>
              {copy.viewChart}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
            </Link>
            <Button variant="ghost" disabled={saved === null} onClick={() => { setSaved(null); setInvalid(false); }}>{copy.deleteAlert}</Button>
          </footer>
        </section>

        <section className={styles.conditions} aria-labelledby={`${id}-conditions`}>
          <h3 id={`${id}-conditions`}>{copy.alertConditions}</h3>
          <p>{copy.pushAtTarget}</p>
          <label className={styles.toggleRow}>
            <span><strong>{copy.realtimeAlerts}</strong><small>{notifications ? copy.on : copy.off}</small></span>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </label>
          <Alert className={styles.status} variant="default" role="status">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={saved !== null && notifications ? "m5 12 4 4L19 6" : "M8 6v12M16 6v12"} /></svg>
            <AlertTitle>{saved === null ? t.removed : notifications ? copy.alertEnabled : t.paused}</AlertTitle>
            <AlertDescription>
              {saved !== null && <span>{t.saved}: {money.format(saved)}</span>}
              <span>{t.demo}</span>
            </AlertDescription>
          </Alert>
        </section>
      </div>
    </div>
  );
}

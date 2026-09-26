"use client";
import { useId, useRef, useState, type CSSProperties } from "react";
import { Link } from "fumapress/client";
import { Alert, AlertDescription, AlertTitle } from "@neumorphism-ui/registry/ui/alert";
import { Badge } from "@neumorphism-ui/registry/ui/badge";
import { Button } from "@neumorphism-ui/registry/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@neumorphism-ui/registry/ui/card";
import { Input } from "@neumorphism-ui/registry/ui/input";
import { Progress } from "@neumorphism-ui/registry/ui/progress";
import { Switch } from "@neumorphism-ui/registry/ui/switch";
import { localeHref, type Locale } from "@/i18n/config";
import type { getMessages } from "@/i18n/messages";
import styles from "./theme-preview.module.css";
const words = {
  en: { demo: "Local preview only. No alert is sent.", saved: "Target", paused: "Alerts paused", removed: "Alert removed. Save a target to recreate it.", invalid: "Enter a price greater than zero.", progress: "of target" },
  ko: { demo: "로컬 미리보기입니다. 알림을 전송하지 않습니다.", saved: "목표 가격", paused: "알림 일시 정지", removed: "알림을 삭제했습니다. 목표 가격을 저장하면 다시 만들 수 있습니다.", invalid: "0보다 큰 가격을 입력하세요.", progress: "목표 대비" },
  ja: { demo: "ローカルプレビューです。通知は送信されません。", saved: "目標価格", paused: "通知を一時停止", removed: "通知を削除しました。目標価格を保存すると再作成できます。", invalid: "0より大きい価格を入力してください。", progress: "目標比" },
  zh: { demo: "仅为本地预览，不会发送提醒。", saved: "目标价格", paused: "提醒已暂停", removed: "已删除提醒。保存目标价格即可重新创建。", invalid: "请输入大于零的价格。", progress: "目标比例" },
} as const;
type Props = { copy: ReturnType<typeof getMessages>["themeStudio"]; locale: Locale; previewMode: "light" | "dark"; style: CSSProperties };
export function ThemePreview({ copy, locale, previewMode, style }: Props) {
  const t=words[locale]; const id=useId(); const input=useRef<HTMLInputElement>(null);
  const [draft,setDraft]=useState("210"); const [saved,setSaved]=useState<number|null>(210);
  const [notifications,setNotifications]=useState(true); const [invalid,setInvalid]=useState(false);
  const progress=saved===null ? 0 : Math.min(100,188.32/saved*100);
  const money=new Intl.NumberFormat(locale,{style:"currency",currency:"USD"});
  return <div className="theme-preview-canvas" data-theme-price-preview data-preview-mode={previewMode} style={style}>
    <Card className="theme-preview-profile">
      <CardHeader><Badge variant="primary" className={styles.badge}>NVDA</Badge><CardTitle>{copy.priceAlert}</CardTitle><CardDescription>NVIDIA · NASDAQ</CardDescription></CardHeader>
      <CardContent>
        <form noValidate className="theme-preview-field" onSubmit={event=>{event.preventDefault();const price=Number(draft);if(!Number.isFinite(price)||price<=0){setInvalid(true);input.current?.focus();return;}setSaved(price);setDraft(String(price));setInvalid(false);}}>
          <label htmlFor={`${id}-price`}>{copy.targetPrice}</label>
          <div><Input ref={input} id={`${id}-price`} type="number" inputMode="decimal" min="0.01" step="0.01" value={draft} aria-invalid={invalid||undefined} aria-describedby={invalid?`${id}-error`:undefined} onChange={event=>{setDraft(event.target.value);setInvalid(false);}} /><Button type="submit" variant="primary" disabled={saved!==null&&Number(draft)===saved}>{copy.save}</Button></div>
          {invalid&&<p id={`${id}-error`} className={styles.error} role="alert">{t.invalid}</p>}
        </form>
        <div className="theme-preview-progress"><span><strong>{copy.currentPrice}</strong><small>{Math.round(progress)}% {t.progress}</small></span><Progress aria-label={copy.targetProgress} value={progress} /></div>
      </CardContent>
      <CardFooter className={styles.footer}><Link className={styles.chartLink} href={localeHref(locale,"/charts")}>{copy.viewChart}<span aria-hidden="true">↗</span></Link><Button variant="ghost" disabled={saved===null} onClick={()=>setSaved(null)}>{copy.deleteAlert}</Button></CardFooter>
    </Card>
    <div className="theme-preview-side">
      <Card variant="flat" className="theme-preview-settings"><CardHeader><CardTitle>{copy.alertConditions}</CardTitle><CardDescription>{copy.pushAtTarget}</CardDescription></CardHeader><CardContent><label><span><strong>{copy.realtimeAlerts}</strong><small>{notifications?copy.on:copy.off}</small></span><Switch checked={notifications} onCheckedChange={setNotifications}/></label><div className={styles.changeRow}><span><strong>{copy.changeToday}</strong><small>{copy.intraday}</small></span><Badge variant="soft">+2.14%</Badge></div></CardContent></Card>
      <Alert variant={saved!==null&&notifications?"success":"default"} role="status">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={saved!==null&&notifications?"m5 12 4 4L19 6":"M8 6v12M16 6v12"}/></svg>
        <AlertTitle>{saved===null?t.removed:notifications?copy.alertEnabled:t.paused}</AlertTitle><AlertDescription>{saved!==null&&<span>{t.saved}: {money.format(saved)}</span>}<span>{t.demo}</span></AlertDescription>
      </Alert>
    </div>
    <div className="theme-elevation-strip"><Card variant="raised"><span>{copy.card}</span><small>{copy.raisedSurface}</small></Card><Card variant="inset"><span>{copy.input}</span><small>{copy.insetSurface}</small></Card><Card variant="flat"><span>{copy.divider}</span><small>{copy.flatStructure}</small></Card></div>
  </div>;
}

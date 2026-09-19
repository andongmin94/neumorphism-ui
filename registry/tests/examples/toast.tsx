"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ToastProvider, Toaster, useToast } from "@/components/ui/toast";
const copy = {
  en: { save: "Show success", success: "Changes saved", body: "This is a local demonstration. No server request was made.", fail: "Show error", error: "Could not save", retry: "Your changes are retained. Try again.", archive: "Archive draft", archived: "Draft archived", undo: "Undo", undone: "Archive undone", idle: "Draft available", timed: "Show timed toast", quick: "Quick update", region: "Notifications", close: "Dismiss notification" },
  ko: { save: "성공 알림", success: "변경 사항 저장됨", body: "로컬 예제이며 서버 요청은 전송하지 않습니다.", fail: "오류 알림", error: "저장하지 못했습니다", retry: "변경 사항은 유지됩니다. 다시 시도하세요.", archive: "초안 보관", archived: "초안이 보관되었습니다", undo: "실행 취소", undone: "보관을 취소했습니다", idle: "초안 사용 가능", timed: "자동 닫힘 알림", quick: "업데이트 알림", region: "알림", close: "알림 닫기" },
  ja: { save: "成功通知", success: "変更を保存しました", body: "ローカル例です。サーバーへの送信は行いません。", fail: "エラー通知", error: "保存できませんでした", retry: "変更は保持されています。再試行してください。", archive: "下書きを保管", archived: "下書きを保管しました", undo: "元に戻す", undone: "保管を取り消しました", idle: "下書き利用可能", timed: "自動で閉じる通知", quick: "更新通知", region: "通知", close: "通知を閉じる" },
  zh: { save: "成功通知", success: "更改已保存", body: "这是本地示例，未发送服务器请求。", fail: "错误通知", error: "保存失败", retry: "更改仍然保留，请重试。", archive: "归档草稿", archived: "草稿已归档", undo: "撤销", undone: "已撤销归档", idle: "草稿可用", timed: "自动关闭通知", quick: "更新通知", region: "通知", close: "关闭通知" },
};

function ToastActions({ locale }: { locale: keyof typeof copy }) {
  const text = copy[locale];
  const manager = useToast();
  const [status, setStatus] = React.useState<string>(text.idle);
  return <div className="grid gap-4"><div className="flex flex-wrap gap-3">
    <Button onClick={() => manager.add({ title: text.success, description: text.body, type: "success" })}>{text.save}</Button>
    <Button onClick={() => manager.add({ title: text.error, description: text.retry, type: "error" })}>{text.fail}</Button>
    <Button onClick={() => { setStatus(text.archived); const id = manager.add({ title: text.archived, description: text.body, actionProps: { children: text.undo, onClick: () => { setStatus(text.undone); manager.close(id); } } }); }}>{text.archive}</Button>
    <Button onClick={() => manager.add({ title: text.quick, timeout: 1200 })}>{text.timed}</Button>
  </div><p role="status" className="text-sm text-[var(--muted-foreground)]">{status}</p></div>;
}

export default function ToastExample({ locale = "en" }: { locale?: keyof typeof copy }) {
  // Keep examples available for inspection; the timed example overrides this.
  return <ToastProvider timeout={0}><ToastActions locale={locale} /><Toaster label={copy[locale].region} closeLabel={copy[locale].close} /></ToastProvider>;
}

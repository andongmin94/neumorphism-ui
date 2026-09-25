"use client";

import * as React from "react";
import { Button } from "@neumorphism-ui/registry/ui/button";
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose } from "@neumorphism-ui/registry/ui/popover";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@neumorphism-ui/registry/ui/hover-card";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@neumorphism-ui/registry/ui/alert-dialog";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@neumorphism-ui/registry/ui/sheet";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@neumorphism-ui/registry/ui/collapsible";
import { Toggle } from "@neumorphism-ui/registry/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@neumorphism-ui/registry/ui/toggle-group";
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@neumorphism-ui/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@neumorphism-ui/registry/ui/fieldset";
import { Form } from "@neumorphism-ui/registry/ui/form";
import { NumberField, NumberFieldGroup, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from "@neumorphism-ui/registry/ui/number-field";
import { Toolbar, ToolbarGroup, ToolbarButton, ToolbarSeparator } from "@neumorphism-ui/registry/ui/toolbar";
import { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from "@neumorphism-ui/registry/ui/meter";
import { Combobox, ComboboxLabel, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from "@neumorphism-ui/registry/ui/combobox";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from "@neumorphism-ui/registry/ui/command";

export const expandedSlugs = ["alert-dialog", "popover", "hover-card", "sheet", "collapsible", "toggle", "toggle-group", "toolbar", "field", "fieldset", "form", "number-field", "meter", "combobox", "command"] as const;
export type ExpandedSlug = (typeof expandedSlugs)[number];
type PreviewLocale = "ko" | "en" | "ja" | "zh";
const copy = {
  ko: { open: "알림 설정", title: "알림을 조절하세요", body: "중요한 업데이트만 받아 집중을 유지하세요.", close: "닫기", discard: "초안 삭제", confirm: "초안을 삭제할까요?", warning: "이 작업은 되돌릴 수 없습니다. 계속하려면 직접 확인하세요.", cancel: "돌아가기", done: "초안을 삭제했습니다.", profile: "프로필 미리보기", person: "제품 디자이너 · 서울", details: "세부 설정", detailBody: "기본 동작은 그대로 두고 추가 설정만 펼칩니다.", pin: "고정", locked: "잠김", align: "정렬", left: "왼쪽", center: "가운데", right: "오른쪽", tools: "문서 도구", undo: "실행 취소", redo: "다시 실행", save: "변경 저장", saved: "로컬 예제를 저장했습니다.", name: "표시 이름", hint: "프로필에 표시할 이름을 입력하세요.", required: "이름을 입력하세요.", settings: "프로필 설정", quantity: "좌석 수", increase: "좌석 늘리기", decrease: "좌석 줄이기", storage: "저장 공간", city: "도시 검색", empty: "일치하는 도시가 없습니다.", reset: "초기화", editing: "저장 전 변경 사항", quiet: "저장된 상태" },
  en: { open: "Notification settings", title: "Tune your notifications", body: "Keep your focus with only the updates that matter.", close: "Close", discard: "Delete draft", confirm: "Delete this draft?", warning: "This cannot be undone. Confirm explicitly to continue.", cancel: "Go back", done: "Draft deleted.", profile: "Preview profile", person: "Product designer · Seoul", details: "Advanced settings", detailBody: "Reveal optional settings without changing the defaults.", pin: "Pin", locked: "Locked", align: "Alignment", left: "Left", center: "Center", right: "Right", tools: "Document tools", undo: "Undo", redo: "Redo", save: "Save changes", saved: "Local example saved.", name: "Display name", hint: "Enter the name shown on your profile.", required: "Enter a name.", settings: "Profile settings", quantity: "Seats", increase: "Increase seats", decrease: "Decrease seats", storage: "Storage used", city: "Search cities", empty: "No matching cities.", reset: "Reset", editing: "Unsaved changes", quiet: "Saved state" },
  ja: { open: "通知設定", title: "通知を調整", body: "重要な更新だけを受け取り、集中を保ちます。", close: "閉じる", discard: "下書きを削除", confirm: "下書きを削除しますか？", warning: "この操作は取り消せません。確認してから続行してください。", cancel: "戻る", done: "下書きを削除しました。", profile: "プロフィールを確認", person: "プロダクトデザイナー · ソウル", details: "詳細設定", detailBody: "初期設定を変更せずに追加の設定を表示します。", pin: "固定", locked: "無効", align: "配置", left: "左", center: "中央", right: "右", tools: "文書ツール", undo: "元に戻す", redo: "やり直す", save: "変更を保存", saved: "ローカル例を保存しました。", name: "表示名", hint: "プロフィールに表示する名前を入力してください。", required: "名前を入力してください。", settings: "プロフィール設定", quantity: "座席数", increase: "座席を増やす", decrease: "座席を減らす", storage: "ストレージ使用量", city: "都市を検索", empty: "一致する都市はありません。", reset: "リセット", editing: "未保存の変更", quiet: "保存済み" },
  zh: { open: "通知设置", title: "调整通知", body: "只接收重要更新，保持专注。", close: "关闭", discard: "删除草稿", confirm: "删除此草稿？", warning: "此操作无法撤销。请确认后继续。", cancel: "返回", done: "草稿已删除。", profile: "预览个人资料", person: "产品设计师 · 首尔", details: "高级设置", detailBody: "展开可选设置，不改变默认行为。", pin: "固定", locked: "不可用", align: "对齐", left: "左", center: "居中", right: "右", tools: "文档工具", undo: "撤销", redo: "重做", save: "保存更改", saved: "已保存本地示例。", name: "显示名称", hint: "输入个人资料中显示的名称。", required: "请输入名称。", settings: "个人资料设置", quantity: "座位数", increase: "增加座位", decrease: "减少座位", storage: "存储用量", city: "搜索城市", empty: "没有匹配的城市。", reset: "重置", editing: "未保存的更改", quiet: "已保存" },
} as const;
const cities = ["Busan", "London", "Seoul", "Tokyo"];

export function ExpandedComponentPreview({ slug, locale = "en" }: { slug: ExpandedSlug; locale?: PreviewLocale }) {
  const text = copy[locale];
  const id = React.useId();
  const [message, setMessage] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [alignment, setAlignment] = React.useState<string[]>(["left"]);
  const [name, setName] = React.useState("Alex");
  const [savedName, setSavedName] = React.useState("Alex");
  const nameField = <Field name="displayName"><FieldLabel>{text.name}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{text.hint}</FieldDescription><FieldError match="valueMissing">{text.required}</FieldError></Field>;
  switch (slug) {
    case "popover": return <Popover><PopoverTrigger render={<Button />}>{text.open}</PopoverTrigger><PopoverContent><PopoverTitle>{text.title}</PopoverTitle><PopoverDescription>{text.body}</PopoverDescription><PopoverClose render={<Button variant="primary" />}>{text.close}</PopoverClose></PopoverContent></Popover>;
    case "hover-card": return <HoverCard><HoverCardTrigger href="#profile-preview" className="inline-flex items-center gap-3 rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-3 font-semibold text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">{text.profile} <span aria-hidden="true">↗</span></HoverCardTrigger><HoverCardContent><strong id="profile-preview">Alex Kim</strong><p>{text.person}</p></HoverCardContent></HoverCard>;
    case "alert-dialog": return <div className="grid gap-3"><AlertDialog><AlertDialogTrigger render={<Button variant="destructive" />}>{text.discard}</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>{text.confirm}</AlertDialogTitle><AlertDialogDescription>{text.warning}</AlertDialogDescription><AlertDialogFooter><AlertDialogCancel>{text.cancel}</AlertDialogCancel><AlertDialogAction onClick={() => setMessage(text.done)}>{text.discard}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog><p role="status" className="text-sm text-[var(--muted-foreground)]">{message}</p></div>;
    case "sheet": return <Sheet><SheetTrigger render={<Button />}>{text.settings}</SheetTrigger><SheetContent closeLabel={text.close}><SheetTitle>{text.settings}</SheetTitle><SheetDescription>{text.hint}</SheetDescription>{nameField}<SheetClose render={<Button variant="primary" />}>{text.close}</SheetClose></SheetContent></Sheet>;
    case "collapsible": return <Collapsible open={expanded} onOpenChange={setExpanded}><CollapsibleTrigger>{text.details}<span aria-hidden="true">{expanded ? "−" : "+"}</span></CollapsibleTrigger><CollapsibleContent><div>{text.detailBody}</div></CollapsibleContent></Collapsible>;
    case "toggle": return <div className="flex flex-wrap gap-3"><Toggle aria-label={text.pin}><span aria-hidden="true">◆</span>{text.pin}</Toggle><Toggle defaultPressed>{text.pin}</Toggle><Toggle disabled>{text.locked}</Toggle></div>;
    case "toggle-group": return <div className="grid gap-3"><ToggleGroup aria-label={text.align} value={alignment} onValueChange={setAlignment}><ToggleGroupItem value="left">{text.left}</ToggleGroupItem><ToggleGroupItem value="center">{text.center}</ToggleGroupItem><ToggleGroupItem value="right">{text.right}</ToggleGroupItem></ToggleGroup><output className="text-sm text-[var(--muted-foreground)]">{alignment.map(value => text[value as "left" | "center" | "right"]).join(", ")}</output></div>;
    case "toolbar": return <div className="grid gap-3"><Toolbar aria-label={text.tools}><ToolbarGroup><ToolbarButton onClick={() => setMessage(text.undo)}>{text.undo}</ToolbarButton><ToolbarButton disabled>{text.redo}</ToolbarButton></ToolbarGroup><ToolbarSeparator /><ToolbarButton onClick={() => setMessage(text.saved)}>{text.save}</ToolbarButton></Toolbar><p role="status" className="text-sm text-[var(--muted-foreground)]">{message}</p></div>;
    case "field": return <div className="grid w-full max-w-sm gap-5">{nameField}<Field invalid><FieldLabel>{text.name}</FieldLabel><FieldControl defaultValue="" /><FieldError match>{text.required}</FieldError></Field></div>;
    case "fieldset": return <Fieldset className="w-full max-w-sm"><FieldsetLegend>{text.settings}</FieldsetLegend>{nameField}</Fieldset>;
    case "form": return <Form className="w-full max-w-sm" onFormSubmit={() => { setSavedName(name); setMessage(text.saved); }} onReset={() => { setName(savedName); setMessage(""); }}>
      {nameField}<div className="flex flex-wrap gap-3"><Button type="submit" variant="primary">{text.save}</Button><Button type="reset">{text.reset}</Button></div><p role="status" className="text-sm text-[var(--muted-foreground)]">{name !== savedName ? text.editing : message || text.quiet}</p>
    </Form>;
    case "number-field": return <NumberField id={id} defaultValue={3} min={1} max={8}><label htmlFor={id} className="text-sm font-semibold">{text.quantity}</label><NumberFieldGroup><NumberFieldDecrement aria-label={text.decrease} /><NumberFieldInput /><NumberFieldIncrement aria-label={text.increase} /></NumberFieldGroup></NumberField>;
    case "meter": return <Meter value={64} className="w-full max-w-sm"><div className="flex justify-between gap-4"><MeterLabel>{text.storage}</MeterLabel><MeterValue /></div><MeterTrack><MeterIndicator /></MeterTrack><p className="text-xs text-[var(--muted-foreground)]">64 GB / 100 GB</p></Meter>;
    case "combobox": return <div className="w-full max-w-sm"><Combobox items={cities}><ComboboxLabel>{text.city}</ComboboxLabel><ComboboxInput placeholder={text.city} /><ComboboxContent><ComboboxEmpty>{text.empty}</ComboboxEmpty><ComboboxList>{(city: string) => <ComboboxItem key={city} value={city}>{city}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></div>;
    case "command": return <div className="grid w-full max-w-sm gap-3"><Command><CommandInput placeholder={text.city} aria-label={text.city} /><CommandList><CommandEmpty>{text.empty}</CommandEmpty><CommandGroup heading={text.city}>{cities.map((city, index) => <CommandItem key={city} value={city} onSelect={() => setMessage(city)}>{city}<CommandShortcut>⌘{index + 1}</CommandShortcut></CommandItem>)}</CommandGroup></CommandList></Command><p role="status" className="text-sm text-[var(--muted-foreground)]">{message || text.quiet}</p></div>;
  }
}

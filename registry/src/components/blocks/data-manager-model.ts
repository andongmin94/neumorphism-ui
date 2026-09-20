export type RecordStatus = "draft" | "active" | "archived";
export type ManagedRecord = { id: string; title: string; owner: string; status: RecordStatus; dueDate: string };

// Date-only values stay in local calendar time when passed to DatePicker.
export function parseRecordDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : undefined;
}
export function formatRecordDate(value: Date | undefined): string {
  if (!value || !Number.isFinite(value.getTime())) return "";
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
}
export function upsertRecord(records: readonly ManagedRecord[], record: ManagedRecord): ManagedRecord[] {
  return records.some(item => item.id === record.id) ? records.map(item => item.id === record.id ? { ...record } : item) : [{ ...record }, ...records];
}
export function removeRecords(records: readonly ManagedRecord[], ids: readonly string[]): ManagedRecord[] {
  const selected = new Set(ids);
  return records.filter(record => !selected.has(record.id));
}
export const exampleRecords: ManagedRecord[] = [
  { id: "REC-101", title: "Website accessibility review", owner: "Mina", status: "active", dueDate: "2026-10-02" },
  { id: "REC-102", title: "Profile settings", owner: "Alex", status: "draft", dueDate: "2026-10-05" },
  { id: "REC-103", title: "Customer onboarding", owner: "Jun", status: "active", dueDate: "2026-10-08" },
  { id: "REC-104", title: "Notification preferences", owner: "Alex", status: "draft", dueDate: "2026-10-09" },
  { id: "REC-105", title: "Monthly product report", owner: "Mina", status: "active", dueDate: "2026-10-12" },
  { id: "REC-106", title: "Legacy welcome screen", owner: "Jun", status: "archived", dueDate: "2026-09-01" },
  { id: "REC-107", title: "Keyboard navigation audit", owner: "Jun", status: "active", dueDate: "2026-10-14" },
  { id: "REC-108", title: "Content planning", owner: "Mina", status: "draft", dueDate: "2026-10-15" },
  { id: "REC-109", title: "Release notes", owner: "Alex", status: "active", dueDate: "2026-10-20" },
  { id: "REC-110", title: "Archived campaign", owner: "Mina", status: "archived", dueDate: "2026-08-20" },
  { id: "REC-111", title: "Mobile layout polish", owner: "Jun", status: "draft", dueDate: "2026-10-21" },
  { id: "REC-112", title: "Support documentation", owner: "Alex", status: "active", dueDate: "2026-10-22" },
];

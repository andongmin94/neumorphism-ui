"use client";

import CalendarExample from "../examples/calendar";
import DatePickerExample from "../examples/date-picker";
import DataTableExample from "../examples/data-table";
import ToastExample from "../examples/toast";

import type { WorkflowSlug } from "./component-preview-slugs";
const previews = { calendar: CalendarExample, "date-picker": DatePickerExample, "data-table": DataTableExample, toast: ToastExample };
export function WorkflowComponentPreview({ slug, locale }: { slug: WorkflowSlug; locale?: "ko" | "en" | "ja" | "zh" }) {
  const Preview = previews[slug];
  return <Preview locale={locale} />;
}

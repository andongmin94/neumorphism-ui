export const workflowSlugs = ["calendar", "date-picker", "data-table", "toast"] as const;
export type WorkflowSlug = (typeof workflowSlugs)[number];

export const expandedSlugs = ["alert-dialog", "popover", "hover-card", "sheet", "collapsible", "toggle", "toggle-group", "toolbar", "field", "fieldset", "form", "number-field", "meter", "combobox", "command", "context-menu", "drawer", "input-otp", "carousel", "resizable", "sidebar", "image-card", "marquee"] as const;
export type ExpandedSlug = (typeof expandedSlugs)[number];

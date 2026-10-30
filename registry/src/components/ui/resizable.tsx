/*
 * Portions adapted from shadcn/ui: https://github.com/shadcn-ui/ui
 *
 * MIT License
 *
 * Copyright (c) 2023 shadcn
 * Copyright (c) 2026 andongmin94
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use client";

import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Group>) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full min-w-0 overflow-hidden rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] [box-shadow:none]",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel(props: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle = false,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "group/resizable relative flex w-1 items-center justify-center bg-[var(--border)] outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2 focus-visible:ring-2 focus-visible:ring-[var(--ring)] aria-[orientation=horizontal]:h-1 aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:inset-x-0 aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:top-1/2 aria-[orientation=horizontal]:after:h-4 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:-translate-y-1/2 aria-[orientation=horizontal]:after:translate-x-0",
        className,
      )}
      {...props}
    >
      {withHandle ? (
        <span
          aria-hidden="true"
          className="z-10 grid min-h-8 min-w-5 group-aria-[orientation=horizontal]/resizable:rotate-90 place-items-center rounded-[var(--neu-radius-small)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-xs text-[var(--muted-foreground)] [box-shadow:var(--neu-shadow-raised-sm)]"
        >
          <svg aria-hidden="true" className="h-4 w-3" viewBox="0 0 12 16" fill="currentColor"><circle cx="4" cy="4" r="1" /><circle cx="8" cy="4" r="1" /><circle cx="4" cy="8" r="1" /><circle cx="8" cy="8" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="8" cy="12" r="1" /></svg>
        </span>
      ) : null}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };

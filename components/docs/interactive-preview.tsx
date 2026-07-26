"use client";

import { useState } from "react";
import { Button } from "@/registry/src/components/ui/button";
import { Input } from "@/registry/src/components/ui/input";

export function InteractivePreview() {
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  return (
    <div className="interactive-preview">
      <div className="preview-window-bar">
        <span className="preview-window-dot" />
        <span>Profile settings</span>
        <span className="preview-window-state">Live preview</span>
      </div>

      <div className="preview-profile-row">
        <span className="preview-avatar" aria-hidden="true">
          NM
        </span>
        <span>
          <strong>New member</strong>
          <small>Workspace profile</small>
        </span>
        <span className="preview-badge">Active</span>
      </div>

      <label className="preview-field">
        <span>Email</span>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <div className="preview-setting-row">
        <span>
          <strong>Notifications</strong>
          <small>Product updates and releases</small>
        </span>
        <button
          className="preview-switch"
          type="button"
          role="switch"
          aria-checked={notifications}
          aria-label="알림 받기"
          data-checked={notifications}
          onClick={() => setNotifications((current) => !current)}
        >
          <span />
        </button>
      </div>

      <div className="preview-actions">
        <Button variant="soft" type="button">
          취소
        </Button>
        <Button variant="primary" type="button" onClick={save}>
          {saved ? "저장됨 ✓" : "변경 저장"}
        </Button>
      </div>
    </div>
  );
}

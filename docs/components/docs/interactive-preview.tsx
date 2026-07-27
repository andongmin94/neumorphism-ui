"use client";

import { useState } from "react";

import { useLocale } from "@/i18n/locale-provider";
import { Button } from "@neumorphism-ui/registry/ui/button";
import { Input } from "@neumorphism-ui/registry/ui/input";

export function InteractivePreview() {
  const { messages } = useLocale();
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
        <span>Neumorphism UI</span>
        <span className="preview-window-state">
          {messages.common.preview}
        </span>
      </div>

      <div className="preview-profile-row">
        <span className="preview-avatar" aria-hidden="true">
          NM
        </span>
        <span>
          <strong>NVDA</strong>
          <small>{messages.preview.notificationsHint}</small>
        </span>
        <span className="preview-badge">+2.14%</span>
      </div>

      <label className="preview-field">
        <span>{messages.preview.email}</span>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <div className="preview-setting-row">
        <span>
          <strong>{messages.preview.notifications}</strong>
          <small>{messages.preview.notificationsHint}</small>
        </span>
        <button
          className="preview-switch"
          type="button"
          role="switch"
          aria-checked={notifications}
          aria-label={messages.preview.notificationLabel}
          data-checked={notifications}
          onClick={() => setNotifications((current) => !current)}
        >
          <span />
        </button>
      </div>

      <div className="preview-actions">
        <Button variant="soft" type="button">
          {messages.preview.cancel}
        </Button>
        <Button variant="primary" type="button" onClick={save}>
          {saved ? messages.preview.saved : messages.preview.save}
        </Button>
      </div>
    </div>
  );
}

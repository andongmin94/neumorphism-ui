"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
export default function Example() {
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("Alex");
  const [savedName, setSavedName] = React.useState("Alex");
  const nameField = <Field name="displayName"><FieldLabel>{"Display name"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{"Enter the name shown on your profile."}</FieldDescription><FieldError match="valueMissing">{"Enter a name."}</FieldError></Field>;
  return (<Form className="w-full max-w-sm" onFormSubmit={() => { setSavedName(name); setMessage("Local example saved."); }} onReset={() => { setName(savedName); setMessage(""); }}>
      {nameField}<div className="flex flex-wrap gap-3"><Button type="submit" variant="primary">{"Save changes"}</Button><Button type="reset">{"Reset"}</Button></div><p role="status" className="text-sm text-[var(--muted-foreground)]">{name !== savedName ? "Unsaved changes" : message || "Saved state"}</p>
    </Form>);
}

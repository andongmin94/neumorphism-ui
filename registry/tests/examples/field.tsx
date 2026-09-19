"use client";

import * as React from "react";
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field";
export default function Example() {
  const [name, setName] = React.useState("Alex");
  const nameField = <Field name="displayName"><FieldLabel>{"Display name"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{"Enter the name shown on your profile."}</FieldDescription><FieldError match="valueMissing">{"Enter a name."}</FieldError></Field>;
  return (<div className="grid w-full max-w-sm gap-5">{nameField}<Field invalid><FieldLabel>{"Display name"}</FieldLabel><FieldControl defaultValue="" /><FieldError match>{"Enter a name."}</FieldError></Field></div>);
}

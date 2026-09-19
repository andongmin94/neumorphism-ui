"use client";

import * as React from "react";
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field";
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset";
export default function Example() {
  const [name, setName] = React.useState("Alex");
  const nameField = <Field name="displayName"><FieldLabel>{"Display name"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{"Enter the name shown on your profile."}</FieldDescription><FieldError match="valueMissing">{"Enter a name."}</FieldError></Field>;
  return (<Fieldset className="w-full max-w-sm"><FieldsetLegend>{"Profile settings"}</FieldsetLegend>{nameField}</Fieldset>);
}

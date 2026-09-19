"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field";
export default function Example() {
  const [name, setName] = React.useState("Alex");
  const nameField = <Field name="displayName"><FieldLabel>{"Display name"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{"Enter the name shown on your profile."}</FieldDescription><FieldError match="valueMissing">{"Enter a name."}</FieldError></Field>;
  return (<Sheet><SheetTrigger render={<Button />}>{"Profile settings"}</SheetTrigger><SheetContent closeLabel={"Close"}><SheetTitle>{"Profile settings"}</SheetTitle><SheetDescription>{"Enter the name shown on your profile."}</SheetDescription>{nameField}<SheetClose render={<Button variant="primary" />}>{"Close"}</SheetClose></SheetContent></Sheet>);
}

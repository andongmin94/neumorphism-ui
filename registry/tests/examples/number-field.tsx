"use client";

import * as React from "react";
import { NumberField, NumberFieldGroup, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from "@/components/ui/number-field";
export default function Example() {
  const id = React.useId();
  return (<NumberField id={id} defaultValue={3} min={1} max={8}><label htmlFor={id} className="text-sm font-semibold">{"Seats"}</label><NumberFieldGroup><NumberFieldDecrement aria-label={"Decrease seats"} /><NumberFieldInput /><NumberFieldIncrement aria-label={"Increase seats"} /></NumberFieldGroup></NumberField>);
}

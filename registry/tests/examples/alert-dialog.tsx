"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
export default function Example() {
  const [message, setMessage] = React.useState("");
  return (<div className="grid gap-3"><AlertDialog><AlertDialogTrigger render={<Button variant="destructive" />}>{"Delete draft"}</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>{"Delete this draft?"}</AlertDialogTitle><AlertDialogDescription>{"This cannot be undone. Confirm explicitly to continue."}</AlertDialogDescription><AlertDialogFooter><AlertDialogCancel>{"Go back"}</AlertDialogCancel><AlertDialogAction onClick={() => setMessage("Draft deleted.")}>{"Delete draft"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog><p role="status" className="text-sm text-[var(--muted-foreground)]">{message}</p></div>);
}

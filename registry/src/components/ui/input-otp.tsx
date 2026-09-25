"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex max-w-full items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex min-w-0 items-center gap-2", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-[var(--neu-radius-control)] border border-[color:var(--input)] bg-[var(--neu-surface)] text-sm font-semibold text-[var(--foreground)] [box-shadow:var(--neu-shadow-inset-sm)] outline-none transition-[border-color,box-shadow] duration-[var(--neu-duration)] motion-reduce:transition-none data-[active=true]:z-10 data-[active=true]:border-[var(--ring)] data-[active=true]:ring-2 data-[active=true]:ring-[color:var(--ring)]/20 data-[active=true]:[box-shadow:var(--neu-shadow-raised-sm)]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-pulse bg-current motion-reduce:animate-none" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className={cn("flex items-center px-0.5 text-[var(--muted-foreground)]", className)}
      role="separator"
      {...props}
    >
      <span aria-hidden="true">•</span>
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

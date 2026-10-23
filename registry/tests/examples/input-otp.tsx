"use client";

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
export default function Example() {
    const locale = "en";
    const otpCopy = {
        "ko": "인증 코드",
        "en": "Verification code",
        "ja": "認証コード",
        "zh": "验证码"
    };
    return <div className="grid gap-3"><InputOTP maxLength={6} aria-label={otpCopy[locale]}><InputOTPGroup><InputOTPSlot index={0}/><InputOTPSlot index={1}/><InputOTPSlot index={2}/></InputOTPGroup><InputOTPSeparator /><InputOTPGroup><InputOTPSlot index={3}/><InputOTPSlot index={4}/><InputOTPSlot index={5}/></InputOTPGroup></InputOTP></div>;
}

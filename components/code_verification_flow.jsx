

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCcw } from "lucide-react";

export function CodeVerificationFlow({placeholder}) {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");

  const handleSendCode = () => {
    // שליחה אמורה לקרות כאן
    setStep(2);
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
    if (value.length === 6) {
      setStep(3); // בדיקה תיעשה בהמשך
    }
  };

  return (
    <div >
      {step === 1 && (
        <div className="flex w-[384px] h-[46px] px-[20px] py-[12px] justify-end items-center gap-[10px] flex-shrink-0 rounded-[6px] border border-[#DBDEDE] bg-white">
          <p className="text-sm">לשלוח לך קוד אימות {placeholder} זה?</p>
          <Button variant="outline" size="sm" onClick={handleSendCode} className="flex gap-1 items-center">
            שלח <ArrowLeft size={16} />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div >
          <Input
            value={code}
            onChange={handleCodeChange}
            placeholder="_ _ _ _ _ _ _"
            className="text-center tracking-[1em] font-bold text-yellow-500 w-[384px] h-[46px] px-[20px] py-[12px] justify-end items-center gap-[10px] flex-shrink-0 rounded-[6px] border border-[#DBDEDE] bg-white"
          />
        </div>
      )}

      {step === 3 && (
        <div className="flex w-[384px] h-[46px] px-[20px] py-[12px] justify-end items-center gap-[10px] flex-shrink-0 rounded-[6px] border border-[#DBDEDE] bg-white">
          <RefreshCcw className="text-gray-500" />
          <div className="flex gap-2 text-sm font-medium">
            {code.split("").map((digit, index) => (
              <span key={index} className={`w-4 text-center ${index === 5 ? "text-red-500 font-bold" : ""}`}>
                {digit}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { ArrowLeft, RefreshCcw } from "lucide-react";
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from "@heroicons/react/24/solid";
export function CodeVerificationFlow({ placeholder }) {
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
        <div className="flex  h-[40px] px-[20px] pr-[16px] py-[12px] justify-end items-center gap-[10px] flex-shrink-0 rounded-[6px] border border-[#DBDEDE] bg-white">
          <p className="text-right text-[16px] font-semibold leading-none text-[#000] font-[SimplerPro_HLAR]">
            לשלוח לך קוד אימות {placeholder} זה?
          </p>
          <Button
            onClick={handleSendCode}
            className="flex w-[100px] px-[2px] py-[2px] justify-center items-center gap-[4px] flex-shrink-0 rounded-full border-[1px] border-black text-black bg-white"
          >
            שלח
            <ArrowLeftIcon />
          </Button>
        </div>

      )}

      {step === 2 && (
        <div >
          <Input
            value={code}
            onChange={handleCodeChange}
            placeholder="_ _ _ _ _ _ _"
            className="text-center tracking-[1em] font-bold text-yellow-500 px-[20px] py-[12px] justify-end items-center gap-[10px] flex-shrink-0 rounded-[6px] border border-[#DBDEDE] bg-white"
          />
        </div>
      )}

      {step === 3 && (
        <div className="flex px-[18px] py-[8px] justify-between gap-[10px] flex-shrink-0 rounded-[6px] border border-[#DBDEDE] bg-white">

          <div className="flex gap-2 text-sm font-medium">
            {code.split("").map((digit, index) => (
              <span key={index} className={`w-4 text-right ${index === 5 ? "text-red-500 font-bold" : ""}`}>
                {digit}
              </span>

            ))}
          </div>
          <ArrowPathIcon
            className="text-gray-500 w-[20px] h-[20px]" />
        </div>
      )}
    </div>
  );
}

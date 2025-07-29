import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
// import { ArrowLeft, RefreshCcw } from "lucide-react";
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
export function CodeVerificationFlow({ placeholder }) {
  const [step, setStep] = useState(1)
  const [code, setCode] = useState('')

  const handleSendCode = () => {
    // שליחה אמורה לקרות כאן
    setStep(2)
  }

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)
    if (value.length === 6) {
      setStep(3) // בדיקה תיעשה בהמשך
    }
  }

  return (
    <div>
      {step === 1 && (
        <div className="flex h-[40px] flex-shrink-0 items-center justify-end gap-[10px] rounded-[6px] border border-[#DBDEDE] bg-white px-[20px] py-[12px] pr-[16px]">
          <p className="text-right font-[SimplerPro_HLAR] text-[16px] leading-none font-semibold text-[#000]">
            לשלוח לך קוד אימות {placeholder} זה?
          </p>
          <Button
            onClick={handleSendCode}
            className="flex w-[100px] flex-shrink-0 items-center justify-center gap-[4px] rounded-full border-[1px] border-black bg-white px-[2px] py-[2px] text-black"
          >
            שלח
            <ArrowLeftIcon />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div>
          <Input
            value={code}
            onChange={handleCodeChange}
            placeholder="_ _ _ _ _ _ _"
            className="flex-shrink-0 items-center justify-end gap-[10px] rounded-[6px] border border-[#DBDEDE] bg-white px-[20px] py-[12px] text-center font-bold tracking-[1em] text-yellow-500"
          />
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-shrink-0 justify-between gap-[10px] rounded-[6px] border border-[#DBDEDE] bg-white px-[18px] py-[8px]">
          <div className="flex gap-2 text-sm font-medium">
            {code.split('').map((digit, index) => (
              <span key={index} className={`w-4 text-right ${index === 5 ? 'font-bold text-red-500' : ''}`}>
                {digit}
              </span>
            ))}
          </div>
          <ArrowPathIcon className="h-[20px] w-[20px] text-gray-500" />
        </div>
      )}
    </div>
  )
}

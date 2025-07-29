import { EnvelopeIcon, GlobeAltIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function AlertSuccess({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/2 shadow-[4px_4px_160.2px_0px_rgba(0,0,0,0.06)] backdrop-blur-sm backdrop-saturate-100">
      <div className="flex h-[400px] w-[800px] flex-col items-center justify-between rounded-[40px] bg-white p-10 text-right shadow-[4px_4px_160.2px_rgba(0,0,0,0.0)]">
        <div className="mt-2 flex items-center justify-center gap-[10px]">
          <img src="/images/control.svg" alt="לוגו קונטרול" width={300} />
        </div>

        <span className="text-4xl font-bold text-[#F8BD03]">הטופס נשלח בהצלחה!</span>

        <div className="max-w-[900px] text-center text-[18px] leading-[1.5] text-black">
          <p className="font-bold">ברכות! השלמת בהצלחה את תהליך ההרשמה כמשווק רשמי של יוסי תקשורת.</p>
          <p>אישור ההצטרפות יישלח אליך בימים הקרובים. אנו מאחלים לך הצלחה גדולה!</p>
          <p>מקווים להיות פרטנרים מוצלחים לקשר ארוך של שיתוף פעולה מועיל לשני הצדדים.</p>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full items-center justify-between px-15">
            <img src="/images/logo.svg" alt="לוגו קונטרול" width={150} height={40} className="object-contain" />
            <div className="flex gap-6">
              <div className="flex items-center justify-center">
                <PhoneIcon className="h-6 w-6 text-black" />
              </div>

              <a
                href="https://yossi-tikshoret.co.il"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <GlobeAltIcon className="h-6 w-6 text-black" />
              </a>

              <div className="flex items-center justify-center">
                <EnvelopeIcon className="h-6 w-6 text-black" />
              </div>

              <a
                href="https://www.google.com/maps/place/%D7%90%D7%93%D7%95%D7%A8%D7%99%D7%99%D7%9D+235,+%D7%A7%D7%A8%D7%99%D7%AA+%D7%92%D7%AA%E2%80%AD/@31.6019205,34.7585251,17z/data=!4m5!3m4!1s0x150291744c424c1f:0xe8bbfbd167ffab52!8m2!3d31.601916!4d34.7559502?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <MapPinIcon className="h-6 w-6 text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

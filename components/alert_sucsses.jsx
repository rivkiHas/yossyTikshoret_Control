import React from 'react';
import Image from 'next/image';
import { GlobeAltIcon, MapPinIcon, PhoneIcon ,EnvelopeIcon} from '@heroicons/react/24/outline';
export default function AlertSuccess({ onClose }) {
    return (
        <div className="fixed inset-0 bg-[#DBDEDE] bg-opacity-50 z-50 flex items-center justify-center">
            <div className="flex flex-col justify-between items-center text-right w-[800px] h-[400px] p-10 rounded-[40px] bg-white shadow-[4px_4px_160.2px_rgba(0,0,0,0.0)]">

                <div className="flex items-center justify-center gap-[10px] mt-2">
                    <img src="/images/control.svg" alt="לוגו קונטרול" width={300} />
                </div>

                <span className="text-4xl font-bold text-[#F8BD03]">הטופס נשלח בהצלחה!</span>

                <div className="text-center text-[18px] leading-[1.8] text-black max-w-[900px]">
                    <p className="font-bold">ברכות! השלמת בהצלחה את תהליך ההרשמה כמשווק רשמי של יוסי תקשורת.</p>
                    <p>אישור ההצטרפות יישלח אליך בימים הקרובים. אנו מאחלים לך הצלחה גדולה!</p>
                    <p>מקווים להיות פרטנרים מוצלחים לקשר ארוך של שיתוף פעולה מועיל לשני הצדדים.</p>
                </div>
                <div className="flex flex-col items-center gap-6 w-full">
                    <div className="flex justify-between items-center w-full px-15">
                        <img src="/images/logo.svg" alt="לוגו קונטרול" width={150} height={40} className="object-contain" />
                        <div className="flex gap-6">
                            {[PhoneIcon, GlobeAltIcon, EnvelopeIcon, MapPinIcon].map((Icon, index) => (
                                <div key={index} className="flex justify-center items-center  ">
                                    <Icon className="w-6 h-6 text-black" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

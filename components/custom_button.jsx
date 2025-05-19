"use client"

import { Button } from "./ui/button"

export function CustomButton({ item, selected, handleSelect }) {
    if (!item) return null;

    return (
        <Button
            onClick={() => handleSelect(item.value)}
            className={`
                relative w-[200px] h-[119px] rounded-[40px] overflow-hidden cursor-pointer transition-all duration-300
                bg-cover bg-center shadow-md
                ${selected ? "border-2 border-yellow-400" : "border-2 border-transparent"}
            `}
       
        >
            <img src="/images/AlbedoBase_XL_A_clean_modern_illustration_of_a_business_profes_2.jgp" alt="לוגו קונטרול" width={300} />

            <div className="absolute bottom-[14px] left-[16px] bg-white rounded-[30px] text-[16px] px-4 py-2 shadow-sm">
                {item.label}
            </div>
        </Button >
    );
}

export function CustomButtonRectangle({ item, selected, handleSelect }) {
    if (!item) return null;

    return (
        <div
            onClick={() => handleSelect(item.value)}
            className={`
                relative flex h-[70px] w-full justify-start items-center rounded-full cursor-pointer transition-all duration-300 
                shadow-md bg-cover bg-center
                ${selected ? 'border-2 border-yellow-400' : 'border-2 border-transparent'}
            `}
            // style={{ backgroundImage: `url(${item.image})`, aspectRatio: '368 / 62' }}
            style={{ background: 'grey', aspectRatio: '368 / 62' }}
        >
            <div className="absolute bottom-[14px] left-[16px] bg-white px-4 py-2 rounded-[20px] text-[16px] shadow-sm">
                {item.label}
            </div>
        </div>
    );
}
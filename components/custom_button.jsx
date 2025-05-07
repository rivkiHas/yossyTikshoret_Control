"use client"

import { Button } from "./ui/button"

export function CustomButton({ item, selected, handleSelect }) {
    if (!item) return null;

    return (
        <Button
            onClick={() => handleSelect(item.value)}
            className={`
                relative w-[170px] h-[109px] rounded-[30px] overflow-hidden cursor-pointer transition-all duration-300
                bg-cover bg-center shadow-md
                ${selected ? "border-2 border-yellow-400" : "border-2 border-transparent"}
            `}
            style={{ backgroundImage: `url(${item.image})` }}
        >
            <div className="absolute bottom-[14px] left-[16px] bg-white rounded-[15px] text-[16px] px-4 py-2 shadow-sm">
                {item.label}
            </div>
        </Button>
    );
}

export function CustomButtonRectangle({ item, selected, handleSelect }) {
    if (!item) return null;

    return (
        <div
            onClick={() => handleSelect(item.value)}
            className={`
                relative flex h-[62px] w-full justify-start items-center rounded-full cursor-pointer transition-all duration-300 
                shadow-md bg-cover bg-center
                ${selected ? 'border-2 border-yellow-400' : 'border-2 border-transparent'}
            `}
            style={{ backgroundImage: `url(${item.image})`, aspectRatio: '368 / 62' }}
        >
            <div className="absolute bottom-[14px] left-[16px] bg-white px-4 py-2 rounded-[20px] text-[16px] shadow-sm">
                {item.label}
            </div>
        </div>
    );
}
"use client"


export function CustomButton({ item, selected, handleSelect }) {
    if (!item) return null;

    return (
        <button
            onClick={() => handleSelect(item.value)}
            className={`
                relative w-[200px] h-[119px] rounded-[40px] overflow-hidden cursor-pointer transition-all duration-300
                bg-cover bg-center shadow-md cursor-pointer
                ${selected ? "border-2 border-yellow-400" : "border-2 border-transparent"}
            `}

        >
            <img src={item.image} alt={item.label} className="w-full h-full object-cover absolute top-0 left-0" />
            <div className="absolute bottom-[14px] left-[16px] bg-white rounded-[30px] text-[16px] px-4 py-2 shadow-sm">
                {item.label}
            </div>
        </button >
    );
}

export function CustomButtonRectangle({ item, selected, handleSelect }) {
    if (!item) return null;

    return (
        <button
            onClick={() => handleSelect(item.value)}
            className={`
                relative flex h-[70px] w-full justify-start items-center rounded-full cursor-pointer transition-all duration-300 
                shadow-md bg-cover bg-center cursor-pointer
                ${selected ? 'border-2 border-yellow-400' : 'border-2 border-transparent'}
            `}

            style={{ background: 'grey', aspectRatio: '368 / 62' }}
        >
            <img src={item.image} alt={item.label} className="w-full h-full object-cover absolute top-0 left-0" />

            <div className="absolute bottom-[14px] left-[16px] bg-white px-4 py-2 rounded-[20px] text-[16px] shadow-sm">
                {item.label}
            </div>
        </button>
    );
}
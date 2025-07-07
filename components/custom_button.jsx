"use client"


export function CustomButton({ item, selected, handleSelect }) {
    if (!item) return null;

    return (
        <button
            onClick={() => handleSelect(item.value)}
            className={`
                relative overflow-hidden cursor-pointer transition-all duration-300 shadow-md bg-cover bg-center
                border-2 ${selected ? "border-yellow-400" : "border-transparent"}

                flex w-full h-[70px] justify-start items-center rounded-full

                lg:w-[200px] lg:h-[119px] lg:rounded-[40px] lg:block
            `}
        >
            <img
                src={item.image}
                alt={item.label}
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div
                className={`
                    absolute bg-white text-[16px] shadow-sm px-4 py-2
                    rounded-[20px] bottom-[14px] left-[16px]

                    lg:rounded-[30px]
                `}
            >
                {item.label}
            </div>
        </button>
    );
}


export function CustomButtonRectangle({ item, selected, handleSelect }) {
    if (!item) return null;

    return (
        <button
            onClick={() => handleSelect(item.value)}
            className={`
                relative flex h-[70px] w-full justify-start items-center rounded-full cursor-pointer transition-all duration-300 
                shadow-md bg-cover bg-center 
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
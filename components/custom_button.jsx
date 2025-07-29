'use client'

export function CustomButton({ item, selected, handleSelect }) {
  if (!item) return null

  return (
    <button
      onClick={() => handleSelect(item.value)}
      className={`relative cursor-pointer overflow-hidden border-2 bg-cover bg-center shadow-md transition-all duration-300 ${selected ? 'border-yellow-400' : 'border-transparent'} flex h-[70px] w-full items-center justify-start rounded-full lg:block lg:h-[119px] lg:w-[200px] lg:rounded-[40px]`}
    >
      <img src={item.image} alt={item.label} className="absolute top-0 left-0 h-full w-full object-cover" />
      <div
        className={`absolute bottom-[14px] left-[16px] rounded-[20px] bg-white px-4 py-2 text-[16px] shadow-sm lg:rounded-[30px]`}
      >
        {item.label}
      </div>
    </button>
  )
}

export function CustomButtonRectangle({ item, selected, handleSelect }) {
  if (!item) return null

  return (
    <button
      onClick={() => handleSelect(item.value)}
      className={`relative flex h-[70px] w-full cursor-pointer items-center justify-start overflow-hidden rounded-full bg-cover bg-center shadow-md transition-all duration-300 ${selected ? 'border-2 border-yellow-400' : 'border-2 border-transparent'} `}
      style={{ aspectRatio: '368 / 62' }}
    >
      <img src={item.image} alt={item.label} className="absolute top-0 left-0 h-full w-full object-cover" />

      <div className="absolute bottom-[14px] left-[16px] rounded-[20px] bg-white px-4 py-2 text-[16px] shadow-sm">
        {item.label}
      </div>
    </button>
  )
}

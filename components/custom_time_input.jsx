import { useEffect, useMemo, useRef, useState } from 'react'

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="#4C585B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CustomTimeInput = ({ value, onChange, disabled, placeholder = '00:00', error }) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  const timeOptions = useMemo(() => {
    const options = []
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, '0')
        const minute = m.toString().padStart(2, '0')
        options.push(`${hour}:${minute}`)
      }
    }
    return options
  }, [])

  const filteredOptions = useMemo(() => {
    if (timeOptions.includes(value)) return timeOptions
    if (!value) return timeOptions
    return timeOptions.filter((time) => time.startsWith(value))
  }, [value, timeOptions])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [wrapperRef])

  const handleSelect = (time) => {
    onChange({ target: { value: time } })
    setIsOpen(false)
  }

  const handleBlur = () => {
    setTimeout(() => {
      if (!isOpen) {
        if (timeOptions.includes(value)) return
        const finalFiltered = timeOptions.filter((time) => time.startsWith(value))
        if (finalFiltered.length > 0) {
          onChange({ target: { value: finalFiltered[0] } })
        } else {
          onChange({ target: { value: '' } })
        }
      }
    }, 150)
  }

  return (
    <div className="relative w-[100px]" ref={wrapperRef} dir="rtl">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        className={`h-[46px] w-full rounded-[6px] border bg-white pr-4 pl-10 text-right text-[16px] leading-[24px] font-[400] text-[#4C585B] focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
          error ? 'border-red-500 focus:ring-red-400' : 'border-[#DBDEDE] focus:ring-blue-400'
        }`}
      />

      <div
        className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer"
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <ChevronDownIcon />
      </div>

      {isOpen && !disabled && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-[6px] border border-[#DBDEDE] bg-white shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((time) => (
              <li
                key={time}
                onMouseDown={() => handleSelect(time)}
                className="flex h-[46px] cursor-pointer items-center justify-end gap-2.5 self-stretch py-3 pr-4 pl-5 text-[16px] leading-[24px] text-[#4C585B] hover:bg-gray-100"
              >
                {time}
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-right">אין תוצאות</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default CustomTimeInput

"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const TimeInput = ({ value, onChange, disabled, placeholder = "בחר שעה" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value || '');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Generate time options in half-hour intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onChange({ target: { value: time } });
    setIsOpen(false);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const displayValue = selectedTime || placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input Field */}
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className={`
          flex w-[124px] h-[46px] px-[20px] pr-[16px] py-[12px] 
          justify-end items-center gap-[10px] flex-shrink-0
          border border-[#DBDEDE] rounded-[6px] bg-white cursor-pointer
          transition-colors duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}
          ${isOpen ? 'border-[#F8BD00]' : ''}
        `}
      >
        <span
          className={`
            text-right font-[SimplerPro_HLAR] text-[16px] font-normal leading-[24px]
            ${selectedTime ? 'text-[#9CA3AF]' : 'text-[#9CA3AF]'}
          `}
        >
          {displayValue}
        </span>
        <ChevronDownIcon 
          className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-[#DBDEDE] rounded-[6px] shadow-lg max-h-[200px] overflow-y-auto">
          {timeOptions.map((time) => (
            <div
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`
                px-[20px] py-[8px] cursor-pointer transition-colors duration-150
                text-right font-[SimplerPro_HLAR] text-[16px] font-normal leading-[24px]
                text-[#9CA3AF] hover:bg-[#FEF8E5] hover:text-[#F8BD00]
                ${selectedTime === time ? 'bg-[#FEF8E5] text-[#F8BD00]' : ''}
              `}
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { TimeInput };
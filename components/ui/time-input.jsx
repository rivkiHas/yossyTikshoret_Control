"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const TimeInput = ({ value, onChange, disabled, placeholder = "בחר שעה", hasError = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value || '');
  const [inputValue, setInputValue] = useState(value || '');
  const [isTyping, setIsTyping] = useState(false);
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

  // Update internal state when value prop changes
  useEffect(() => {
    if (value !== selectedTime) {
      setSelectedTime(value || '');
      setInputValue(value || '');
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsTyping(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Validate time format (HH:MM)
  const isValidTimeFormat = (time) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  // Format time to HH:MM
  const formatTime = (time) => {
    if (!time) return '';
    
    // Remove any non-digit characters except colon
    let cleaned = time.replace(/[^\d:]/g, '');
    
    // Handle different input patterns
    if (cleaned.length === 1 || cleaned.length === 2) {
      // Just hours entered
      const hours = parseInt(cleaned);
      if (hours >= 0 && hours <= 23) {
        return `${hours.toString().padStart(2, '0')}:00`;
      }
    } else if (cleaned.length === 3 && !cleaned.includes(':')) {
      // HMM format (e.g., "930" -> "09:30")
      const hours = parseInt(cleaned.substring(0, 1));
      const minutes = parseInt(cleaned.substring(1, 3));
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    } else if (cleaned.length === 4 && !cleaned.includes(':')) {
      // HHMM format (e.g., "0930" -> "09:30")
      const hours = parseInt(cleaned.substring(0, 2));
      const minutes = parseInt(cleaned.substring(2, 4));
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    } else if (cleaned.includes(':')) {
      // Already has colon, validate format
      const parts = cleaned.split(':');
      if (parts.length === 2) {
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
      }
    }
    
    return cleaned; // Return as-is if can't format
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setInputValue(time);
    onChange({ target: { value: time } });
    setIsOpen(false);
    setIsTyping(false);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
      setIsTyping(true);
      // Focus the input for typing
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsTyping(true);
    
    // Try to format the input
    const formatted = formatTime(newValue);
    
    // If it's a valid time format, update the parent
    if (isValidTimeFormat(formatted)) {
      setSelectedTime(formatted);
      onChange({ target: { value: formatted } });
    }
  };

  const handleInputBlur = () => {
    // When user finishes typing, try to format and validate
    const formatted = formatTime(inputValue);
    
    if (isValidTimeFormat(formatted)) {
      setSelectedTime(formatted);
      setInputValue(formatted);
      onChange({ target: { value: formatted } });
    } else if (inputValue.trim() === '') {
      // If empty, clear everything
      setSelectedTime('');
      setInputValue('');
      onChange({ target: { value: '' } });
    } else {
      // If invalid, revert to last valid value
      setInputValue(selectedTime);
    }
    
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur();
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setInputValue(selectedTime);
      setIsOpen(false);
      setIsTyping(false);
    }
  };

  const displayValue = inputValue || placeholder;
  const showPlaceholder = !inputValue && !isTyping;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input Field */}
      <div
        className={`
          flex w-[124px] h-[46px] px-[20px] pr-[16px] py-[12px] 
          justify-end items-center gap-[10px] flex-shrink-0
          border rounded-[6px] bg-white cursor-pointer
          transition-colors duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}
          ${isOpen ? 'border-[#F8BD00]' : hasError ? 'border-red-500' : 'border-[#DBDEDE]'}
        `}
        onClick={handleInputClick}
      >
        <input
          ref={inputRef}
          type="text"
          value={isTyping ? inputValue : (selectedTime || '')}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={showPlaceholder ? placeholder : ''}
          className={`
            w-full bg-transparent border-none outline-none text-right 
            font-[SimplerPro_HLAR] text-[16px] font-normal leading-[24px]
            text-[#9CA3AF] placeholder-[#9CA3AF]
            ${disabled ? 'cursor-not-allowed' : 'cursor-text'}
          `}
          style={{ direction: 'ltr', textAlign: 'right' }}
        />
        <ChevronDownIcon 
          className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-200 flex-shrink-0 ${
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
'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBrunchDetails } from '../store/brunch_store';
import { Switch } from "@/components/ui/switch";
import { Typography } from './typhography';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { useFormikContext } from 'formik';
import TooltipValid from './tooltip_valid';
import { TimeInput } from './ui/time-input';

const HoursOpen = ({ typeMarketer }) => {
  const dispatch = useDispatch();
  const formik = useFormikContext();
  const [isGrouped, setIsGrouped] = useState(false);
  const [hover, setHover] = useState(-1);
  // Default to limited hours (switch OFF = limited, switch ON = extended)
  const [isExtendedHours, setIsExtendedHours] = useState(false);
  const [timeErrors, setTimeErrors] = useState({});
  const brunches = useSelector((state) => state.brunch.brunches);
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch);
  const brunch = brunches.find((b) => b.id === activeBrunch) || null;
  const [localHoursOpen, setLocalHoursOpen] = useState([]);

  // Get current branch index for validation
  const currentBranchIndex = brunches.findIndex(b => b.id === activeBrunch);
  const hoursFieldName = `brunches.${currentBranchIndex}.hoursOpen`;

  useEffect(() => {
    if (brunch?.hoursOpen) {
      setLocalHoursOpen(JSON.parse(JSON.stringify(brunch.hoursOpen)));
    }
  }, [brunch]);

  // Convert time string to minutes for comparison
  const timeToMinutes = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Validate time ranges
  const validateTimeRange = (openTime, closeTime, dayIndex, period) => {
    if (!openTime || !closeTime) return null;
    
    const openMinutes = timeToMinutes(openTime);
    const closeMinutes = timeToMinutes(closeTime);
    
    if (openMinutes >= closeMinutes) {
      return 'שעת הפתיחה חייבת להיות לפני שעת הסגירה';
    }
    
    return null;
  };

  // Validate all time ranges and update errors
  const validateAllTimes = (hours) => {
    const errors = {};
    
    hours.forEach((day, dayIndex) => {
      if (day) {
        // Validate morning hours
        if (day.morning?.open && day.morning?.close) {
          const morningError = validateTimeRange(day.morning.open, day.morning.close, dayIndex, 'morning');
          if (morningError) {
            errors[`${dayIndex}-morning`] = morningError;
          }
        }
        
        // Validate evening hours
        if (day.evening?.open && day.evening?.close) {
          const eveningError = validateTimeRange(day.evening.open, day.evening.close, dayIndex, 'evening');
          if (eveningError) {
            errors[`${dayIndex}-evening`] = eveningError;
          }
        }
        
        // Validate that morning close is before evening open (if both exist)
        if (day.morning?.close && day.evening?.open) {
          const morningCloseMinutes = timeToMinutes(day.morning.close);
          const eveningOpenMinutes = timeToMinutes(day.evening.open);
          
          if (morningCloseMinutes >= eveningOpenMinutes) {
            errors[`${dayIndex}-overlap`] = 'שעת סגירת הבוקר חייבת להיות לפני שעת פתיחת הערב';
          }
        }
      }
    });
    
    setTimeErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (day, period, type, value, index) => {
    if (index === undefined || index === null) {
      console.warn("index לא מוגדר ב-handleChange");
      return;
    }

    let updatedHours = [...localHoursOpen];

    if (isGrouped) {
      const daysToUpdate = [1, 2, 3, 4, 5];

      daysToUpdate.forEach((dayIndex) => {
        if (!updatedHours[dayIndex]) updatedHours[dayIndex] = { morning: {}, evening: {} };
        if (!updatedHours[dayIndex][period]) updatedHours[dayIndex][period] = {};
        updatedHours[dayIndex][period][type] = value;
      });

    } else {
      if (!updatedHours[index]) updatedHours[index] = { morning: {}, evening: {} };
      if (!updatedHours[index][period]) updatedHours[index][period] = {};
      updatedHours[index][period][type] = value;
    }

    setLocalHoursOpen(updatedHours);

    // Validate times after update
    validateAllTimes(updatedHours);

    if (brunch) {
      dispatch(updateBrunchDetails({
        id: brunch.id,
        hoursOpen: updatedHours,
      }));
      
      // Update Formik
      formik.setFieldValue(hoursFieldName, updatedHours);
      formik.setFieldTouched(hoursFieldName, true);
    }
  };

  const handleSwitchChange = (checked) => {
    setIsExtendedHours(checked);
  };

  // Validate if at least one day has complete hours
  const validateHours = () => {
    if (!localHoursOpen || localHoursOpen.length === 0) return false;
    
    return localHoursOpen.some(day => {
      if (!day) return false;
      
      const morningValid = day.morning?.open && day.morning?.close;
      const eveningValid = day.evening?.open && day.evening?.close;
      
      return morningValid || eveningValid;
    });
  };

  const hasValidHours = validateHours();
  const hasTimeErrors = Object.keys(timeErrors).length > 0;
  const hoursError = formik.touched.brunches?.[currentBranchIndex]?.hoursOpen && 
                    (!hasValidHours || hasTimeErrors) && 
                    (hasTimeErrors ? "יש שגיאות בשעות הפתיחה" : "יש להגדיר לפחות שעות פתיחה ליום אחד");

  return (
    <div className="h-full flex flex-col p-4 bg-white rounded-[40px]">
      <div className="flex flex-row justify-between mb-4">
        <div className="relative">
          <Typography className='text-2xl font-bold'>
            {typeMarketer === "סוכן" ? "שעות זמינות  " : "שעות פתיחה "}
          </Typography>
          {hoursError && (
            <TooltipValid tooltipText={hoursError} className="top-8" />
          )}
        </div>
        <button
          onClick={() => setIsGrouped((prev) => !prev)}
          type="button"
          className="group flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FEF2CC] text-[#F8BD00] transition-[width] delay-1000 duration-100 ease-out hover:w-auto hover:rounded-3xl hover:px-3 hover:flex-row-reverse"
        >
          <span className="hidden group-hover:inline-block text-black text-base font-bold
             opacity-0 group-hover:opacity-100
             transition-opacity duration-300 ease-in-out
             delay-[1500ms]">עריכת שעות פתיחה</span>
          <PencilSquareIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4 bg-[#F4F4F4] rounded-4xl p-2 w-fit">
        <div dir="ltr" className="flex items-center gap-2 w-fit">
          <span className="text-sm text-[#111928] font-semibold">
            {isExtendedHours ? "שעות פתיחה מורחבות" : "שעות פתיחה מוגבלות"}
          </span>
          <Switch 
            checked={isExtendedHours} 
            onCheckedChange={handleSwitchChange} 
            className={'duration-300 cursor-pointer '} 
          />
        </div>
      </div>

      <div className="flex-1 relative">
        <div 
          className={`
            flex w-[490px] h-[646px] flex-col items-end gap-4
            ${hoursError ? 'border border-red-500 rounded-lg p-2' : ''}
          `}
          style={{
            display: 'flex',
            width: '490px',
            height: '646px',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '16px'
          }}
        >
          {isGrouped ? (
            <DayRow
              day="one"
              label="ימים א'-ה'"
              hours={localHoursOpen?.[1]}
              handleChange={handleChange}
              index={1}
              disabled={!isExtendedHours}
              timeErrors={timeErrors}
              isExtendedHours={isExtendedHours}
            />
          ) : (
            ["ראשון", "שני", "שלישי", "רביעי", "חמישי"].map((day, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHover(idx)}
                onMouseLeave={() => setHover(-1)}
              >
                <DayRow
                  day={day}
                  label={`יום ${day}`}
                  hours={localHoursOpen?.[idx + 1]}
                  handleChange={handleChange}
                  hover={hover === idx}
                  index={idx + 1}
                  disabled={!isExtendedHours}
                  timeErrors={timeErrors}
                  isExtendedHours={isExtendedHours}
                />
              </div>
            ))
          )}
          <DayRow
            day="שישי"
            label="יום ו'"
            hours={localHoursOpen?.[5]}
            handleChange={handleChange}
            index={5}
            disabled={!isExtendedHours}
            isFriday={true}
            timeErrors={timeErrors}
            isExtendedHours={isExtendedHours}
          />
        </div>
      </div>
    </div>
  );
};

const DayRow = ({ 
  day, 
  label, 
  hours, 
  handleChange, 
  hover, 
  index, 
  disabled, 
  isFriday = false, 
  timeErrors = {},
  isExtendedHours = false 
}) => {
  const [isEveningVisible, setIsEveningVisible] = useState(false);

  const toggleEvening = () => {
    if (isFriday || !isExtendedHours) return;
    setIsEveningVisible(prev => !prev);
  };

  // Get error messages for this day
  const morningError = timeErrors[`${index}-morning`];
  const eveningError = timeErrors[`${index}-evening`];
  const overlapError = timeErrors[`${index}-overlap`];

  return (
    <div className="w-full bg-white rounded-xl p-4 relative group border border-gray-200">
      {/* Main row - all elements in one line when collapsed */}
      <div className='flex flex-row justify-between items-center w-full'>
        {/* Day label */}
        <div className='flex flex-col items-end'>
          <Typography className="text-[24px] font-bold text-[#F8BD00] text-right">
            {label}
          </Typography>
        </div>

        {/* Time inputs and controls */}
        <div className="flex flex-row items-center gap-4">
          {/* Plus/Minus button for evening hours */}
          {!isFriday && isExtendedHours && (
            <button
              onClick={toggleEvening}
              disabled={disabled}
              className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
              {!isEveningVisible ? (
                <PlusCircleIcon className="h-[40px] w-[40px] fill-black text-white stroke-white hover:fill-[#F8BD00]" />
              ) : (
                <MinusCircleIcon className="h-[40px] w-[40px] fill-black text-white stroke-white hover:fill-[#F8BD00]" />
              )}
            </button>
          )}

          {/* Morning time inputs */}
          <div className="flex flex-row gap-3 items-center">
            <div className="flex flex-col gap-1 items-end">
              <label className="text-sm text-black text-right">שעת סגירה</label>
              <TimeInput
                value={hours?.morning?.close || ""}
                onChange={(e) => handleChange(day, "morning", "close", e.target.value, index)}
                disabled={disabled}
                placeholder="בחר שעה"
                hasError={morningError || overlapError}
              />
            </div>
            <div className="flex flex-col gap-1 items-end">
              <label className="text-sm text-black text-right">שעת פתיחה</label>
              <TimeInput
                value={hours?.morning?.open || ""}
                onChange={(e) => handleChange(day, "morning", "open", e.target.value, index)}
                disabled={disabled}
                placeholder="בחר שעה"
                hasError={morningError || overlapError}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Morning time error display */}
      {(morningError || overlapError) && (
        <div className="text-red-500 text-xs mt-2 text-right">
          {morningError || overlapError}
        </div>
      )}

      {/* Evening hours section - appears below when expanded */}
      {isEveningVisible && !isFriday && isExtendedHours && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {/* Evening label */}
          <div className="flex flex-col items-end mb-3">
            <Typography className="text-[20px] font-semibold text-[#F8BD00] text-right">
              שעות ערב
            </Typography>
          </div>

          {/* Evening time inputs */}
          <div className="flex flex-row justify-end items-center gap-4">
            <div className="flex flex-row gap-3 items-center">
              <div className="flex flex-col gap-1 items-end">
                <label className="text-sm text-black text-right">שעת סגירה</label>
                <TimeInput
                  value={hours?.evening?.close || ""}
                  onChange={(e) => handleChange(day, "evening", "close", e.target.value, index)}
                  disabled={disabled}
                  placeholder="בחר שעה"
                  hasError={eveningError}
                />
              </div>
              <div className="flex flex-col gap-1 items-end">
                <label className="text-sm text-black text-right">שעת פתיחה</label>
                <TimeInput
                  value={hours?.evening?.open || ""}
                  onChange={(e) => handleChange(day, "evening", "open", e.target.value, index)}
                  disabled={disabled}
                  placeholder="בחר שעה"
                  hasError={eveningError || overlapError}
                />
              </div>
            </div>
          </div>
          
          {/* Evening time error display */}
          {eveningError && (
            <div className="text-red-500 text-xs mt-2 text-right">
              {eveningError}
            </div>
          )}
        </div>
      )}

      {/* Disabled overlay for limited hours mode */}
      {!isExtendedHours && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
          <div className="bg-white/90 px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <Typography className="text-sm text-gray-600 text-center">
              הפעל שעות מורחבות לעריכה
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoursOpen;
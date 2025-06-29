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
  const [isSwitchOn, setIsSwitchOn] = useState(false);
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
    setIsSwitchOn(checked);
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
  const hoursError = formik.touched.brunches?.[currentBranchIndex]?.hoursOpen && 
                    !hasValidHours && 
                    "יש להגדיר לפחות שעות פתיחה ליום אחד";

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
          <span className="text-sm text-[#111928] font-semibold">שעות בתיאום מראש</span>
          <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} className={'duration-300 cursor-pointer '} />
        </div>
      </div>

      <div className="flex-1 relative">
        {isSwitchOn && (
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm backdrop-saturate-100 z-10 rounded-xl shadow-[4px_4px_160.2px_0px_rgba(0,0,0,0.06)]" />
        )}
        
        <div className={`h-full lg:max-h-[400px] lg:overflow-y-auto lg:scrollbar-custom overflow-visible flex flex-col text-[23px] font-semibold text-[#F8BD00] gap-2 ${
          hoursError ? 'border border-red-500 rounded-lg p-2' : ''
        }`}>
          {isGrouped ? (
            <DayRow
              day="one"
              label="ימים א'-ה'"
              hours={localHoursOpen?.[1]}
              handleChange={handleChange}
              index={1}
              disabled={isSwitchOn}
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
                  disabled={isSwitchOn}
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
            disabled={isSwitchOn}
            isFriday={true}
          />
        </div>
      </div>
    </div>
  );
};

const DayRow = ({ day, label, hours, handleChange, hover, index, disabled, isFriday = false }) => {
  const [isEveningVisible, setIsEveningVisible] = useState(false);

  const toggleEvening = () => {
    if (isFriday) return;
    setIsEveningVisible(prev => !prev);
  };

  return (
    <div className="flex-shrink-0 bg-white rounded-xl p-2 relative group">
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col'>
          <Typography className="text-[24px] font-bold text-[#F8BD00] mb-2 text-left">{label}</Typography>
          {isEveningVisible && <span className='text-sm text-black text-left'> בוקר</span>}
        </div>
        <div className="flex flex-row-reverse items-center justify-start gap-5 p-2 rounded-xl">
          {!isFriday && (
            <button
              onClick={toggleEvening}
              disabled={disabled}
              className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
              {!isEveningVisible ? (
                <PlusCircleIcon className="h-[40px] w-[40px] fill-black text-white stroke-white hover:fill-[#F8BD00]" />
              ) : <div className="h-[40px] w-[40px] text-black" />}
            </button>
          )}

          <div className={`flex flex-row gap-3 items-end ${isFriday ? 'ml-[60px]' : ''}`}>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת פתיחה</label>
              <TimeInput
                value={hours?.morning?.open || ""}
                onChange={(e) => handleChange(day, "morning", "open", e.target.value, index)}
                disabled={disabled}
                placeholder="בחר שעה"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת סגירה</label>
              <TimeInput
                value={hours?.morning?.close || ""}
                onChange={(e) => handleChange(day, "morning", "close", e.target.value, index)}
                disabled={disabled}
                placeholder="בחר שעה"
              />
            </div>
          </div>
        </div>
      </div>
      {isEveningVisible && !isFriday && (
        <div className="flex flex-row-reverse items-center justify-start gap-4 p-3 rounded-xl">
          <button
            onClick={toggleEvening}
            disabled={disabled}
            className="group cursor-pointer outline-none hover:rotate-90 duration-300"
          >
            <MinusCircleIcon className="h-[40px] w-[40px] fill-black text-white stroke-white hover:fill-[#F8BD00]" />
          </button>

          <div className='flex flex-row gap-3 items-end'>
            <div className='text-start p-3'>
              <span className='text-sm text-black'> ערב</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת סגירה</label>
              <TimeInput
                value={hours?.evening?.close || ""}
                onChange={(e) => handleChange(day, "evening", "close", e.target.value, index)}
                disabled={disabled}
                placeholder="בחר שעה"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת פתיחה</label>
              <TimeInput
                value={hours?.evening?.open || ""}
                onChange={(e) => handleChange(day, "evening", "open", e.target.value, index)}
                disabled={disabled}
                placeholder="בחר שעה"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoursOpen;
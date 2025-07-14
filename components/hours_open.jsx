'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBrunchDetails } from '../store/brunch_store';
import { Switch } from "@/components/ui/switch";
import { Typography } from './typhography';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import CustomTimeInput from './custom_time_input';
import { useFormikContext } from 'formik';
import { object } from 'yup';
import TooltipValid from './tooltip_valid';

const validateHours = (hoursData) => {
  const newErrors = {};

  hoursData.forEach((dayHours, index) => {
    if (!dayHours) return;

    const dayErrors = {};
    const { morning, evening } = dayHours;

    if (!morning?.open) {
      dayErrors.morning = { ...(dayErrors.morning || {}), open: "שעת פתיחה חובה" };
    }
    if (!morning?.close) {
      dayErrors.morning = { ...(dayErrors.morning || {}), close: "שעת סגירה חובה" };
    }

    if ((evening?.open && !evening?.close) || (!evening?.open && evening?.close)) {
      if (!evening?.open) {
        dayErrors.evening = { ...(dayErrors.evening || {}), open: "שעת פתיחה חובה" };
      }
      if (!evening?.close) {
        dayErrors.evening = { ...(dayErrors.evening || {}), close: "שעת סגירה חובה" };
      }
    }

    if (morning?.open && morning?.close && morning.open >= morning.close) {
      dayErrors.morning = {
        ...dayErrors.morning,
        open: "שעת פתיחה חייבת להיות לפני שעת סגירה",
        close: "שעת סגירה חייבת להיות אחרי שעת פתיחה"
      };
    }

    if (evening?.open && evening?.close && evening.open >= evening.close) {
      dayErrors.evening = {
        ...dayErrors.evening,
        open: "שעת פתיחה חייבת להיות לפני שעת סגירה",
        close: "שעת סגירה חייבת להיות אחרי שעת פתיחה"
      };
    }

    if (Object.keys(dayErrors).length > 0) {
      newErrors[index] = dayErrors;
    }
  });

  return newErrors;
};


const HoursOpen = ({ typeMarketer }) => {
  const dispatch = useDispatch();
  const [isGrouped, setIsGrouped] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const brunches = useSelector((state) => state.brunch.brunches);
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch);
  const brunch = brunches.find((b) => b.id === activeBrunch) || null;
  const [localHoursOpen, setLocalHoursOpen] = useState([]);
  const [errors, setErrors] = useState({});
  const formik = useFormikContext();

  useEffect(() => {

    const initialHours = Array.from({ length: 7 }, () => ({
      morning: { open: '', close: '' },
      evening: { open: '', close: '' }
    }));

    if (brunch?.hoursOpen) {
      const parsedHours = JSON.parse(JSON.stringify(brunch.hoursOpen));
      parsedHours.forEach((day, index) => {
        if (day) {
          initialHours[index] = { ...initialHours[index], ...day };
        }
      });
      setLocalHoursOpen(initialHours);
      setErrors(validateHours(initialHours));
    } else {
      setLocalHoursOpen(initialHours);
    }
  }, [brunch]);

  const handleChange = (day, period, type, value, index) => {
    if (index === undefined || index === null) return;

    let updatedHours = JSON.parse(JSON.stringify(localHoursOpen));

    if (!isGrouped && index === 1) {
      const daysToUpdate = [0, 1, 2, 3, 4, 5];
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

    const validationErrors = validateHours(updatedHours);
    setErrors(validationErrors);
    formik.setFieldValue(`brunches[${activeBrunch}].hoursOpen`, updatedHours);
    dispatch(updateBrunchDetails({
      id: brunch.id,
      hoursOpen: updatedHours,
    }));
  };



  const handleSwitchChange = (checked) => {
    setIsSwitchOn(checked);
  };

  return (
    <div className="h-full w-full flex flex-col bg-white rounded-[40px] ">
      {formik.touched?.brunches?.[activeBrunch]?.hoursOpen?.[1]?.morning?.open &&
        formik.errors?.brunches?.[activeBrunch]?.hoursOpen?.[1]?.morning?.open && (
          <TooltipValid message={formik.errors.brunches[activeBrunch].hoursOpen} />
        )}

      <div className="flex flex-row justify-between mb-4">
        <Typography className='text-2xl font-bold'>
          {typeMarketer === "agent" ? "שעות זמינות  " : "שעות פתיחה "}
        </Typography>
        <button
          onClick={() => setIsGrouped((prev) => !prev)}
          type="button"
          className="group flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FEF2CC] text-[#F8BD00] cursor-pointer delay-1000 transition-all duration-500 ease-out hover:w-auto hover:rounded-3xl hover:px-3 hover:flex-row-reverse"
        >
          <PencilSquareIcon className="w-5 h-5" />
          <span className="hidden group-hover:inline-block text-black text-base font-bold
             opacity-0 group-hover:opacity-100
             transition-opacity duration-300 ease-in-out
             delay-[1500ms]">{isGrouped ? " עריכת שעות פתיחה" : "  עריכת שעות פתיחה"}</span>

        </button>
      </div>

      <div className="mb-5 bg-[#F4F4F4] rounded-4xl p-2 w-fit">
        <div dir="ltr" className="flex items-center gap-2 w-fit">
          <span className="text-sm text-[#111928] font-semibold">שעות בתיאום מראש</span>
          <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} className={'duration-300 cursor-pointer '} />
        </div>
      </div>

      <div className="flex-1 relative">
        {isSwitchOn && (
          <div className="absolute inset-0 z-10 
            left-[30.16px] bottom-[0.989px] 
            bg-white/30 backdrop-blur-xs" />
        )}

        <div className="h-full lg:max-h-[400px] lg:overflow-y-auto lg:scrollbar-custom overflow-visible flex flex-col text-[22px] font-semibold text-[#F8BD00] ">
          {!isGrouped ? (
            <DayRow
              day="weekdays"
              label="ימים א'-ה'"
              hours={localHoursOpen?.[1]}
              errors={errors?.[1]}
              handleChange={handleChange}
              index={1}
              disabled={isSwitchOn}
            />
          ) : (
            ["ראשון", "שני", "שלישי", "רביעי", "חמישי"].map((day, idx) => (
              <div key={idx}>
                <DayRow
                  day={day}
                  label={`יום ${day}`}
                  hours={localHoursOpen?.[idx + 1]}
                  errors={errors?.[idx + 1]}
                  handleChange={handleChange}
                  index={idx + 1}
                  disabled={isSwitchOn}
                />
              </div>
            ))
          )}
          <DayRow
            day="שישי"
            label="יום שישי"
            hours={localHoursOpen?.[6]}
            errors={errors?.[6]}
            handleChange={handleChange}
            index={6}
            disabled={isSwitchOn}
            isFriday={true}
          />
        </div>
      </div>
    </div>
  );
};




const DayRow = ({ day, label, hours, handleChange, errors, index, disabled, isFriday = false, forceHideEvening = false }) => {
 const [isEveningVisible, setIsEveningVisible] = useState(false);

  const toggleEvening = () => {
  setIsEveningVisible((prev) => !prev);
};


  return (
    <div className="flex-shrink-0 bg-white rounded-xl relative group lg:w-full mb-4">
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col'>
          <Typography className="text-[24px] font-bold text-[#F8BD00] mb-2 text-left">{label}</Typography>
          {isEveningVisible && <span className='text-sm text-black text-left'> בוקר</span>}
        </div>
        <div className="flex flex-row-reverse items-center justify-start gap-5 rounded-xl">
          {!isFriday && (
            <button onClick={toggleEvening} disabled={disabled} className="group cursor-pointer outline-none hover:rotate-90 duration-300">
              {!isEveningVisible ? (
                <PlusCircleIcon className="h-[40px] w-[40px] fill-black text-white stroke-white hover:fill-[#F8BD00]" />
              ) : (
                <div className="h-[40px] w-[40px]" />
              )}
            </button>
          )}
          <div className={`flex flex-row gap-3 items-end ${isFriday ? 'ml-[60px]' : ''}`}>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת פתיחה</label>
              <InputTime
                value={hours?.morning?.open || ""}
                onChange={(e) => handleChange(day, "morning", "open", e.target.value, index)}
                disabled={disabled}
                error={errors?.morning?.open}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת סגירה</label>
              <InputTime
                value={hours?.morning?.close || ""}
                onChange={(e) => handleChange(day, "morning", "close", e.target.value, index)}
                disabled={disabled}
                error={errors?.morning?.close}
              />
            </div>
          </div>
        </div>
      </div>
      {isEveningVisible && !isFriday && (
        <div className="flex flex-row-reverse items-center justify-start gap-4 rounded-xl mt-2"> {/* Added margin-top */}
          <button onClick={toggleEvening} disabled={disabled} className="group cursor-pointer outline-none hover:rotate-90 duration-300">
            <MinusCircleIcon className="h-[40px] w-[40px] fill-black text-white stroke-white hover:fill-[#F8BD00]" />
          </button>

          <div className='flex flex-row gap-3 items-end'>
            <div className='text-start p-5 self-center'>
              <span className='text-sm text-black'>ערב</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת פתיחה</label>
              <InputTime
                value={hours?.evening?.open || ""}
                onChange={(e) => handleChange(day, "evening", "open", e.target.value, index)}
                disabled={disabled}
                error={errors?.evening?.open}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת סגירה</label>
              <InputTime
                value={hours?.evening?.close || ""}
                onChange={(e) => handleChange(day, "evening", "close", e.target.value, index)}
                disabled={disabled}
                error={errors?.evening?.close}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const InputTime = ({ onChange, value, disabled, error }) => (
  <div className="flex flex-col min-h-[70px]">
    <CustomTimeInput
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={error}
    />
  </div>
);

export default HoursOpen;



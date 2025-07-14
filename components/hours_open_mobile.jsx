'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBrunchDetails } from '@/store/brunch_store';
import { Switch } from "@/components/ui/switch";
import { Typography } from './typhography';
import { PencilSquareIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon as PlusCircleIconToButton } from '@heroicons/react/24/outline';

import CustomTimeInput from './custom_time_input';
import { Button } from "./ui/button";
import { AlertDialogEdit } from './alert_dialog_edit'
import { addBrunch, removeBrunch, setActiveBrunch } from "../store/brunch_store";
import { nextStep, prevStep, setActiveStep } from "../store/step_store";

const validateHours = (hoursData) => {
  const newErrors = {};

  hoursData.forEach((dayHours, index) => {
    if (!dayHours) return;

    const dayErrors = {};
    const { morning, evening } = dayHours;

    if (morning?.open && morning?.close && morning.open >= morning.close) {
      dayErrors.morning = {
        open: "שעת פתיחה חייבת להיות לפני שעת סגירה",
        close: "שעת סגירה חייבת להיות אחרי שעת פתיחה"
      };
    }

    if (evening?.open && evening?.close && evening.open >= evening.close) {
      dayErrors.evening = {
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

const HoursOpenMobile = ({ typeMarketer }) => {
  const dispatch = useDispatch();
  const [isGrouped, setIsGrouped] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const brunches = useSelector((state) => state.brunch.brunches);
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch);
  const brunch = brunches.find((b) => b.id === activeBrunch) || null;
  const [localHoursOpen, setLocalHoursOpen] = useState([]);
  const [errors, setErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');

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
    const validationErrors = validateHours(updatedHours);
    setErrors(validationErrors);

    if (brunch && Object.keys(validationErrors).length === 0) {
      dispatch(updateBrunchDetails({
        id: brunch.id,
        hoursOpen: updatedHours,
      }));
    }
  };

  const handleAddBranchClick = () => {
    setShowDialog(true);
  };
  const handleConfirmAddBranch = () => {
    const newId = Math.max(...brunches.map(b => b.id), 0) + 1;
    const newBrunch = {
      id: newId,
      name: newBranchName || `${brunches.length + 1}`,
      address: "",
      location: {
        lat: 32.0853,
        lng: 34.7818
      },
      hoursOpen: [
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } }
      ],
    };
    dispatch(addBrunch(newBrunch));
    dispatch(setActiveBrunch(newId));
    const newBrunchIndex = brunches.length;
    dispatch(setActiveStep(2 + newBrunchIndex));
    setShowDialog(false);
    setNewBranchName('');
  };

  const handleSwitchChange = (checked) => {
    setIsSwitchOn(checked);
  };

  return (
    <div className="h-full w-full flex flex-col bg-white rounded-[40px] p-6">
      <div className="flex flex-row justify-between mb-4">
        <Typography className="text-2xl font-bold">
          {typeMarketer === "agent" ? "שעות זמינות" : "שעות פתיחה"}
        </Typography>
        <button
          onClick={() => setIsGrouped((prev) => !prev)}
          type="button"
          className="group flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FEF2CC] text-[#F8BD00]"
        >
          <PencilSquareIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-5 bg-[#F4F4F4] rounded-4xl p-2 w-fit">
        <div dir="ltr" className="flex items-center gap-2 w-fit">
          <span className="text-sm text-[#111928] font-semibold">שעות בתיאום מראש</span>
          <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} className="duration-300 cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 relative">
        {isSwitchOn && (
 <div className="absolute inset-0 z-10 
            left-[30.16px] bottom-[0.989px] 
            bg-white/30 backdrop-blur-xs" />        )}
        <div className="h-full lg:max-h-[400px] lg:overflow-y-auto lg:scrollbar-custom flex flex-col text-[22px] font-semibold text-[#F8BD00]">
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
              <DayRow
                key={idx}
                day={day}
                label={`יום ${day}`}
                hours={localHoursOpen?.[idx + 1]}
                errors={errors?.[idx + 1]}
                handleChange={handleChange}
                index={idx + 1}
                disabled={isSwitchOn}
              />
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
      <Button
        onClick={handleAddBranchClick}
        className="cursor-pointer bg-black border hover:bg-white hover:text-black hover:border-black text-white p-5 gap-2 rounded-full"
      >
        <PlusCircleIconToButton className="w-5 h-5" />
        הוספת סניף נוסף
      </Button>
      <AlertDialogEdit
        open={showDialog}
        value={newBranchName}
        onChange={setNewBranchName}
        onConfirm={handleConfirmAddBranch}
        onCancel={() => setShowDialog(false)}
      />
    </div>
  );
};

const DayRow = ({ day, label, hours, handleChange, errors, index, disabled, isFriday = false }) => {
 const [isEveningVisible, setIsEveningVisible] = useState(false);

  const toggleEvening = () => {
  setIsEveningVisible((prev) => !prev);
};
  return (
    <div className="flex-shrink-0 bg-white rounded-xl mb-4">
      <div className={`flex items-center mb-2 ${isFriday ? 'justify-start pr-12' : 'justify-around'}`}>
        <Typography className="text-[24px] font-bold text-[#F8BD00]">{label}</Typography>
        {!isFriday && (
          <button
            onClick={toggleEvening}
            disabled={disabled}
            className="cursor-pointer outline-none"
          >
            {isEveningVisible ? (
              <MinusCircleIcon className="h-[30px] w-[30px] text-black hover:text-[#F8BD00]" />
            ) : (
              <PlusCircleIcon className="h-[30px] w-[30px] text-black hover:text-[#F8BD00]" />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 items-center">
       {isEveningVisible ? ( <label className="w-full text-black text-sm text-right pr-7">שעות בוקר</label>) : null}
        <div className="flex gap-8 justify-between">
          <InputTimeBlock
            label="שעת פתיחה"
            value={hours?.morning?.open}
            onChange={(e) => handleChange(day, "morning", "open", e.target.value, index)}
            disabled={disabled}
            error={errors?.morning?.open}
          />
          <InputTimeBlock
            label="שעת סגירה"
            value={hours?.morning?.close}
            onChange={(e) => handleChange(day, "morning", "close", e.target.value, index)}
            disabled={disabled}
            error={errors?.morning?.close}
          />
        </div>

        {isEveningVisible && (
          <>
            <label className=" text-black text-sm mb-1 mt-3">שעות ערב</label>
            <div className="flex gap-8">
              <InputTimeBlock
                label="שעת פתיחה"
                value={hours?.evening?.open}
                onChange={(e) => handleChange(day, "evening", "open", e.target.value, index)}
                disabled={disabled}
                error={errors?.evening?.open}
              />
              <InputTimeBlock
                label="שעת סגירה"
                value={hours?.evening?.close}
                onChange={(e) => handleChange(day, "evening", "close", e.target.value, index)}
                disabled={disabled}
                error={errors?.evening?.close}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};


const InputTimeBlock = ({ label, value, onChange, disabled, error }) => (
  <div className="flex flex-col min-h-[70px]">
    <label className="text-sm text-black">{label}</label>
    <CustomTimeInput value={value || ""} onChange={onChange} disabled={disabled} error={error} />
  </div>
);

export default HoursOpenMobile;

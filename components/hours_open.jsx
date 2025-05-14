'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBrunchDetails } from '../store/brunch_store';
import { Switch } from "@/components/ui/switch";
import { Typography } from './typhography';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

const BusinessHours2 = ({ brunch }) => {
    const dispatch = useDispatch();
    const [isGrouped, setIsGrouped] = useState(false);
    const [hover, setHover] = useState(-1);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleChange = (day, period, type, value, index) => {
        dispatch(
            updateBrunchDetails({
                id: brunch.id,
                hoursOpen: {
                    day: index,
                    period,
                    type,
                    value,
                },
                weekday: {
                    period,
                    type,
                    value,
                },
            })
        );
    };

    const handleSwitchChange = (checked) => {
        setIsSwitchOn(checked);
    };

    return (
        <div className="flex flex-col h-[80vh]">
            <div className="flex flex-row justify-between mb-4">
                <Typography className='text-2xl font-bold'>שעות פתיחה</Typography>
                <button
                    onClick={() => setIsGrouped((prev) => !prev)}
                    type="button"
                    className="group flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FEF2CC] text-[#F8BD00] transition-[width] delay-150 duration-700 ease-in-out hover:w-auto hover:rounded-3xl hover:px-3"
                >
                    <span className="hidden group-hover:inline-block text-black text-base font-bold">עריכת שעות פתיחה</span>
                    <PencilSquareIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="mb-1 bg-[#F4F4F4] rounded-4xl p-2">
                <div dir="ltr" className="flex items-center gap-2 w-fit">
                    <span className="text-sm text-[#111928] font-semibold">שעות בתיאום מראש</span>
                    <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
                </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto  scrollbar-hide flex flex-col text-[23px] font-semibold text-[#F8BD00]">
                {!isGrouped ? (
                    <DayRow
                        day="weekday"
                        label="ימים א'-ה'"
                        hours={brunch?.weekday}
                        handleChange={handleChange}
                        index="weekday"
                    />
                ) : (
                    ["ראשון", "שני", "שלישי", "רביעי", "חמישי"].map((day, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(-1)}
                        >
                            <DayRow
                                day={day}
                                label={`יום ${day}`}
                                hours={brunch?.hoursOpen?.[index + 1]}
                                handleChange={handleChange}
                                hover={hover === index}
                                index={index + 1}
                            />
                        </div>
                    ))
                )}
                <DayRow
                    day="שישי"
                    label="יום ו'"
                    hours={brunch?.hoursOpen?.[5]}
                    handleChange={handleChange}
                    index={5}
                />
            </div>
        </div>
    );
};

const DayRow = ({ day, label, hours, handleChange, hover, index }) => {
    const [isEveningVisible, setIsEveningVisible] = useState(false);

    const toggleEvening = () => setIsEveningVisible(prev => !prev);

    return (
        <div className="flex flex-col bg-white rounded-xl p-4 relative group">
            
        <Typography className="text-[18px] font-bold text-[#F8BD00] mb-2">{label}</Typography>
      
        {/* שורת בוקר */}
        <div className="flex flex-row-reverse items-center justify-start gap-1 p-2 rounded-xl">
          <button
            onClick={toggleEvening}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            {!isEveningVisible ? (
              <PlusCircleIcon className="h-[40px] w-[40px] text-black" />
            ) : null}
          </button>
      
          <div className="flex flex-col gap-1">
            <label className="text-sm text-black">שעת פתיחה</label>
            <InputTime
              value={hours?.morning?.open || ""}
              onChange={(e) => handleChange(day, "morning", "open", e.target.value, index)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-black">שעת סגירה</label>
            <InputTime
              value={hours?.morning?.close || ""}
              onChange={(e) => handleChange(day, "morning", "close", e.target.value, index)}
            />
          </div>
        </div>
      
        {/* שורת ערב */}
        {isEveningVisible && (
          <div className="flex flex-row-reverse items-center justify-start gap-4 p-2 rounded-xl">
            <button
              onClick={toggleEvening}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <MinusCircleIcon className="h-[40px] w-[40px] text-black" />
            </button>
      
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת פתיחה</label>
              <InputTime
                value={hours?.evening?.open || ""}
                onChange={(e) => handleChange(day, "evening", "open", e.target.value, index)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת סגירה</label>
              <InputTime
                value={hours?.evening?.close || ""}
                onChange={(e) => handleChange(day, "evening", "close", e.target.value, index)}
              />
            </div>
          </div>
        )}
      </div>
      
    );

};

const InputTime = ({ label, value, onChange }) => (
    <div className="flex flex-col">
        <Typography className='text-sm text-[#111928] font-semibold'>{label}</Typography>
        <input
            type="time"
            dir="ltr"
            // value={value}
            onChange={onChange}
            className="flex items-center justify-end w-[100px] h-[40px] px-[20px] pr-[16px] gap-[10px]
                border border-[#DBDEDE] rounded-[6px] bg-white 
                text-[#4C585B] text-[16px] leading-[24px] font-[400] text-right"
        />
    </div>
);

export default BusinessHours2;

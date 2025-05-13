'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBrunchDetails } from '../store/brunch_store';
import { Switch } from "@/components/ui/switch";
import { Typography } from './typhography';
import { PencilSquareIcon } from '@heroicons/react/24/solid'

const BusinessHours2 = ({ brunch }) => {
    const dispatch = useDispatch();
    const [isGrouped, setIsGrouped] = useState(false);
    const [hover, setHover] = useState(-1);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleChange = (period, type, value, index) => {
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
                <button onClick={() => setIsGrouped((prev) => !prev)}
                    type="button"
                    className="group flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FEF2CC] text-[#F8BD00] transition-[width] delay-150 duration-700 ease-in-out hover:w-auto hover:rounded-3xl hover:px-3 "
                >
                    <span className="hidden group-hover:inline-block text-black text-base font-bold">עריכת שעות פתיחה</span>
                    <PencilSquareIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="mb-4 bg-[#F4F4F4] rounded-4xl p-2">
                <div dir="ltr" className="flex items-center gap-2 w-fit">
                    <span className="text-sm text-[#111928] font-semibold">שעות בתיאום מראש</span>
                    <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
                </div>
            </div>


            <div className="max-h-[400px] overflow-y-auto gap-4 scrollbar-hide flex flex-col text-[23px] font-semibold text-[#F8BD00]">
                {!isGrouped ? (
                    <DayRow
                        day="weekday"
                        label="ימים א'-ה'"
                        // hours={brunch.day}
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
                                // hours={brunch[index + 1]}
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
                    // hours={brunch[5]}
                    handleChange={handleChange}
                    index={5}
                />
            </div>
        </div>
    );
};

const DayRow = ({ day, label, hours, handleChange, hover, index }) => {
    const [isEveningVisible, setIsEveningVisible] = useState(false);

    const handleEveningClick = () => {
        setIsEveningVisible((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center px-2 py-3 rounded-xl">
                <div className="pr-3">
                    <Typography className="text-[18px] font-bold text-[#F8BD00]">{label}</Typography>
                </div>
                <div className="flex flex-row gap-2 ">
                    <div className="flex flex-col">
                        <Typography className='text-sm text-[#111928] font-semibold'>שעת פתיחה</Typography>
                        <input
                            type="text"
                            dir="ltr"
                            value={hours?.morning?.open || ""}
                            onChange={(e) => handleChange(day, "morning", "open", e.target.value, index)}
                            className="w-[100px] border border-gray-300 rounded-md px-2 py-1 text-center"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Typography className='text-sm text-[#111928] font-semibold'>שעת סגירה</Typography>
                        <input
                            type="text"
                            dir="ltr"
                            value={hours?.morning?.close || ""}
                            onChange={(e) => handleChange(day, "morning", "close", e.target.value, index)}
                            className="w-[100px] border border-gray-300 rounded-md px-2 py-1 text-center"
                        />
                    </div>
                </div>


            </div>

            {isEveningVisible && (
                <div className="flex flex-row justify-between items-center px-2 py-3 bg-[#F4F4F4] rounded-xl">
                    <div className="flex flex-col gap-2 w-1/2">
                        <div className="flex flex-col">
                            <Typography className='text-sm text-[#111928] font-semibold'>שעת פתיחה (ערב)</Typography>
                            <input
                                type="text"
                                dir="ltr"
                                value={hours?.evening?.open || ""}
                                onChange={(e) => handleChange(day, "evening", "open", e.target.value, index)}
                                className=" border border-gray-300 rounded-md px-2 py-1 text-center"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Typography className='text-sm text-[#111928] font-semibold'>שעת סגירה (ערב)</Typography>
                            <input
                                type="text"
                                dir="ltr"
                                value={hours?.evening?.close || ""}
                                onChange={(e) => handleChange(day, "evening", "close", e.target.value, index)}
                                className="w-full border border-gray-300 rounded-md px-2 py-1 text-center"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



export default BusinessHours2;

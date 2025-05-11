'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBrunchDetails } from '../store/brunch_store';
import { Switch } from "@/components/ui/switch";
import { Typography } from './typhography';

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
                <button
                    onClick={() => setIsGrouped((prev) => !prev)}
                    className="group flex items-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-500 hover:w-auto transition-all duration-300 overflow-hidden pr-3 rtl"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        className="flex-shrink-0"
                    >
                        <path
                            d="M17.5287 5.23713L19.2157 3.54913C19.5674 3.19745 20.0444 2.99988 20.5417 2.99988C21.0391 2.99988 21.5161 3.19745 21.8677 3.54913C22.2194 3.9008 22.417 4.37778 22.417 4.87513C22.417 5.37247 22.2194 5.84945 21.8677 6.20113L11.2487 16.8201C10.7201 17.3485 10.0681 17.7368 9.35175 17.9501L6.66675 18.7501L7.46675 16.0651C7.68003 15.3488 8.06838 14.6968 8.59675 14.1681L17.5287 5.23713ZM17.5287 5.23713L20.1667 7.87512M18.6667 14.7501V19.5001C18.6667 20.0969 18.4297 20.6692 18.0077 21.0911C17.5858 21.5131 17.0135 21.7501 16.4167 21.7501H5.91675C5.32001 21.7501 4.74771 21.5131 4.32576 21.0911C3.9038 20.6692 3.66675 20.0969 3.66675 19.5001V9.00012C3.66675 8.40339 3.9038 7.83109 4.32576 7.40913C4.74771 6.98718 5.32001 6.75013 5.91675 6.75013H10.6667"
                            stroke="#F8BD00"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="ml-2 text-sm font-bold text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        עריכת שעות פתיחה
                    </span>
                </button>
                <Typography className="text-xl font-bold text-[#4C585B]">שעות פתיחה</Typography>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-[#4C585B]">שעות פתיחה אחידות</span>
                <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
            </div>

            <div className="max-h-[400px] overflow-y-auto gap-4 scrollbar-hide flex flex-col">
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
            <div className="flex flex-row justify-between items-start gap-5">
                {hover && (
                    <button
                        onClick={handleEveningClick}
                        className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center"
                    >
                        +
                    </button>
                )}
                <div className="flex flex-row items-start gap-4">
                    <div>
                    <Typography>שעת סגירה</Typography>
                    <input
                            type="time"
                            value={hours?.morning?.close || ""}
                            onChange={(e) =>
                                handleChange(day, "morning", "close", e.target.value, index)
                            }
                        />
                    </div>
                    <div>
                        <Typography>שעת פתיחה</Typography>
                        <input
                            type="time"
                            value={hours?.morning?.open || ""}
                            onChange={(e) =>
                                handleChange(day, "morning", "open", e.target.value, index)
                            }
                        />
                    </div>
                </div>
                <h3 className="text-md font-bold text-[#F8BD00]">{label}</h3>
            </div>

            {isEveningVisible && (
                <div className="flex flex-row gap-4 mr-10">
                    <div>
                        <Typography >שעת פתיחה</Typography>
                        <input
                            type="time"
                            value={hours?.evening?.open || ""}
                            onChange={(e) =>
                                handleChange(day, "evening", "open", e.target.value, index)
                            }
                        />
                    </div>
                    <div>
                        <Typography>שעת סגירה</Typography>
                        <input
                            type="time"
                            value={hours?.evening?.close || ""}
                            onChange={(e) =>
                                handleChange(day, "evening", "close", e.target.value, index)
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};


export default BusinessHours2;

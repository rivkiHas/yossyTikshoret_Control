'use client'

const DayRow = ({ day, label, hours, handleChange, errors, index, disabled, isFriday = false }) => {
    const [isEveningVisible, setIsEveningVisible] = useState(false);

    useEffect(() => {
        if ((hours?.evening?.open || hours?.evening?.close) || errors?.evening) {
            setIsEveningVisible(true);
        } else {
            setIsEveningVisible(false);
        }
    }, [hours, errors]);

    const toggleEvening = () => {
        if (isFriday) return;
        setIsEveningVisible(prev => !prev);
    }
    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-[40px] shadow-lg lg:grid-cols-4">
            {/* כותרת */}
            <Typography className="text-[20px] font-bold text-[#F8BD00] mb-2 text-left col-span-1 lg:mb-0">
                {label}
            </Typography>

            {/* כפתור הוספה */}
            <div className="flex justify-end items-start col-span-1 lg:justify-end">
                <button
                    onClick={toggleEvening}
                    disabled={disabled}
                    className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                >
                    {!isEveningVisible ? (
                        <PlusCircleIcon className="h-[40px] w-[40px] fill-black text-white stroke-white hover:fill-[#F8BD00]" />
                    ) : (
                        <div className="h-[40px] w-[40px] text-black" />
                    )}
                </button>
            </div>

            {/* שעת פתיחה */}
            <div className="flex flex-col gap-1 col-span-2 lg:col-span-1">
                <label className="text-sm text-black">שעת פתיחה</label>
                <InputTime
                    value={hours?.morning?.open || ""}
                    onChange={(e) =>
                        handleChange(day, "morning", "open", e.target.value, index)
                    }
                    disabled={disabled}
                    error={errors?.morning?.open}
                />
            </div>

            {/* שעת סגירה */}
            <div className="flex flex-col gap-1 col-span-2 lg:col-span-1">
                <label className="text-sm text-black">שעת סגירה</label>
                <InputTime
                    value={hours?.morning?.close || ""}
                    onChange={(e) =>
                        handleChange(day, "morning", "close", e.target.value, index)
                    }
                    disabled={disabled}
                    error={errors?.morning?.close}
                />
            </div>
        </div>

    )
};

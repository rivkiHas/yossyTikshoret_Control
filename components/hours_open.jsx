'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Typography } from './typhography';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import IconButton from './icon_button';

const dayLabels = [
    'יום ראשון',
    'יום שני',
    'יום שלישי',
    'יום רביעי',
    'יום חמישי',
    'יום שישי',
    'יום שבת'
];

const HoursOpen = ({ brunch }) => {
    const [isEditable, setIsEditable] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoursData, setHoursData] = useState(brunch || []);

    const handleSwitchChange = () => {
        setIsEditable((prev) => !prev);
    };

    const toggleExpanded = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleChange = (dayIndex, period, type, value) => {
        const newHours = [...hoursData];
        if (!newHours[dayIndex]) {
            newHours[dayIndex] = {};
        }
        if (!newHours[dayIndex][period]) {
            newHours[dayIndex][period] = {};
        }
        newHours[dayIndex][period][type] = value;
        setHoursData(newHours);
    };

    const visibleDays = isExpanded ? dayLabels : dayLabels.slice(0, 6);

    return (
        <div className="flex flex-col h-[100vh] justify-between p-6">
            <div>
                <div className="flex flex-row justify-between items-center mb-4">
                    <Typography className="text-xl font-bold">שעות פתיחה</Typography>
                    <IconButton  onClick={toggleExpanded} text={"עריכת שעות שבועיות"}></IconButton>
                </div>

                <div className="flex items-center gap-2 mb-6">
                    <Switch id="airplane-mode" checked={isEditable} onCheckedChange={handleSwitchChange} />
                    <Typography htmlFor="airplane-mode" className="text-sm">
                        שעות בתיאום מראש
                    </Typography>
                </div>
                <div className="max-h-[60vh] overflow-y-auto flex flex-col gap-6 scrollbar-hide">
                    {visibleDays.map((label, index) => (
                        <DayRow
                            key={index}
                            label={label}
                            index={index}
                            hours={hoursData[index]}
                            handleChange={handleChange}
                            isEditable={isEditable}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const DayRow = ({ label, index, hours, handleChange, isEditable }) => {
    return (
        <div className="flex flex-col gap-2">
            <Typography className="text-yellow-500 font-bold text-sm">{label}</Typography>

            {/* בוקר */}
            <div className="flex flex-row gap-6">
                <TimeInput
                    label="שעת סגירה"
                    value={hours?.morning?.close || ''}
                    onChange={(e) => handleChange(index, 'morning', 'close', e.target.value)}
                    disabled={!isEditable}
                />
                <TimeInput
                    label="שעת פתיחה"
                    value={hours?.morning?.open || ''}
                    onChange={(e) => handleChange(index, 'morning', 'open', e.target.value)}
                    disabled={!isEditable}
                />
            </div>

            {/* ערב */}
            <div className="flex flex-row gap-6 mt-2">
                <TimeInput
                    label="שעת סגירה"
                    value={hours?.evening?.close || ''}
                    onChange={(e) => handleChange(index, 'evening', 'close', e.target.value)}
                    disabled={!isEditable}
                />
                <TimeInput
                    label="שעת פתיחה"
                    value={hours?.evening?.open || ''}
                    onChange={(e) => handleChange(index, 'evening', 'open', e.target.value)}
                    disabled={!isEditable}
                />
            </div>
        </div>
    );
};

const TimeInput = ({ label, value, onChange, disabled }) => (
    <div className="flex flex-col gap-1">
        <Typography className="text-xs">{label}</Typography>
        <input
            type="time"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`h-[46px] w-[120px] px-4 border border-gray-300 rounded-md text-center ${disabled ? 'bg-gray-100 text-gray-500' : ''}`}
        />
    </div>
);

export default HoursOpen;

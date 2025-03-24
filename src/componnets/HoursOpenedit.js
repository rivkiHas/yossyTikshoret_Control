import React, { useState, useCallback } from "react";
import HoursDay from "./HoursDay";
import HeaderText from "./HeaderText";
import EditIcon from "./buttons/EditIcon";
import CustomTimeFiled from "./CustomTimeField";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateBrunchDetails } from "../redux/brunchSlice";
import SwitchButton from "./buttons/SwitchButton";
import CustomIcon from "./buttons/CustomIcon";

export default function HoursOpenEdit({ setIsEditing, placeholder, isEditing, brunch }) {
    const dispatch = useDispatch();
    const days = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי"];
    const [rowHover, setRowHover] = useState();
    const [hours, setHours] = useState(
        { day: 0, am: null, fromTime: "00:00", endTime: "00:00" }
    );

    const handleUpdateHours = useCallback((dayIndex, endTime, timeValue, am) => {
        isEditing ?
            dispatch(updateBrunchDetails({
                id: brunch.id,
                hoursOpen: { day: dayIndex, am: isEditing ? null : am, fromTime: timeValue, endTime: endTime }

            })) : days.map((x, index) => dispatch(updateBrunchDetails({
                id: brunch.id,
                hoursOpen: { day: index + 1, am: am, fromTime: timeValue, endTime: endTime }

            })));
    }, [dispatch, brunch.id]);



    return (

        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            height: "646px",
            overflow: "hidden",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
                height: "48px"
            }}>
                <EditIcon setIsEditing={setIsEditing} />
                <HeaderText placeholder={placeholder} color={'black'} />
            </div>
            <SwitchButton />

            {/* אם לא במצב עריכה */}
            {!isEditing ? (
                <div style={{
                    marginLeft: '24px',
                    direction: 'rtl',
                    display: "flex",
                    flexDirection: "column",
                    gap: '10px',
                }}>
                    <HoursDay placeholder={"ימים א-ה"} />
                    <HoursDay placeholder={"יום ו"} />
                </div>
            ) : (
                // אם במצב עריכה
                <div style={{
                    marginLeft: '24px',
                    direction: 'rtl',
                    display: "flex",
                    flexDirection: "column",
                    gap: '10px',
                    overflowY: "auto",
                }}>
                    {days.map((day, index) => (
                        <div key={index} onMouseEnter={() => setRowHover(index)} style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            width: '488px',
                            padding: '10px',
                            gap: '24px',
                            background: 'var(--Color, #FFF)',
                            direction: 'rtl',
                            marginRight: '0px',
                        }}>{rowHover === index && <CustomIcon />}
                            <div>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                    {isEditing ? (
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <HeaderText placeholder={day} color="#F8BD00" />
                                            <Typography>בוקר</Typography>
                                        </div>
                                    ) : <Typography>{day}</Typography>}
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
                                        <CustomTimeFiled
                                            header={"שעת פתיחה"}
                                            timeValue={hours[index].morningOpen}
                                            onChange={(time) => handleUpdateHours(index, "morning", "Open", time)}
                                        />
                                        <CustomTimeFiled
                                            header={"שעת סגירה"}
                                            timeValue={hours[index].morningClose}
                                            onChange={(time) => handleUpdateHours(index, "morning", "Close", time)}
                                        />
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    gap: '24px',
                                    background: 'var(--Color, #FFF)',
                                    direction: 'rtl',
                                    marginRight: '0px',
                                }}>
                                    <Typography style={{ marginRight: '50px' }}>ערב</Typography>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
                                        <CustomTimeFiled
                                            header={"שעת פתיחה"}
                                            timeValue={hours[index].eveningOpen}
                                            onChange={(time) => handleUpdateHours(index, "evening", "Open", time)}
                                        />
                                        <CustomTimeFiled
                                            header={"שעת סגירה"}
                                            timeValue={hours[index].eveningClose}
                                            onChange={(time) => handleUpdateHours(index, "evening", "Close", time)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

import React, { useState, useCallback } from "react"; // ייבוא useCallback מ-react
import HoursDay from "./HoursDay";
import HeaderText from "./HeaderText";
import EditIcon from "./buttons/EditIcon";
import CustomTimeFiled from "./CustomTimeField";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux"; // ייבוא Redux
import { updateBrunchDetails } from "../redux/brunchSlice";

export default function HoursOpenEdit({ setIsEditing, placeholder, isEditing, brunch }) {

    const dispatch = useDispatch();
    const days = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי"];

    const [hours, setHours] = useState(
        days.map(() => ({ morningOpen: "", morningClose: "", eveningOpen: "", eveningClose: "" }))
    );

    const handleUpdateHours = useCallback((dayIndex, timeOfDay, timeType, timeValue) => {
        setHours(prevHours => {
            const updatedHours = [...prevHours];  // יצירת עותק של ה-state
            updatedHours[dayIndex] = {
                ...updatedHours[dayIndex],
                [`${timeOfDay}${timeType}`]: timeValue
            };

            // עדכון השעות ב-Redux
            dispatch(updateBrunchDetails({
                id: brunch.id,  // מזהה הסניף
                hoursOpen: updatedHours.map(hour => hour.morningOpen || hour.eveningOpen),  // שעות פתיחה
                hoursClose: updatedHours.map(hour => hour.morningClose || hour.eveningClose)  // שעות סגירה
            }));

            return updatedHours;
        });
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
                // width: "488px",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
                height: "48px"
            }}>
                <EditIcon setIsEditing={setIsEditing} />
                <HeaderText placeholder={placeholder} color={'black'} />
            </div>

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
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            width: '488px',
                            padding: '10px',
                            gap: '24px',
                            background: 'var(--Color, #FFF)',
                            direction: 'rtl',
                            marginRight: '0px',
                        }}>
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

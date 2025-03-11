import React, { useState } from "react";
import HoursOpen from "./HoursOpen";
import AddressSearchMap from "./AddressSearchMap.js";
import { ButtonsWithIcon } from "./buttons/ButtonswithIcon";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { nextStep, prevStep } from "../redux/stepSlice.js"; // ייבוא הפעולה מרדקס
import HoursOpenEdit from "./HoursOpenedit.js";

export default function StepTwo() {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const nextStepInRedux = () => {
        dispatch(nextStep());
    };

    const previousStepInRedux = () => {
        dispatch(prevStep());
    };

    // פונקציה להוספת סניף נוסף
    const AddMoreBrunch = () => {
        console.log("הוספת סניף נוסף");
        // כאן תוסיפי את הלוגיקה הרצויה
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '128px', gap:'384px' }}>
                {isEditing ? <HoursOpenEdit setIsEditing={setIsEditing} /> : <HoursOpen setIsEditing={setIsEditing} />}
                <AddressSearchMap />
            </div>
            <div style={{display:'flex', flexDirection:'row'}}>
           
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <ButtonsWithIcon onClick={nextStepInRedux} variant={"contained"}>
                    שלב הבא
                </ButtonsWithIcon>
                <ButtonsWithIcon onClick={previousStepInRedux} variant={"outlined"}>
                    שלב קודם
                </ButtonsWithIcon>
            </Box>
            <ButtonsWithIcon onClick={AddMoreBrunch} variant={"contained"} >הוספת סניף נוסף</ButtonsWithIcon>
            </div>
        </div>
    );
}

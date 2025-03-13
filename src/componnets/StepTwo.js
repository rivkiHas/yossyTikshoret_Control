import React, { useState } from "react";
import HoursOpen from "./HoursOpen";
import HoursOpenEdit from "./HoursOpenedit";
import AddressSearchMap from "./AddressSearchMap";
import { ButtonsWithIcon } from "./buttons/ButtonswithIcon";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../redux/stepSlice";
import { addBrunch, setActiveBrunch, updateBrunchDetails } from "../redux/brunchSlice"; // הוספת פעולת עדכון סניף

export default function StepTwo() {

    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);

    const brunches = useSelector((state) => state.brunch.brunches);
    const typeMarketer = useSelector((state) => state.typeMarketer)
    const activeBrunchId = useSelector((state) => state.brunch.activeBrunch?.id);
    const activeBrunch = brunches.find(b => b.id === activeBrunchId) || null;

    const nextStepInRedux = () => {
        dispatch(nextStep());
    };

    const previousStepInRedux = () => {
        dispatch(prevStep());
    };

    const AddMoreBrunch = () => {
        
        dispatch(addBrunch({
            id: brunches.length + 1,
            address: '',
            hoursOpen: Array(7).fill(""),
            hoursClose: Array(7).fill(""),
            name: "סניף חדש"
        }))
    };

    const lastBrunch = brunches[brunches.length - 1];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            // width: '1224px',
            height: '888px',
            padding: '78px 109px',
            borderRadius: '40px',
            background: 'var(--Color, #FFF)',
            backgroundColor: 'white',
            margin: '97px 109px',
        }}>
            {lastBrunch && (
                <div key={lastBrunch.id} style={{ display: 'flex', gap: '128px', backgroundColor: 'white' }}>
                    <HoursOpenEdit
                        setIsEditing={setIsEditing}
                        isEditing={isEditing}
                        placeholder={"שעות פתיחה"}
                        title={lastBrunch?.name || "לא נבחר סניף"}
                        brunch={lastBrunch}
                    />
                    <AddressSearchMap brunch={lastBrunch} typeMarketer={typeMarketer}/>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'row', gap: '620px', marginTop: '72px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '16px' }}>
                    {/* כפתור שלב הבא */}
                    <ButtonsWithIcon onClick={nextStepInRedux} variant="contained" color={"#F8BD03"}>
                        שלב הבא
                    </ButtonsWithIcon>
                    {/* כפתור שלב קודם */}
                    <ButtonsWithIcon onClick={previousStepInRedux} variant="outlined" color={"#F8BD03"}>
                        שלב קודם
                    </ButtonsWithIcon>
                </Box>
                {/* כפתור הוספת סניף חדש */}
                <ButtonsWithIcon onClick={AddMoreBrunch} variant="contained" color={'#000'}>
                    הוספת סניף נוסף
                </ButtonsWithIcon>
            </div>
        </div>
    );
}

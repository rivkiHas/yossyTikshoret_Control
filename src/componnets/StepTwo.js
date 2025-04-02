import React, { useState } from "react";
import AddressSearchMap from "./AddressSearchMap";
import { ButtonsWithIcon } from "./buttons/ButtonswithIcon";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../redux/stepSlice";
import { addBrunch, setActiveBrunch, updateBrunchDetails } from "../redux/brunchSlice";
import DeleteIcon from "./buttons/DeleteIcon.js";
import PopUpNameBrunch from "./popups/PopUpNameBrunch.js"; // יבוא של הפופאפ
import BusinessHours2 from "./BusinessHours2.js"

export default function StepTwo() {
    const dispatch = useDispatch();
    const [isPopUpOpen, setIsPopUpOpen] = useState(false); // סטייט לניהול פתיחת הפופאפ

    const brunches = useSelector((state) => state.brunch.brunches);
    const typeMarketer = useSelector((state) => state.typeMarketer);

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
            name: "סניף חדש"
        }));
        setIsPopUpOpen(true); // פתיחת הפופאפ לאחר הוספת סניף חדש
    };

    const closePopup = () => {
        setIsPopUpOpen(false); // סגירת הפופאפ
    };

    const lastBrunch = brunches[brunches.length - 1];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '36px'
            }}>

            {lastBrunch && (
                <Box
                    key={lastBrunch.id} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '128px',
                        textAlign: 'right',
                    }}>
                    <BusinessHours2 brunch={lastBrunch} />
                    <AddressSearchMap brunch={lastBrunch} typeMarketer={typeMarketer} />
                </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row',  justifyContent:'space-between'}}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap:'16px' }}>
                    <ButtonsWithIcon onClick={nextStepInRedux} variant="contained" color={"#F8BD03"}>
                        שלב הבא
                    </ButtonsWithIcon>
                    <ButtonsWithIcon onClick={previousStepInRedux} variant="outlined" color={"#F8BD03"}>
                        שלב קודם
                    </ButtonsWithIcon>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '16px' }}>
                    {brunches.map((brunch, index) => (
                        index > 0 &&
                        <DeleteIcon functionName={"brunch"} placeholder={"?האם ברצונך למחוק סניף זה"} Id={lastBrunch.id} />
                    ))}

                    <ButtonsWithIcon onClick={AddMoreBrunch} variant="contained" color={'#000'}>
                        הוספת סניף נוסף
                    </ButtonsWithIcon>
                </Box>
            </Box>
            {/* הצגת פופאפ אם הפופאפ פתוח */}
            {isPopUpOpen && <PopUpNameBrunch closePopup={closePopup} activeBrunch={lastBrunch} />}
        </Box>
    );
}

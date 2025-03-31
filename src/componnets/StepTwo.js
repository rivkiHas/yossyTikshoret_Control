import React, { useState } from "react";
import HoursOpen from "./HoursOpen";
import HoursOpenEdit from "./HoursOpenedit";
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
    const [isEditing, setIsEditing] = useState(false);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false); // סטייט לניהול פתיחת הפופאפ

    const brunches = useSelector((state) => state.brunch.brunches);
    const typeMarketer = useSelector((state) => state.typeMarketer);
    const activeBrunchId = useSelector((state) => state.brunch.activeBrunch?.id);

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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding:" 54px 75px 54px 76.5px",
            borderRadius: '40px',
            background: 'var(--Color, #FFF)',
            backgroundColor: 'white',
        }}>
            {lastBrunch && (
                <div key={lastBrunch.id} style={{ display: 'flex', gap: '96px', backgroundColor: 'white' ,textAlign: 'center' , marginBottom:"24px"}}>
                    <BusinessHours2 brunch={lastBrunch} />
                    <AddressSearchMap brunch={lastBrunch} typeMarketer={typeMarketer} />
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'row', gap: '620px', marginTop: '72px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '16px' }}>
                    <ButtonsWithIcon onClick={nextStepInRedux} variant="contained" color={"#F8BD03"}>
                        שלב הבא
                    </ButtonsWithIcon>
                    <ButtonsWithIcon onClick={previousStepInRedux} variant="outlined" color={"#F8BD03"}>
                        שלב קודם
                    </ButtonsWithIcon>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '16px' }}>
                    {brunches.map((x, index) => (
                        index > 0 &&
                        <DeleteIcon functionName={"brunch"} placeholder={"?האם ברצונך למחוק סניף זה"} Id={lastBrunch.id} />
                    ))}

                    <ButtonsWithIcon onClick={AddMoreBrunch} variant="contained" color={'#000'}>
                        הוספת סניף נוסף
                    </ButtonsWithIcon>
                </Box>
            </div>
            {/* הצגת פופאפ אם הפופאפ פתוח */}
            {isPopUpOpen && <PopUpNameBrunch closePopup={closePopup} activeBrunch={lastBrunch} />}

        </div>
    );
}

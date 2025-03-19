import React, { useState } from "react";
import FinalForm from "./FinalForm";
import { Box } from "@mui/material";
import ButtonsWithIcon from "./buttons/ButtonswithIcon.js";
import { useDispatch } from "react-redux";
import { nextStep, prevStep } from "../redux/stepSlice.js"; // ייבוא הפעולה מרדקס
import { addContactMan, deleteContactMan } from "../redux/conectManSlice.js"; // ייבוא הפונקציה לעדכון הנתונים
import { useSelector } from "react-redux";
import DeleteIcon from "./buttons/DeleteIcon.js";
import PopUpEnd from "./popups/PopUpEnd.js";
import PopUpOkCencel from "./popups/PopUpOkCencel";

export default function StepThree() {

    const dispatch = useDispatch();
    const [validateFunction, setValidateFunction] = useState(() => () => true); // פונקציה ריקה כברירת מחדל
    const contactMans = useSelector(state => state.conectMan.contactMans || []);
    const activeStep = useSelector(state => state.stepper.activeStep);
    const [showPopup, setShowPopup] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // מצב לניהול פתיחת הפופאפ
    const [contactToDelete, setContactToDelete] = useState(null); // מזהה איש קשר למחיקה
    const contactId = contactMans.length - 1;
   

    // פונקציה להעברת השלב הבא
    const nextStepInRedux = () => {
        if (validateFunction()) {
            if (activeStep === 2) {
                setShowPopup(true); // הצגת הפופאפ במקום לעבור שלב
            } else {
                dispatch(nextStep()); // אם זה לא השלב האחרון - מעבר לשלב הבא
            }
        } else {
            console.log("יש שגיאות בטופס");
        }
    };

    // פונקציה להוספת איש קשר חדש
    const addContactManHandler = () => {
        dispatch(addContactMan()); // קריאה לפעולה להוספת אובייקט ריק
    };

    // פונקציה למעבר לשלב הקודם
    const previousStepInRedux = () => {
        dispatch(prevStep());
    };

    // פונקציה לפתיחת הפופאפ למחיקת איש קשר
    const handleDeleteClick = (contactId) => {
        setContactToDelete(contactId); // הגדרת איש הקשר למחיקה
        setIsPopupOpen(true); // פתיחת הפופאפ
    };

    const handleDeleteConfirmation = () => {
        dispatch(deleteContactMan(contactToDelete)); // קריאה לפעולה של מחיקת איש הקשר
        setIsPopupOpen(false); // סגירת הפופאפ אחרי המחיקה
    };

    const closePopup = () => {
        setIsPopupOpen(false); // סגירת הפופאפ
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '888px',
            padding: '78px 109px',
            borderRadius: '40px',
            backgroundColor: 'white',
            margin: '77px 114px'
        }}>
            <div style={{
                display: "flex",
                justifyContent: 'flex-start',
                width: '384px',
                marginBottom: '40px',
            }}>
                {contactMans.map((x, index) => (
                    <FinalForm contactId={index} key={index} />
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '500px', marginTop: '72px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '16px' }}>
                    <ButtonsWithIcon onClick={nextStepInRedux} variant="contained" color={'#F8BD03'}>
                        סיימתי אפשר לשלוח
                    </ButtonsWithIcon>
                    <ButtonsWithIcon onClick={previousStepInRedux} variant="outlined" color={'#F8BD03'}>
                        שלב קודם
                    </ButtonsWithIcon>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '16px' }}>
                    {contactMans.length > 1 && (
                        <DeleteIcon onClick={() => handleDeleteClick(contactMans.length - 1)} functionName={"contactMans"} placeholder={"?האם ברצונך למחוק איש קשר זה"} />
                    )}
                    <ButtonsWithIcon onClick={addContactManHandler} variant="contained" color={'#000'}>
                        הוספת איש קשר נוסף
                    </ButtonsWithIcon>
                </Box>
            </div>

            {/* הצגת הפופאפ למחיקה */}
            {isPopupOpen && (
                <PopUpOkCencel
                    placeholder={"האם אתה בטוח שברצונך למחוק איש קשר זה?"}
                    functionName={"contactMans"}
                    closePopup={closePopup}
                    OkFunction={handleDeleteConfirmation}
                    contactId={contactToDelete} // שליחה של המזהה של איש הקשר האחרון
                />
            )}

            {showPopup && <PopUpEnd onClose={() => setShowPopup(false)} />}
        </div>
    );
}


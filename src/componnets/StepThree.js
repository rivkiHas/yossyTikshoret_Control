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
import { Edit, Edit2 } from "lucide-react";

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
        debugger;
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
            flexDirection: 'row', // שינוי מ-'column' ל-'row' 
            justifyContent: 'flex-end',
            height: '888px',
            padding: '78px 109px',
            borderRadius: '40px',
            backgroundColor: 'white',
            margin: '77px 114px',
            flexWrap: 'wrap' // במידה ויש יותר מדי אלמנטים לשורה אחת
        }}>
            {contactMans.map((x, index) => (
             <div key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
             {index > 0 && (
                 <div
                     onClick={() => {
                         setContactToDelete(x.id);
                         setIsPopupOpen(true);
                     }}
                     style={{ cursor: 'pointer', marginRight: '8px' }}
                 >
                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                         <path 
                             d="M15.4067 9.50003L15.0607 18.5M10.2727 18.5L9.92675 9.50003M19.8947 6.29003C20.2367 6.34203 20.5767 6.39703 20.9167 6.45603M19.8947 6.29003L18.8267 20.173C18.7832 20.7383 18.5278 21.2662 18.1118 21.6513C17.6957 22.0364 17.1497 22.2502 16.5827 22.25H8.75075C8.18384 22.2502 7.63777 22.0364 7.22173 21.6513C6.80568 21.2662 6.55034 20.7383 6.50675 20.173L5.43875 6.29003M19.8947 6.29003C18.7406 6.11555 17.5805 5.98313 16.4167 5.89303M5.43875 6.29003C5.09675 6.34103 4.75675 6.39603 4.41675 6.45503M5.43875 6.29003C6.59288 6.11555 7.75298 5.98313 8.91675 5.89303M16.4167 5.89303V4.97703C16.4167 3.79703 15.5067 2.81303 14.3267 2.77603C13.2204 2.74067 12.1131 2.74067 11.0067 2.77603C9.82675 2.81303 8.91675 3.79803 8.91675 4.97703V5.89303M16.4167 5.89303C13.9205 5.70011 11.413 5.70011 8.91675 5.89303" 
                             stroke="#F8BD00" 
                             strokeWidth="2" 
                             strokeLinecap="round" 
                             strokeLinejoin="round"
                         />
                     </svg>
                 </div>
             )}
             <FinalForm contactId={index} />
         </div>
            ))}


            <div style={{ display: 'flex', flexDirection: 'row', gap: '500px', marginTop: '72px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '16px' }}>
                    <ButtonsWithIcon onClick={nextStepInRedux} variant="outlined" color={'#FFF'}>
                        סיימתי אפשר לשלוח
                    </ButtonsWithIcon>
                    <ButtonsWithIcon onClick={previousStepInRedux} variant="outlined" color={'#F8BD03'}>
                        שלב קודם
                    </ButtonsWithIcon>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '16px' }}>
                    {/* {contactMans.length > 1 && (
                       
                    )} */}
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


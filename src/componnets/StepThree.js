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
import TextOnTextFiled from "./TextOnTextFiled.js";

export default function StepThree() {

    const dispatch = useDispatch();
    const [validateFunction, setValidateFunction] = useState(() => () => true); // פונקציה ריקה כברירת מחדל
    const contactMans = useSelector(state => state.conectMan.contactMans || []);
    const activeStep = useSelector(state => state.stepper.activeStep);
    const [showPopup, setShowPopup] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // מצב לניהול פתיחת הפופאפ
    const [contactToDelete, setContactToDelete] = useState(null); // מזהה איש קשר למחיקה
    const contactId = contactMans.length - 1;
    const [isHovered, setIsHovered] = useState(false);


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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '36px'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '128px',
                alignItems: 'end',
                overflowY: 'auto',
            }}>
                {contactMans.map((x, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
                        {index > 0 && (
                            <Box
                                onClick={() => {
                                    setContactToDelete(x.id);
                                    setIsPopupOpen(true);
                                }}
                                sx={{
                                    display: 'flex',
                                    height: '48px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: '#FEF2CC',
                                    borderRadius: '50%',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {isHovered && <TextOnTextFiled header={"מחיקה"} />}
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path d="M15.0734 9.00003L14.7274 18M9.93937 18L9.59337 9.00003M19.5614 5.79003C19.9034 5.84203 20.2434 5.89703 20.5834 5.95603M19.5614 5.79003L18.4934 19.673C18.4498 20.2383 18.1944 20.7662 17.7784 21.1513C17.3624 21.5364 16.8163 21.7502 16.2494 21.75H8.41737C7.85047 21.7502 7.3044 21.5364 6.88835 21.1513C6.47231 20.7662 6.21696 20.2383 6.17337 19.673L5.10537 5.79003M19.5614 5.79003C18.4072 5.61555 17.2471 5.48313 16.0834 5.39303M5.10537 5.79003C4.76337 5.84103 4.42337 5.89603 4.08337 5.95503M5.10537 5.79003C6.25951 5.61555 7.41961 5.48313 8.58337 5.39303M16.0834 5.39303V4.47703C16.0834 3.29703 15.1734 2.31303 13.9934 2.27603C12.887 2.24067 11.7798 2.24067 10.6734 2.27603C9.49337 2.31303 8.58337 3.29803 8.58337 4.47703V5.39303M16.0834 5.39303C13.5871 5.20011 11.0797 5.20011 8.58337 5.39303" stroke="#F8BD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Box>
                        )}
                        <FinalForm contactId={x.id} index={index} />
                    </Box>
                ))}
            </Box>



            <Box sx={{ display: 'flex', flexDirection: 'row',  justifyContent:'space-between'}}>
                <Box sx={{display: 'flex', justifyContent: 'flex-start', gap:'16px'}}>
                    <ButtonsWithIcon onClick={nextStepInRedux} variant="outlined" color={'#FFF'}>
                        סיימתי אפשר לשלוח
                    </ButtonsWithIcon>
                    <ButtonsWithIcon onClick={previousStepInRedux} variant="outlined" color={'#F8BD03'}>
                        שלב קודם
                    </ButtonsWithIcon>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '16px' }}>

                    <ButtonsWithIcon onClick={addContactManHandler} variant="contained" color={'#000'}>
                        הוספת איש קשר נוסף
                    </ButtonsWithIcon>
                </Box>
            </Box>

            {
                isPopupOpen && (
                    <PopUpOkCencel
                        placeholder={"האם אתה בטוח שברצונך למחוק איש קשר זה?"}
                        functionName={"contactMans"}
                        closePopup={closePopup}
                        OkFunction={handleDeleteConfirmation}
                        contactId={contactToDelete} // שליחה של המזהה של איש הקשר האחרון
                    />
                )
            }

            {showPopup && <PopUpEnd onClose={() => setShowPopup(false)} />}
        </Box >
    );
}


import React, { useState } from "react";
import PopUpOkCencel from "../popups/PopUpOkCencel";
import { Box, containerClasses } from "@mui/material";
import TextOnTextFiled from "../TextOnTextFiled";

export default function EditIcon({ setIsEditing, functionName, placeholder, Id }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // מצב לניהול פתיחת הפופאפ
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        setIsPopupOpen(true); // פותח את הפופאפ בלחיצה על האייקון
    };

    const closePopup = () => {

        setIsPopupOpen(false); // סוגר את הפופאפ
    };

    return (
        <Box>
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    height: '48px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#FEF2CC',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}
                onMouseEnter={() => setIsHovered(true)} // הצגת הטקסט בעת ריחוף
                onMouseLeave={() => setIsHovered(false)} // הסתרת הטקסט לאחר הריחוף
            >
                {isHovered && (
                    <TextOnTextFiled
                        header={"מחיקה"}
                    >
                    </TextOnTextFiled>
                )}
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path d="M15.0734 9.00003L14.7274 18M9.93937 18L9.59337 9.00003M19.5614 5.79003C19.9034 5.84203 20.2434 5.89703 20.5834 5.95603M19.5614 5.79003L18.4934 19.673C18.4498 20.2383 18.1944 20.7662 17.7784 21.1513C17.3624 21.5364 16.8163 21.7502 16.2494 21.75H8.41737C7.85047 21.7502 7.3044 21.5364 6.88835 21.1513C6.47231 20.7662 6.21696 20.2383 6.17337 19.673L5.10537 5.79003M19.5614 5.79003C18.4072 5.61555 17.2471 5.48313 16.0834 5.39303M5.10537 5.79003C4.76337 5.84103 4.42337 5.89603 4.08337 5.95503M5.10537 5.79003C6.25951 5.61555 7.41961 5.48313 8.58337 5.39303M16.0834 5.39303V4.47703C16.0834 3.29703 15.1734 2.31303 13.9934 2.27603C12.887 2.24067 11.7798 2.24067 10.6734 2.27603C9.49337 2.31303 8.58337 3.29803 8.58337 4.47703V5.39303M16.0834 5.39303C13.5871 5.20011 11.0797 5.20011 8.58337 5.39303" stroke="#F8BD00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </Box>

            {/* הצגת הפופאפ אם הוא פתוח */}
            {isPopupOpen && (
                <PopUpOkCencel
                    placeholder={placeholder}
                    functionName={functionName}
                    closePopup={closePopup} // העברת הפונקציה לסגירת הפופאפ
                    Id={Id}
                />
            )}
        </Box>
    );
}

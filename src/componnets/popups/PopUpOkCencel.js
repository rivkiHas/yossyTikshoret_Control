import React from "react";
import HeaderText from "../HeaderText";
import ButtonsWithIcon from "../buttons/ButtonswithIcon";
import { useDispatch } from "react-redux";
import { removeBrunch } from "../../redux/brunchSlice";
import { deleteContactMan, removeContactMan } from "../../redux/conectManSlice";

export default function PopUpOkCencel({ placeholder, functionName, closePopup, contactId }) {
    const dispatch = useDispatch();

    const OkFunction = () => {
        console.log(contactId);
        debugger;
        if (functionName === "brunch") {
            dispatch(removeBrunch());
        } else {
            dispatch(deleteContactMan(contactId));
        }
        // סגירת החלונית אחרי ביצוע הפעולה
        closePopup();
    };

    const RemoveFunction = () => {
        // סגירת החלונית מבלי לבצע פעולה
        closePopup();
    };

    return (
        <>
            {/* רקע אפור שמכסה את כל המסך */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // רקע אפור שקוף
                    zIndex: 999, // לוודא שהפופאפ יכסה את כל התוכן
                }}
                onClick={closePopup} // סגירת הפופאפ בלחיצה על הרקע
            ></div>

            {/* הפופאפ במרכז המסך */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)', // ממקם את הפופאפ במרכז
                    display: 'flex',
                    width: '347px',
                    padding: '32px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    borderRadius: '8px',
                    background: 'var(--Color, #FFF)',
                    zIndex: 1000, // הפופאפ יהיה מעל הרקע האפור
                }}
            >
                <HeaderText placeholder={placeholder} />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                    }}
                >
                    <ButtonsWithIcon onClick={OkFunction} variant="contained" color={"#F8BD03"}>אישור</ButtonsWithIcon>
                    <ButtonsWithIcon onClick={RemoveFunction} variant="outlined" color={"#F8BD03"}>ביטול</ButtonsWithIcon>
                </div>
            </div>
        </>
    );
}

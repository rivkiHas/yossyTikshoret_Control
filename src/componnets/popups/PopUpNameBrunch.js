import React, { useState } from "react";
import { useDispatch } from "react-redux";
import HeaderText from "../HeaderText";
import { Typography } from "@mui/material";
import TextFilee from "../TextFilee";
import ButtonsWithIcon from "../buttons/ButtonswithIcon";
import { updateBrunchDetails } from "../../redux/brunchSlice";

export default function PopUpNameBrunch({ closePopup, activeBrunch }) {
    const dispatch = useDispatch();
    const [branchName, setBranchName] = useState("");  // שומר את שם הסניף במצב

    const handleChange = (e) => {
        const { value } = e.target;
        setBranchName(value);  // מעדכן את שם הסניף
    };

    const handleSubmit = () => {
        // שולח את שם הסניף ל-RRedux
        dispatch(updateBrunchDetails({
            id: activeBrunch.id,
            name: branchName,  // שולח את שם הסניף החדש
        }));
        closePopup();

    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // רקע אפור שקוף
            zIndex: 999, // לוודא שהפופאפ יכסה את כל התוכן
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
        }}>
            <HeaderText placeholder={"כינוי שם לסניף"} />
            <Typography>
                כדי לשמור על סדר במערכת הקונטרול, איזה שם תרצה לתת לסניף הזה?
            </Typography>
            <TextFilee
                header={"כינוי שם לעסק"}
                type="text"
                placeholder={"עסק מספר 01"}
                value={branchName}
                onChange={handleChange}
            />
            <ButtonsWithIcon onClick={() => { handleSubmit(); closePopup(); }}>
                סיימתי הולך לסניף הבא
            </ButtonsWithIcon>

        </div>
    );
}

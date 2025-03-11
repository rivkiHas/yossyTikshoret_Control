import React, { useState } from "react";
import FinalForm from "./FinalForm";
import { Box } from "@mui/material";
import ButtonsWithIcon from "./buttons/ButtonswithIcon.js";
import { useDispatch } from "react-redux";
import { nextStep, prevStep } from "../redux/stepSlice.js"; // ייבוא הפעולה מרדקס
import { addContactMan } from "../redux/conectManSlice"; // ייבוא הפונקציה לעדכון הנתונים
import { useSelector } from "react-redux";
export default function StepThree() {
    
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);

    const [validateFunction, setValidateFunction] = useState(() => () => true); // פונקציה ריקה כברירת מחדל
    const contactMans = useSelector (state => state.conectMan.contactMans || []);

    const nextStepInRedux = () => {
        if (validateFunction()) { // קריאה לפונקציית ולידציה לפני המעבר לשלב הבא
            dispatch(nextStep());
        } else {
            console.log("יש שגיאות בטופס");
        }
    };

    const addContactManHandler = () => {
        dispatch(addContactMan()); // קריאה לפעולה להוספת אובייקט ריק
      };

    const previousStepInRedux = () => {
        dispatch(prevStep());
    };

    const handleFormDataChange = (newData) => {
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '888px',
            // width: '1224px',
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
            }}>{contactMans.map((x, index)=><FinalForm contactId={index}/>)}
                
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
                <ButtonsWithIcon onClick={addContactManHandler} variant="contained" color={'#000'}>
                    הוספת איש קשר נוסף
                </ButtonsWithIcon>
            </div>
        </div>
    );
}

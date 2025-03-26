import React, { useState } from "react";
import Form from "./Form";
import FormButtons from "./FormButtons";
import { ButtonsWithIcon } from "./buttons/ButtonswithIcon";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { nextStep, prevStep } from "../redux/stepSlice.js"; // ייבוא הפעולה מרדקס

export default function StepOne() {
   
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
 
    const nextStepInRedux = () => {
        dispatch(nextStep()); // מקדם שלב ברדקס
    };

    const previousStepInRedux = () => {
        dispatch(prevStep()); // מחזיר שלב ברדקס
    };
    const handleSubmit = (event) => {
        event.preventDefault();
       
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '888px',
            padding: '78px 109px',
            borderRadius: '40px',
            background: 'var(--Color, #FFF)',
            backgroundColor: 'white',
            margin: '100px'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '128px',
                margin: ' 72px 100px ',
                textAlign:'center'
            }}>
                <FormButtons />
                <Form />
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <ButtonsWithIcon onClick={nextStepInRedux} variant={"contained"}>
                    שלב הבא
                </ButtonsWithIcon>
                {/* <ButtonsWithIcon onClick={previousStepInRedux} variant={"outlined"}>
                    שלב קודם
                </ButtonsWithIcon> */}
            </Box>
        </div>
    );
}

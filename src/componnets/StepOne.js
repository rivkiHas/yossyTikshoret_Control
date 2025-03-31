import React, { useState } from "react";
import Form from "./Form";
import FormButtons from "./FormButtons";
import { ButtonsWithIcon } from "./buttons/ButtonswithIcon";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { nextStep, prevStep } from "../redux/stepSlice.js";
import HeaderText from "./HeaderText.js";
export default function StepOne() {

    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const nextStepInRedux = () => {
        dispatch(nextStep());
    };

    const previousStepInRedux = () => {
        dispatch(prevStep());
    };
    const handleSubmit = (event) => {
        event.preventDefault();

    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding:" 54px 75px 54px 76.5px",
            borderRadius: '40px',
            background: 'var(--Color, #FFF)',
            backgroundColor: 'white',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '96px',
                textAlign: 'center',
                marginBottom:"24px"
            }}>
                <FormButtons />
                <Form />

            </div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <ButtonsWithIcon onClick={nextStepInRedux} variant={"contained"}>
                    שלב הבא
                </ButtonsWithIcon>

            </Box>
        </div >
    );
}

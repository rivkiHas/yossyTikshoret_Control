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
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '128px',
                textAlign: 'right',
            }}>
                <FormButtons />
                <Form />

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <ButtonsWithIcon onClick={nextStepInRedux} variant={"contained"}>
                    שלב הבא
                </ButtonsWithIcon>

            </Box>
        </>
    );
}

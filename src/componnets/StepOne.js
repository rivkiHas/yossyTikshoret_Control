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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            // gap:'36px'
            alignItems:'normal'

        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'right',
                justifyContent: 'space-around'
            }}>
                <FormButtons />
                <Form />

            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <ButtonsWithIcon onClick={nextStepInRedux} variant={"contained"}>
                    שלב הבא
                </ButtonsWithIcon>

            </Box>
        </Box>
    );
}

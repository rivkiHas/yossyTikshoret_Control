import React from "react";
import { Box, Container, Typography, Stepper, Step, StepLabel, Paper } from "@mui/material";
import HeaderText from "./HeaderText";
import Stepper2 from "./Stepper2";
import { Logo } from "./buttons/logo";

const Control = () => {
    return (
        <Box >
            <Logo />
            <HeaderText placeholder={"הצטרפו כמשווק רשמי"} textAlign={"center"} />
            <Typography
                sx={{
                    alignSelf: "stretch",
                    color: "#000",
                    textAlign: "center",
                    fontFamily: "SimplerPro_HLAR",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                }}
            >

                להצטרפות כמשווק רשמי בחברת- <br />
                'יוסי תקשורת', יש למלא את פרטי העסק.<br />
                המידע יסייע לנו להעניק לך את הכלים<br />
                והמשאבים להצלחה מרבית.<br />
            </Typography>

            <Stepper2 />
        </Box>
    );
}
export default Control


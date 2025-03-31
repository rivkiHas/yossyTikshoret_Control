import React from "react";
import { Box, Container, Typography, Stepper, Step, StepLabel, Paper } from "@mui/material";
import HeaderText from "./HeaderText";
import Stepper2 from "./Stepper2";
import { Logo } from "./buttons/logo";

const Control = () => {
    return (
        <div style={{
            padding: '54px 70px',
            justifyContent: 'center', 
            gap:'27px',
            alignItems: 'flex-end', 
            borderRadius: '40px', 
            background: 'var(--Color, #FFF)', 
        }}>
             <Logo/>
            <HeaderText placeholder={"הצטרפו כמשווק רשמי"} textAlign={"center"}/>
            <Typography
                sx={{
                    alignSelf: "stretch",
                    color: "#000",
                    textAlign: "center",
                    fontFamily: "SimplerPro_HLAR",
                    fontSize: "13.5px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                }}
            >
               
                להצטרפות כמשווק רשמי בחברת- <br/>
                'יוסי תקשורת', יש למלא את פרטי העסק.<br/>
                המידע יסייע לנו להעניק לך את הכלים<br/>
                והמשאבים להצלחה מרבית.<br/>
            </Typography>

            <Stepper2 />
        </div>
    );
}
export default Control


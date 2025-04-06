import React from "react";
import { useSelector } from "react-redux";
import { Stepper, Step, StepConnector } from "@mui/material";
import { borderRight, styled } from "@mui/system";
import { CompletedIcon, StepOneIcon, StepTwoIcon, StepThreeIcon, CircleIcon, MiniCompletedIcon } from "./IconsStepper.js";
import HeaderText from "./HeaderText.js";
import TextOnTextFiled from "./TextOnTextFiled.js";
import { useEffect } from "react";
import { Box } from "@mui/material";

const CustomConnector = styled(StepConnector)({
  "&.MuiStepConnector-root": {
    position: "relative",
    left: "-35px", // כדי להתאים את הקו למרכז האייקון
    height: "40px",
    borderRight: "3px solid #F4B400",
  },
  "& .MuiStepConnector-line": {
    borderColor: "transparent", // הסתרת הקו המקורי של המחבר
  },
});


// עיצוב כל שלב
const StepContainer = styled("Box")(({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  // gap: "12px",
  // padding: "10px",
  borderRadius: "10px",
  backgroundColor: isActive ? "#FDEBB2" : "transparent",
  boxShadow: isActive ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
}));

const StepText = styled("div")({
  display: "flex",
  flexDirection: "column",
  textAlign: "right",
});


const steps = [
  { label: "שלב ראשון", description: "פרטים  על העסק", icon: <StepOneIcon /> },
  { label: "שלב שני", description: "כתובת ושעות נוספות", icon: <StepTwoIcon /> },
  { label: "שלב שלישי", description: "פרטי איש קשר", icon: <StepThreeIcon /> },
];

export default function Stepper2() {
  const activeStep = useSelector((state) => state.stepper.activeStep);
  const brunchNames = useSelector((state) =>
    (state.brunch.brunches || []).map(brunch => brunch.name) || ["אפס"]
  );

  useEffect(() => {
    console.log(brunchNames);  // ראה אם יש עדכון למערך ברנץ'
  }, [brunchNames]);  // המערך יתעדכן בכל פעם ש-brunchNames משתנה


  return (
    <Stepper
      sx={{
        direction: "rtl",
        backgroundColor: "white",

      }}
      activeStep={activeStep}
      orientation="vertical"
      connector={<CustomConnector />}
    >
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        return (
          <Step key={index} completed={index < activeStep}>

            <StepContainer isActive={isActive}>
              {isActive ? step.icon : index < activeStep ? <CompletedIcon /> : <CircleIcon />}
              <StepText>
                <HeaderText placeholder={step.label} color={"#333"} />
                <TextOnTextFiled header={step.description} />
              </StepText>
            </StepContainer>

            {index === 1 && brunchNames.length > 1 && (
              <Box> 
                <ul >
                  {brunchNames.map((name, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5px', marginBottom: '4px' }}>
                      <MiniCompletedIcon />
                      <TextOnTextFiled header={name} />
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Step>
        );
      })}
    </Stepper>
  );
}

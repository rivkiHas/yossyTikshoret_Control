import React from "react";
import { useSelector } from "react-redux";
import { Stepper, Step, StepConnector } from "@mui/material";
import { borderRight, styled } from "@mui/system";
import { CompletedIcon, StepOneIcon, StepTwoIcon, StepThreeIcon, CircleIcon } from "./IconsStepper.js";
import HeaderText from "./HeaderText.js";
import TextOnTextFiled from "./TextOnTextFiled.js";
import { Leaf, MoveRight } from "lucide-react";
import { useEffect } from "react";


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
const StepContainer = styled("div")(({ isActive }) => ({
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
    (state.brunches || []).map(brunch => brunch.name) || ["אפס"]
  );
  console.log("brunches", brunchNames)
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
            
            {/* {index === 1 && brunchNames.length > 1 && (
              <div>
                <ul>
                  {brunchNames.map((name, idx) => (
                    <li key={idx}>{name}</li>
                  ))}
                </ul>
              </div>
            )} */}
            <StepContainer isActive={isActive}>
              {isActive ? step.icon : index < activeStep ? <CompletedIcon /> : <CircleIcon />}
              <StepText>
                <HeaderText placeholder={step.label} color={"#333"} />
                <TextOnTextFiled header={step.description} />
              </StepText>
            </StepContainer>

          </Step>
        );
      })}
    </Stepper>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import { Stepper, Step, StepConnector } from "@mui/material";
import { styled } from "@mui/system";
import { CompletedIcon, StepOneIcon, StepTwoIcon, StepThreeIcon, CircleIcon } from "./IconsStepper.js";

// מחבר מותאם אישית
const CustomConnector = styled(StepConnector)({
  "&.MuiStepConnector-root": {
    top: 10,
    left: "calc(50% - 2px)",
    height: "100%",
  },
});

// עיצוב כל שלב
const StepContainer = styled("div")(({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 20px",
  borderRadius: "20px",
  backgroundColor: isActive ? "#FEF2CC" : "transparent",
}));

const StepText = styled("div")({
  display: "flex",
  flexDirection: "column",
  textAlign: "right",
});

const StepTitle = styled("span")({
  fontWeight: "bold",
  color: "#333",
});

const StepSubtitle = styled("span")({
  fontSize: "14px",
  color: "#555",
});

const IconWrapper = styled("div")({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#FEF2CC",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const steps = [
  { label: "שלב ראשון", description: "פרטים ראשוניים על העסק", icon: <StepOneIcon /> },
  { label: "שלב שני", description: "כתובת ושעות נוספות", icon: <StepTwoIcon /> },
  { label: "שלב שלישי", description: "פרטי איש קשר", icon: <StepThreeIcon /> },
];

export default function Stepper2() {
  const activeStep = useSelector((state) => state.stepper.activeStep);

  return (
    <Stepper
      sx={{ direction: "rtl", height: "72px", backgroundColor: "white" }}
      activeStep={activeStep}
      orientation="vertical"
      connector={<CustomConnector />}
    >
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        return (
          <Step key={index} completed={index < activeStep}>
            <StepContainer isActive={isActive}>
              <IconWrapper>{isActive ? step.icon : index < activeStep ? <CompletedIcon /> : <CircleIcon />}</IconWrapper>
              <StepText>
                <StepTitle>{step.label}</StepTitle>
                <StepSubtitle>{step.description}</StepSubtitle>
              </StepText>
            </StepContainer>
          </Step>
        );
      })}
    </Stepper>
  );
}

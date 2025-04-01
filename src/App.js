import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StepOne from './componnets/StepOne';
import StepTwo from './componnets/StepTwo';
import StepThree from './componnets/StepThree';
import Control from './componnets/Control.js';
import { Box } from '@mui/material'; // במקום lucide-react

function App() {
  const activeStep = useSelector((state) => state.stepper.activeStep); // שליפת הסטפ הנוכחי מ-redux
  const dispatch = useDispatch();

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
      default:
        return <StepOne />;
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      gap: '18px',
      backgroundColor: '#F4F4F4',
      padding: "96px 100px 96px 100px",

    }}>
      <Box sx={{
        backgroundColor: '#FFFFFF',
        padding: '78px 109px',
        borderRadius: '40px',
        gap: '36px',
        flexShrink: "0"
      }}>
        {renderStepComponent()}
      </Box>
      <Box sx={{
        backgroundColor: '#FFFFFF',
        padding: '62px 83px',
        borderRadius: '40px',
        justifyContent: '10px',
        flexShrink: "1"
      }}>
        <Control />
      </Box>

    </Box>
  );
}

export default App;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StepOne from './componnets/StepOne';
import StepTwo from './componnets/StepTwo';
import StepThree from './componnets/StepThree';
import Control from './componnets/Control.js';
import { Box } from '@mui/material';

function App() {
  const activeStep = useSelector((state) => state.stepper.activeStep); 
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
      backgroundColor: '#F4F4F4',
      padding: '96px 99px 96px 101px',
      justifyContent: 'space-between'
    }}>
      <Box sx={{
        backgroundColor: '#FFFFFF',
        padding: '56.5px 72.25px',
        borderRadius: '40px',
        flexShrink: "0"

      }}>
        {renderStepComponent()}
      </Box>
      <Box sx={{
        backgroundColor: '#FFFFFF',
        padding: '46.5px 62.25px',
        borderRadius: '40px',
        justifyContent: 'space-between',
        flexShrink: "1"
      }}>
        <Control />
      </Box>

    </Box>
  );
}

export default App;

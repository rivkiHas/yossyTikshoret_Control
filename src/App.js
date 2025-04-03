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
      padding:  '72px 74px 72px 76px',
      justifyContent: 'space-around',
      height: '100vh',
      alignItems: 'stretch'
    }}>
      <Box sx={{
        backgroundColor: '#FFFFFF',
        padding: '56.5px 72.25px',
        borderRadius: '40px',
        width: '58%'
      }}>
        {renderStepComponent()}
      </Box>
      <Box sx={{
        backgroundColor: '#FFFFFF',
        padding: '46.5px 62.25px',
        borderRadius: '40px',
        width: '18%'
      }}>
        <Control />
      </Box>

    </Box>
  );
}

export default App;

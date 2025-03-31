import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StepOne from './componnets/StepOne';
import StepTwo from './componnets/StepTwo';
import StepThree from './componnets/StepThree';
import { nextStep, prevStep } from './redux/stepSlice.js'; // ייבוא הפעולות
import Control from './componnets/Control.js';
import StepZero from './componnets/stepZero.js';

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
    <div style={{
      display: 'flex',
      gap: '18px',
      backgroundColor: '#F4F4F4',
      padding: "72px 74.25px 72px 75.75px",

    }}>

        {renderStepComponent()}
        <Control />

    </div>
  );
}

export default App;

// App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StepOne from './componnets/StepOne';
import StepTwo from './componnets/StepTwo';
import StepThree from './componnets/StepThree';
import { nextStep, prevStep } from './redux/stepSlice.js'; // ייבוא הפעולות
// import Stepper2 from './componnets/Stepper2.js';
import Control from './componnets/Control.js';
import StepZero from './componnets/stepZero.js';

function App() {
  const activeStep = useSelector((state) => state.stepper.activeStep); // שליפת הסטפ הנוכחי מ-redux
  // const
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
      gap: '30px',
      backgroundColor: '#F4F4F4',
      // alignItems: 'center'
    }}>
      {renderStepComponent()}   
      <Control />
      
      {/* <div>
        <button onClick={() => dispatch(prevStep())}>שלב קודם</button>
        <button onClick={() => dispatch(nextStep())}>שלב הבא</button>
      </div> */}
    </div>
  );
}

export default App;

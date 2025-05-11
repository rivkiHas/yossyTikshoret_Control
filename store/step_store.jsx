import { createSlice } from '@reduxjs/toolkit';

const stepperSlice = createSlice({
  name: 'stepper',
  initialState: {
    activeStep: 0, // או כל שלב שתרצה להתחיל ממנו
  },
  reducers: {
    nextStep: (state) => {
      console.log("nextStep")
      if (state.activeStep < 2) { 
        state.activeStep += 1;
      }
    },
    prevStep: (state) => {
      console.log("prevStep")

      if (state.activeStep > 0) {
        state.activeStep -= 1;
      }
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
  },
});

export const { nextStep, prevStep, setActiveStep } = stepperSlice.actions;
export default stepperSlice.reducer;
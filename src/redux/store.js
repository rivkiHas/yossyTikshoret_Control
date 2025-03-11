import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import stepperReducer from './stepSlice'; // ודא שה-import של stepperReducer נכון
import brunchReducer from './brunchSlice';
import conectManReducer from './conectManSlice';
export const store = configureStore({
  reducer: {
    form: formReducer,
    stepper: stepperReducer,
    brunch: brunchReducer,
    conectMan: conectManReducer,
  },
});

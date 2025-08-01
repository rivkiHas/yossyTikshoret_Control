import { configureStore } from '@reduxjs/toolkit';
import stepReducer from './step_store';
import brunchReducer from './brunch_store'
import conectManReducer from './contact_man_store'
import formReducer from './form_store'
import formErrorsReducer from './form_errors_store'

const store = configureStore({
  reducer: {
    form: formReducer,
    stepper: stepReducer,
    brunch: brunchReducer,
    conectMan: conectManReducer,
    formErrors: formErrorsReducer,
  },
});

export default store;

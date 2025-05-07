import { configureStore } from '@reduxjs/toolkit';
import stepReducer from './step_store';
import brunchReducer from './brunch_store'
import conectManReducer from './contact_man_store'
import formReducer from './form_store'

const store = configureStore({
  reducer: {
    form: formReducer,
    stepper: stepReducer,
    brunch: brunchReducer,
    conectMan: conectManReducer,
  },
});

export default store;

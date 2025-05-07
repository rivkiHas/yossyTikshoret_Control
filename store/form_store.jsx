// src/redux/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        pertip:
        {
            name: '',
            email: '',
            id: '',
            phone: '',
            logo: null,
            typeMarketer: 'חנות',
            typeSales: []
        }


    },
    reducers: {
        setFormData: (state, action) => {
            // רק מעדכן את הערכים ששונו ולא מחליף את כל ה-state
            state.pertip = {
                ...state.pertip,
                ...action.payload
            };
        },
    },
});



export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
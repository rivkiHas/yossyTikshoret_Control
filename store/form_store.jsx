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
            state.pertip = {
                ...state.pertip,
                ...action.payload
            };
        },
    },
    
});



export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
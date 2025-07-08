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
            logo: '',
            typeMarketer: 'store',
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
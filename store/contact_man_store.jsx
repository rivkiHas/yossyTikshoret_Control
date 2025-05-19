import { createSlice } from '@reduxjs/toolkit';

const conectManSlice = createSlice({
    name: "conectManSlice",
    initialState: {
        contactMans:
            [{
                id: 1,
                contactManName: '',
                contactManPhone: '',
                contactManEmail: '',
                brunch: '',
                role: ''
            }],  // הוספת מזהה לכל איש קשר
    },
    reducers: {
        setFormData: (state, action) => {
            const { name, value, contactId } = action.payload;
            const contactIndex = state.contactMans.findIndex(contact => contact.id === contactId);
            if (contactIndex !== -1) {
                state.contactMans[contactIndex][name] = value;
            }
        },

        addContactMan: (state) => {
            const newId = state.contactMans.length > 0 ? state.contactMans[state.contactMans.length - 1].id + 1 : 1; // חישוב מזהה ייחודי חדש
            state.contactMans.push({
                id: newId,
                contactManName: '',
                contactManPhone: '',
                contactManEmail: '',
                brunch: '',
                role: '',   
            });
        },

        deleteContactMan: (state, action) => {
            state.contactMans = state.contactMans.filter(contact => contact.id !== action.payload); // מחיקת איש קשר לפי מזהה
        },

        removeLastContactMan: (state) => {
            if (state.contactMans.length > 1) {
                state.contactMans.splice(-1, 1); // מחיקת האובייקט האחרון במערך
            }
        },
        
    }
});

export const { setFormData, addContactMan, deleteContactMan } = conectManSlice.actions;
export default conectManSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const conectManSlice = createSlice({
    name: "conectManSlice",
    initialState: {
        contactMans: [{ id: 1, brunch: '', role: '' }],  // הוספת מזהה לכל איש קשר
    },
    reducers: {
        setFormData: (state, action) => {
            const { name, value, contactId } = action.payload;
            const contact = state.contactMans[contactId]; // אם אין איש קשר, יצירת אובייקט ריק
            contact[name] = value; // עדכון שדה ספציפי
            state.contactMans[contactId] = contact; // עדכון המערך
        },

        addContactMan: (state) => {
            const newId = state.contactMans.length > 0 ? state.contactMans[state.contactMans.length - 1].id + 1 : 1; // חישוב מזהה ייחודי חדש
            state.contactMans.push({
                id: newId, // הוספת מזהה חדש
                brunch: '', // שדה סניף חדש
                role: '',   // שדה תפקיד חדש
            });
        },

        deleteContactMan: (state, action) => {
            state.contactMans = state.contactMans.filter(contact => contact.id !== action.payload); // מחיקת איש קשר לפי מזהה
        },
        
        removeLastContactMan: (state) => {
            if (state.contactMans.length > 1) {
                state.contactMans.splice(-1, 1); // מחיקת האובייקט האחרון במערך
            }
        }
    }
});

export const { setFormData, addContactMan, deleteContactMan } = conectManSlice.actions;
export default conectManSlice.reducer;

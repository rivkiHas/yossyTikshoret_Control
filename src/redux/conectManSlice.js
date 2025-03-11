import { createSlice } from '@reduxjs/toolkit';

const conectManSlice = createSlice({
    name: "conectManSlice",
    initialState: {
        contactMans: [{}],  // התחל עם אובייקט ריק
    },
    reducers: {
        setFormData: (state, action) => {
            const { name, value, contactId } = action.payload;
            const contact = state.contactMans[contactId] || {}; // אם אין איש קשר, יצירת אובייקט ריק

            // עדכון השדה הספציפי בלבד
            contact[name] = value;

            // אם יש כבר אובייקט במערך, עדכון אותו, אחרת נוסיף אותו
            state.contactMans[contactId] = contact;
        },
        addContactMan: (state) => {
            // הוספת אובייקט ריק חדש לרשימה
            state.contactMans.push({
                brunch: '', // שדה סניף חדש
                role: '',   // שדה תפקיד חדש
            });
        },
    }
});

export const { setFormData, addContactMan } = conectManSlice.actions;
export default conectManSlice.reducer;

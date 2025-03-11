import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brunches: [{
        id: Date.now(),
        address: '',
        hoursOpen: Array(7).fill(""),
        hoursClose: Array(7).fill(""),
        name: "סניף חדש",  // שים לב שהוספתי שם ברירת מחדל
    }],
    activeBrunch: null
};

const brunchSlice = createSlice({
    name: "brunch",
    initialState,
    reducers: {
        addBrunch: (state, action) => {
            state.brunches.push(action.payload);  // מוסיף את הסניף החדש
        },
        setActiveBrunch: (state, action) => {
            state.activeBrunch = action.payload;  // הגדרת הסניף הפעיל
        },
        removeBrunch: (state, action) => {
            state.brunches = state.brunches.filter(brunch => brunch.id !== action.payload);
            if (state.activeBrunch && state.activeBrunch.id === action.payload) {
                state.activeBrunch = null;
            }
        },
        updateBrunchDetails: (state, action) => {
            // debugger;
            const { id, address, hoursOpen, hoursClose } = action.payload;
            const brunch = state.brunches.find(b => b.id === id);
            if (brunch) {
                if (address !== undefined) brunch.address = address;
                if (hoursOpen) {
                    brunch.hoursOpen = hoursOpen;  // עדכון מערך שעות הפתיחה
                }
                if (hoursClose) {
                    brunch.hoursClose = hoursClose;  // עדכון מערך שעות הסגירה
                }
            }
        }
    }
});

export const { addBrunch, setActiveBrunch, removeBrunch, updateBrunchDetails } = brunchSlice.actions;
export default brunchSlice.reducer;

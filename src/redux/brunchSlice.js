import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brunches: [{
        id: Date.now(),
        address: '',
        location: {
            lat: 32.0853,
            lng: 34.7818
        },
        hoursOpen: [{ day: 0, am: null, fromTime: "00:00", endTime: "00:00" }],  
        name: "סניף חדש"
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
            const { id, address, hoursOpen, hoursClose, location } = action.payload;
            const brunch = state.brunches.find(b => b.id === id);
            if (brunch) {
                if (address !== undefined) brunch.address = address;
                brunch.location = location;
                if (hoursOpen) {
                    const exist = brunch.hoursOpen.findIndex(x => x.am == hoursOpen.am && x.day == hoursOpen.day);
                    exist ? brunch.hoursOpen[exist] = hoursOpen : brunch.hoursOpen.push(hoursOpen);  // עדכון מערך שעות הפתיחה
                }

            }
        }
    }
});

export const { addBrunch, setActiveBrunch, removeBrunch, updateBrunchDetails } = brunchSlice.actions;
export default brunchSlice.reducer;

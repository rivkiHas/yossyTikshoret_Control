import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brunches: [
        {
            id: 0,
            address: 'רחוב רבנו תם 11, תל אביב 63304 ',
            location: {
                lat: 32.0853,
                lng: 34.7818
            },
            hoursOpen: [
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } }
            ],
            weekday: { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
            name: "סניף מספר 01"
        }
    ],

    activeBrunch: 0
    
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
            state.brunches = state.brunches.filter(brunch => brunch.id !== action.payload); // מחיקת איש קשר לפי מזהה

        },
        updateBrunchDetails: (state, action) => {

            const { id, address, hoursOpen, location, name, weekday } = action.payload;
            const brunch = state.brunches.find(b => b.id === id);
            if (brunch) {
                if (address !== undefined) brunch.address = address;
                brunch.location = location;
                brunch.name = name;
                if (weekday) {
                    const { period, type, value } = weekday;
                    brunch.weekday[period][type] = value;
                }
                if (hoursOpen) {
                    const { day, period, type, value } = hoursOpen;
                    brunch.hoursOpen[day][period][type] = value;
                }
            }
        }

    }
});

export const { addBrunch, setActiveBrunch, removeBrunch, updateBrunchDetails } = brunchSlice.actions;
export default brunchSlice.reducer;
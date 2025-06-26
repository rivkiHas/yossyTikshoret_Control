import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brunches: [
        {
            id: 0,
            address: "ינאי",
            location: {
                lat: 32.0853,
                lng: 34.7818
            },
            hoursOpen: [
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
                { morning: { open: "", close: "" }, evening: { open: "", close: "" } }
            ],
            name: " מספר 01"
        }
    ],

    activeBrunch: 0

};


const brunchSlice = createSlice({
    name: "brunch",
    initialState,
    reducers: {
        addBrunch: (state, action) => {
            state.brunches.push(action.payload);
        },
        setActiveBrunch: (state, action) => {
            state.activeBrunch = action.payload;
            console.log(action.payload);

        },
        removeBrunch: (state, action) => {
            state.brunches = state.brunches.filter(brunch => brunch.id !== action.payload);

        },
        updateBrunchDetails: (state, action) => {
            const { id, address, hoursOpen, location, name, weekday } = action.payload;
            const brunch = state.brunches.find(b => b.id === id);
            if (!brunch) return;

            if (address !== undefined) brunch.address = address;
            if (location !== undefined) brunch.location = location;
            if (name !== undefined) brunch.name = name;


            if (hoursOpen) {
                brunch.hoursOpen = hoursOpen; // מחליף את המערך כולו
            }

        }

    }
});

export const { addBrunch, setActiveBrunch, removeBrunch, updateBrunchDetails } = brunchSlice.actions;
export default brunchSlice.reducer;
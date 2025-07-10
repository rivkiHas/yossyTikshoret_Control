import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brunches: [
        {
            id: 0,
            address: "אדוריים, קרית גת, ישראל",
            location: {
                lat: 31.609538,
                lng: 34.751944
            },
            hoursOpen: [
                { morning: { open: "00:00", close: "00:00" }, evening: { open: "00:00", close: "00:00" } },
                { morning: { open: "00:00", close: "00:00" }, evening: { open: "00:00", close: "00:00" } },
                { morning: { open: "00:00", close: "00:00" }, evening: { open: "00:00", close: "00:00" } },
                { morning: { open: "00:00", close: "00:00" }, evening: { open: "00:00", close: "00:00" } },
                { morning: { open: "00:00", close: "00:00" }, evening: { open: "00:00", close: "00:00" } },
                { morning: { open: "00:00", close: "00:00" }, evening: { open: "00:00", close: "00:00" } },
                { morning: { open: "00:00", close: "00:00" }, evening: { open: "00:00", close: "00:00" } }
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
            console.log("active brunch", action.payload);
        },
        removeBrunch: (state, action) => {
            state.brunches = state.brunches.filter(brunch => brunch.id !== action.payload);

        },
        updateBrunchDetails: (state, action) => {
            console.log("update brunch details", action.payload.id);
            const { id, address, hoursOpen, location, name} = action.payload;
            const brunch = state.brunches.find(b => b.id === id);
            if (!brunch) return;
            if (address !== undefined) brunch.address = address;
            if (location !== undefined) brunch.location = location;
            if (name !== undefined) brunch.name = name;
            if (hoursOpen) {
                brunch.hoursOpen = hoursOpen;
            }

        }

    }
});

export const { addBrunch, setActiveBrunch, removeBrunch, updateBrunchDetails } = brunchSlice.actions;
export default brunchSlice.reducer;
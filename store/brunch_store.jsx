import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brunches: [
        {
            id: 0,
            address: "",
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
            state.brunches.push(action.payload);
        },
        setActiveBrunch: (state, action) => {
            state.activeBrunch = action.payload;
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

            if (weekday) {
                const { period, type, value } = weekday;
                if (!brunch.weekday) brunch.weekday = {};
                if (!brunch.weekday[period]) brunch.weekday[period] = {};
                brunch.weekday[period][type] = value;
            }

            if (hoursOpen) {
                const { day, period, type, value } = hoursOpen;
                if (!brunch.hoursOpen) brunch.hoursOpen = [];
                if (!brunch.hoursOpen[day]) brunch.hoursOpen[day] = { morning: {}, evening: {} };
                if (!brunch.hoursOpen[day][period]) brunch.hoursOpen[day][period] = {};
                brunch.hoursOpen[day][period][type] = value;
            }
        }

    }
});

export const { addBrunch, setActiveBrunch, removeBrunch, updateBrunchDetails } = brunchSlice.actions;
export default brunchSlice.reducer;
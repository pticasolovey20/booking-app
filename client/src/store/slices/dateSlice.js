import { createSlice } from "@reduxjs/toolkit";
import { startOfToday } from "date-fns";

const today = startOfToday();

const initialState = {
	checkIn: today.getTime(),
	checkOut: null,
	nights: 0,
	name: "",
	phone: "",
	maxGuests: 1,
};

const dateSlice = createSlice({
	name: "date",
	initialState,
	reducers: {
		setFromDateAction(state, action) {
			state.checkIn = action.payload;
		},
		setToDateAction(state, action) {
			state.checkOut = action.payload;
		},
		setNightsAction(state, action) {
			state.nights = action.payload;
		},
		setNameAction(state, action) {
			state.name = action.payload;
		},
		setPhoneAction(state, action) {
			state.phone = action.payload;
		},
		setMaxGuestsAction(state, action) {
			state.maxGuests = action.payload;
		},
	},
});

export const {
	setFromDateAction,
	setToDateAction,
	setNightsAction,
	setNameAction,
	setPhoneAction,
	setMaxGuestsAction,
} = dateSlice.actions;
export default dateSlice.reducer;

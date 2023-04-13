import { createSlice } from "@reduxjs/toolkit";
import { startOfToday } from "date-fns";

const today = startOfToday();

const initialState = {
	firstDate: today.getTime(),
	secondDate: null,
	nights: 0,
};

const dateSlice = createSlice({
	name: "date",
	initialState,
	reducers: {
		setFromDateAction(state, action) {
			state.firstDate = action.payload;
		},
		setToDateAction(state, action) {
			state.secondDate = action.payload;
		},
		setNightsAction(state, action) {
			state.nights = action.payload;
		},
	},
});

export const { setFromDateAction, setToDateAction, setNightsAction } = dateSlice.actions;
export default dateSlice.reducer;

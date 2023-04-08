import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	width: window.innerWidth,
};

const widthSlice = createSlice({
	name: "width",
	initialState,
	reducers: {
		setWidthAction(state, action) {
			state.width = action.payload;
		},
	},
});

export const { setWidthAction } = widthSlice.actions;
export default widthSlice.reducer;

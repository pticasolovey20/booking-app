import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	width: window.innerWidth,
	isMobile: false,
};

const widthSlice = createSlice({
	name: "width",
	initialState,
	reducers: {
		setWidthAction(state, action) {
			state.width = action.payload;
		},
		setIsMobileAction(state, action) {
			state.isMobile = action.payload;
		},
	},
});

export const { setWidthAction, setIsMobileAction } = widthSlice.actions;
export default widthSlice.reducer;

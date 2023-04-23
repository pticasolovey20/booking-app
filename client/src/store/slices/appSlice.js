import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	width: window.innerWidth,
	isMobile: false,
};

const appSlice = createSlice({
	name: "app",
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

export const { setWidthAction, setIsMobileAction } = appSlice.actions;
export default appSlice.reducer;

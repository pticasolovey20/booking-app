import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserAction(state, action) {
			state.user = action.payload;
		},

		removeUserAction(state) {
			state.user = {};
		},
	},
});

export const { setUserAction, removeUserAction } = userSlice.actions;
export default userSlice.reducer;

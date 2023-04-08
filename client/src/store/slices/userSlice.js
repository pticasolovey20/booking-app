import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
	"user/registerUser",
	async ({ name, email, password }) => {
		try {
			const { data } = await axios.post("/register", { name, email, password });
			return data;
		} catch (error) {
			return { error: error.message };
		}
	}
);

export const loginUser = createAsyncThunk("user/loginUser", async ({ email, password }) => {
	try {
		const { data } = await axios.post("/login", { email, password });
		return data;
	} catch (error) {
		return { error: error.message };
	}
});

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
	try {
		const { data } = await axios.get("/profile");
		return data;
	} catch (error) {
		return { error: error.message };
	}
});

const initialState = {
	user: {},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginAction(state, action) {
			state.user = action.payload;
		},

		logoutAction(state) {
			state.user = {};
		},
	},
	extraReducers: (builder) => {
		// user

		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.error = "";
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.error = action.payload;
		});

		// login

		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.error = "";
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.error = action.payload;
		});
	},
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;

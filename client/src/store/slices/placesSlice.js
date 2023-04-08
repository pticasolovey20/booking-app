import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPlaces = createAsyncThunk("allPlaces/fetchAllPlaces", async () => {
	try {
		const { data } = await axios.get("/places");
		return data;
	} catch (error) {
		return { error: error.message };
	}
});

export const fetchPlaceById = createAsyncThunk("place/fetchPlaceById", async (id) => {
	try {
		const { data } = await axios.get(`/places/${id}`);
		return data;
	} catch (error) {
		return { error: error.message };
	}
});

export const fetchUsersPlaces = createAsyncThunk("usersPlaces/fetchUsersPlaces", async () => {
	try {
		const { data } = await axios.get("/user-places");
		return data;
	} catch (error) {
		return { error: error.message };
	}
});

const initialState = {
	loading: false,
	error: "",
	places: [],
	place: {},
	showAllPhotos: false,
	userPlaces: [],
};

const placesSlice = createSlice({
	name: "places",
	initialState,
	reducers: {
		showAllPhotosAction(state, action) {
			state.showAllPhotos = action.payload;
		},
	},
	extraReducers: (builder) => {
		// all places

		builder.addCase(fetchAllPlaces.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchAllPlaces.fulfilled, (state, action) => {
			state.places = action.payload;
			state.error = "";
		});
		builder.addCase(fetchAllPlaces.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		// place by id

		builder.addCase(fetchPlaceById.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchPlaceById.fulfilled, (state, action) => {
			state.place = action.payload;
			state.error = "";
		});
		builder.addCase(fetchPlaceById.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		// user places

		builder.addCase(fetchUsersPlaces.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchUsersPlaces.fulfilled, (state, action) => {
			state.userPlaces = action.payload;
			state.error = "";
		});
		builder.addCase(fetchUsersPlaces.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export const { showAllPhotosAction } = placesSlice.actions;
export default placesSlice.reducer;

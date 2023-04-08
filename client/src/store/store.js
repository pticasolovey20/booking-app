import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import placesReducer from "./slices/placesSlice";

const rootReducer = combineReducers({ userReducer, placesReducer });

export const store = configureStore({
	reducer: rootReducer,
});

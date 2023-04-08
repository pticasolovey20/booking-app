import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import placesReducer from "./slices/placesSlice";
import widthReducer from "./slices/widthSlice";

const rootReducer = combineReducers({ userReducer, placesReducer, widthReducer });

export const store = configureStore({
	reducer: rootReducer,
});

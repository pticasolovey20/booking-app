import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({ userReducer });

export const store = configureStore({
	reducer: rootReducer,
});
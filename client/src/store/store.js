import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import placesReducer from "./slices/placesSlice";
import appReducer from "./slices/appSlice";
import dateReducer from "./slices/dateSlice";

const rootReducer = combineReducers({ userReducer, placesReducer, appReducer, dateReducer });

export const store = configureStore({
	reducer: rootReducer,
});

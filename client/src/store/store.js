import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import placesReducer from "./slices/placesSlice";
import widthReducer from "./slices/widthSlice";
import dateReducer from "./slices/dateSlice";

const rootReducer = combineReducers({ userReducer, placesReducer, widthReducer, dateReducer });

export const store = configureStore({
	reducer: rootReducer,
});

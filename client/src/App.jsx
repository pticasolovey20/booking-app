import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "./store/slices/userSlice";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { LayoutComponent } from "./components/layout/Layout";
import { AccLayoutComponent } from "./components/layout/AccLayout";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { BookingPage } from "./pages/BookingPage";
import { PlacesPage } from "./pages/PlacesPage";
import { PlacesFormPage } from "./pages/PlacesFormPage";
import { PlaceDetailPage } from "./pages/PlaceDetailPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const App = () => {
	const { user } = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		if (Object.keys(user).length === 0) {
			axios.get("/profile").then((data) => {
				dispatch(setUserAction(data.data));
			});
		}
	}, []);

	return (
		<div className="bg-primary text-white">
			<Routes>
				<Route path="/" element={<LayoutComponent />}>
					<Route index element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/account" element={<AccLayoutComponent />}>
						<Route path="/account/profile" element={<ProfilePage />} />
						<Route path="/account/bookings" element={<BookingPage />} />
						<Route path="/account/places" element={<PlacesPage />} />
						<Route path="/account/places/new" element={<PlacesFormPage />} />
						<Route path="/account/places/:id" element={<PlacesFormPage />} />
					</Route>
					<Route path="/place/:id" element={<PlaceDetailPage />} />
				</Route>
			</Routes>
		</div>
	);
};

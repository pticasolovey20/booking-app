import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import { setWidthAction, setIsMobileAction } from "./store/slices/widthSlice";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { LayoutComponent, AccountLayoutComponent } from "./components/layout-components";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { BookingsPage } from "./pages/BookingsPage";
import { BookingPage } from "./pages/BookingPage";
import { PlacesPage } from "./pages/PlacesPage";
import { PlacesFormPage } from "./pages/PlacesFormPage";
import { PlaceDetailPage } from "./pages/PlaceDetailPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const App = () => {
	const dispatch = useDispatch();
	const { width } = useSelector((state) => state.widthReducer);

	useEffect(() => {
		dispatch(fetchUser());
	}, []);

	useEffect(() => {
		const handleResize = () => dispatch(setWidthAction(window.innerWidth));
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [dispatch]);

	useEffect(() => {
		width < 744 ? dispatch(setIsMobileAction(true)) : dispatch(setIsMobileAction(false));
	}, [width]);

	return (
		<div className="bg-primary text-white">
			<Routes>
				<Route path="/" element={<LayoutComponent />}>
					<Route index element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/account" element={<AccountLayoutComponent />}>
						<Route path="/account/profile" element={<ProfilePage />} />
						<Route path="/account/bookings" element={<BookingsPage />} />
						<Route path="/account/bookings/:id" element={<BookingPage />} />
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

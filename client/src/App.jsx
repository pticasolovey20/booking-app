import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { LayoutComponent } from "./components/layout/Layout";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AccountPage } from "./pages/AccountPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const App = () => {
	return (
		<div className="bg-primary text-white">
			<Routes>
				<Route path="/" element={<LayoutComponent />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/account/:subpage?" element={<AccountPage />} />
					<Route path="/account/:subpage/:action" element={<AccountPage />} />
				</Route>
			</Routes>
		</div>
	);
};

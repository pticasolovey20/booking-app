import { Outlet } from "react-router-dom";

import { HeaderComponent } from "../header";

export const LayoutComponent = () => {
	return (
		<div className="flex flex-col min-h-screen py-4 px-8">
			<HeaderComponent />
			<Outlet />
		</div>
	);
};

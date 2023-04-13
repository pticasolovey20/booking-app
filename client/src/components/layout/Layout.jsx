import { Outlet } from "react-router-dom";

import { HeaderComponent } from "../header";

export const LayoutComponent = () => {
	return (
		<div className="flex flex-col min-h-screen px-8 pb-4">
			<HeaderComponent />
			<Outlet />
		</div>
	);
};

import { Outlet } from "react-router-dom";

import { HeaderComponent } from "../navigation-components/header";

export const LayoutComponent = () => {
	return (
		<div className="flex flex-col min-h-screen px-4 py-4">
			<HeaderComponent />
			<Outlet />
		</div>
	);
};

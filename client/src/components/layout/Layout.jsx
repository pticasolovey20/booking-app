import React from "react";
import { Outlet } from "react-router-dom";

import { HeaderComponent } from "../header";

export const LayoutComponent = () => {
	return (
		<div className="p-4 flex flex-col min-h-screen	">
			<HeaderComponent />
			<Outlet />
		</div>
	);
};

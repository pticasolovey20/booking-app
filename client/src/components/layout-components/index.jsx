import { Outlet } from "react-router-dom";

import { HeaderComponent } from "../navigation-components/header";
import { AccountMenuComponent } from "../navigation-components/account-menu";

export const LayoutComponent = () => {
	return (
		<div className="flex flex-col min-h-screen px-8 py-4">
			<HeaderComponent />
			<Outlet />
		</div>
	);
};

export const AccountLayoutComponent = () => {
	return (
		<div>
			<AccountMenuComponent />
			<Outlet />
		</div>
	);
};

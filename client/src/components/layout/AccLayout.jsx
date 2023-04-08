import { Outlet } from "react-router-dom";

import { AccountNavComponent } from "../account-nav";

export const AccLayoutComponent = () => {
	return (
		<div>
			<AccountNavComponent />
			<Outlet />
		</div>
	);
};

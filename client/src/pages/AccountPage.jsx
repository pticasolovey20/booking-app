import React from "react";
import { NavLink, useParams } from "react-router-dom";

import { PlacesPage } from "./PlacesPage";
import { SvgSelectorComponent } from "../components/svg-selector";

import { accountMenu } from "../constants";
import { styles } from "../styles/styles";

export const AccountPage = () => {
	const { subpage } = useParams();

	return (
		<div>
			<nav className="w-full flex justify-center mt-8 gap-2 mb-8">
				{accountMenu.map((link) => (
					<NavLink
						key={link.id}
						to={`/account/${link.id}`}
						className={({ isActive }) =>
							isActive
								? `${styles.button} inline-flex gap-1 bg-secondary`
								: `${styles.button} inline-flex gap-1 bg-tertiary text-black`
						}
					>
						<SvgSelectorComponent icon={link.id} />
						{link.title}
					</NavLink>
				))}
			</nav>
			{subpage === "places" && <PlacesPage />}
		</div>
	);
};

import { NavLink } from "react-router-dom";

import { SvgSelectorComponent } from "../svg-selector";

import { accountMenu } from "../../constants";
import { styles } from "../../styles/styles";

export const AccountNavComponent = () => {
	return (
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
	);
};

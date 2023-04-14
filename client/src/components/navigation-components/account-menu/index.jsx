import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { SvgSelectorComponent } from "../../svg-selector";

import { accountMenu } from "../../../constants";
import { styles } from "../../../styles/styles";

export const AccountMenuComponent = () => {
	const { isMobile } = useSelector((state) => state.widthReducer);

	return (
		<nav className="flex justify-center gap-2 my-6">
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
					<SvgSelectorComponent icon={link.id} h={24} w={24} />
					{!isMobile && link.title}
				</NavLink>
			))}
		</nav>
	);
};

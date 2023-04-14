import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { MarkupMenuComponent } from "../../markup-components";
import { TopButtonComponent } from "../buttons";
import { BottomMenuComponet } from "../bottom-menu";
import { SvgSelectorComponent } from "../../svg-selector";

import { buttons } from "../../../constants";
import { classNames } from "../../../utils";

export const HeaderComponent = () => {
	const { user } = useSelector((state) => state.userReducer);
	const { width, isMobile } = useSelector((state) => state.widthReducer);

	if (isMobile) {
		return <BottomMenuComponet />;
	}

	return (
		<header
			className={classNames(
				isMobile && "hidden",
				width > 870 && "grid grid-cols-3",
				width <= 870 && "flex justify-between"
			)}
		>
			{width > 870 && (
				<div className="flex justify-start">
					<Link to="/" className="flex items-center gap-1">
						<span className="font-bold text-2xl uppercase">booking</span>{" "}
					</Link>
				</div>
			)}
			<div className="flex justify-center">
				<MarkupMenuComponent>
					{buttons.map((button, index) => (
						<TopButtonComponent
							key={index}
							buttons={buttons}
							button={button}
							index={index}
						/>
					))}
				</MarkupMenuComponent>
			</div>
			<div className="flex justify-end">
				<MarkupMenuComponent>
					<button>
						<SvgSelectorComponent icon="menu" />
					</button>
					<Link
						to={Object.keys(user).length > 0 ? "/account/profile" : "/login"}
						className="border border-gray-500 rounded-full bg-gray-500 overflow-hidden"
					>
						<SvgSelectorComponent icon="user" />
					</Link>
					{!!user && <p className="text-lg font-medium">{user.name}</p>}
				</MarkupMenuComponent>
			</div>
		</header>
	);
};

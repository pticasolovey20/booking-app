import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { WrapperComponent } from "../layout/Wrapper";
import { SvgSelectorComponent } from "../svg-selector";
import { ButtonComponent } from "../nav-button";

import { bottomMenu, buttons } from "../../constants";

export const HeaderComponent = () => {
	const { user } = useSelector((state) => state.userReducer);
	const { width } = useSelector((state) => state.widthReducer);

	if (width < 768) {
		return (
			<div className="fixed right-0 bottom-0 z-10 flex items-center justify-around bg-primary py-4 px-2 min-w-full border-t-[1px] border-tertiary text-white text-sm">
				{bottomMenu.map((button, index) => (
					<button
						key={index}
						className="flex flex-col items-center gap-1"
						onClick={() => console.log(button)}
					>
						<SvgSelectorComponent icon={button} h={28} w={28} />
						{button}
					</button>
				))}
			</div>
		);
	}

	return (
		<header className={`${width > 768 ? "flex" : "hidden"} justify-between`}>
			<Link to="/" className="flex items-center gap-1">
				<span className="font-bold text-2xl uppercase text-white">booking</span>
			</Link>
			<WrapperComponent>
				{buttons.map((button, index) => (
					<ButtonComponent key={index} buttons={buttons} button={button} index={index} />
				))}
			</WrapperComponent>
			<WrapperComponent>
				<button>
					<SvgSelectorComponent icon="menu" />
				</button>
				<Link
					to={Object.keys(user).length > 0 ? "/account/profile" : "/login"}
					className="bg-gray-500 rounded-full border border-gray-500 overflow-hidden"
				>
					<SvgSelectorComponent icon="user" />
				</Link>
				{!!user && <p className="text-lg font-medium text-white">{user.name}</p>}
			</WrapperComponent>
		</header>
	);
};

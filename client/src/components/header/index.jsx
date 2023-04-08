import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { WrapperComponent } from "../layout/Wrapper";
import { SvgSelectorComponent } from "../svg-selector";
import { ButtonComponent } from "../nav-button";

import { buttons } from "../../constants";

export const HeaderComponent = () => {
	const { user } = useSelector((state) => state.userReducer);

	return (
		<header className="flex justify-between">
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

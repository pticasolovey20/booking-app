import React from "react";
import { Link } from "react-router-dom";

import { WrapperComponent } from "../layout/Wrapper";
import { SvgSelectorComponent } from "../svg-selector";
import { ButtonComponent } from "../button";

import { buttons } from "../../constants";

export const HeaderComponent = () => {
	return (
		<header className="flex justify-between">
			<a href="" className="flex items-center gap-1">
				<span className="font-bold text-2xl uppercase text-white">booking</span>
			</a>
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
					to="/account/profile"
					className="bg-gray-500 rounded-full border border-gray-500 overflow-hidden"
				>
					<SvgSelectorComponent icon="user" />
				</Link>
				<p className="text-lg font-medium text-white">Jhon Doe</p>
			</WrapperComponent>
		</header>
	);
};

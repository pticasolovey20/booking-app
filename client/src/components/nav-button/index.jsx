import React from "react";
import { SvgSelectorComponent } from "../svg-selector";

export const ButtonComponent = ({ buttons, button, index }) => {
	return (
		<button
			className={
				index === buttons.length - 1
					? "bg-secondary p-1 rounded-full"
					: "border-r border-gray-300 px-2 text-white"
			}
		>
			{index === buttons.length - 1 ? (
				<SvgSelectorComponent icon={button} h={20} w={20} />
			) : (
				button
			)}
		</button>
	);
};

import { SvgSelectorComponent } from "../../svg-selector";

export const TopButtonComponent = ({ buttons, button, index }) => {
	return (
		<button
			className={
				index === buttons.length - 1
					? "ml-3 p-1 rounded-full whitespace-nowrap text-white bg-pink-100"
					: "px-3 border-r-2 border-black border-opacity-50 whitespace-nowrap"
			}
		>
			{index === buttons.length - 1 ? (
				<SvgSelectorComponent icon={button} h={20} w={20} strokeWidth={2.5} />
			) : (
				button
			)}
		</button>
	);
};

export const ActionButtonComponent = ({ icon, text, handleClick, h, w, className }) => {
	return (
		<button className={className} onClick={handleClick}>
			<SvgSelectorComponent icon={icon} h={h} w={w} />
			{text}
		</button>
	);
};

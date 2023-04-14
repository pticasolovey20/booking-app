import { SvgSelectorComponent } from "../../svg-selector";

export const TopButtonComponent = ({ buttons, button, index }) => {
	return (
		<button
			className={
				index === buttons.length - 1
					? "p-1 rounded-full bg-secondary whitespace-nowrap"
					: "px-2 border-r border-gray-300 whitespace-nowrap"
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

export const ActionButtonComponent = ({ icon, h, w, text, handleClick }) => {
	return (
		<button className="flex gap-1 items-center text-[20px]" onClick={handleClick}>
			<SvgSelectorComponent icon={icon} h={h} w={w} />
			{text}
		</button>
	);
};

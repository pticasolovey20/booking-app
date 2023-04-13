import { SvgSelectorComponent } from "../svg-selector";

export const ActionButtonComponent = ({ icon, text, handleClick, h, w }) => {
	return (
		<button className="flex gap-1 items-center text-[20px]" onClick={handleClick}>
			<SvgSelectorComponent icon={icon} h={h} w={w} />
			{text}
		</button>
	);
};

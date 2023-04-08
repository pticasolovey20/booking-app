import { SvgSelectorComponent } from "../svg-selector";

export const ActionButtonComponent = ({ icon, text, handleClick }) => {
	return (
		<button className="flex gap-1 items-center text-[20px]" onClick={handleClick}>
			<SvgSelectorComponent icon={icon} />
			{text}
		</button>
	);
};

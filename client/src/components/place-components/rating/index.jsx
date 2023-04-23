import { SvgSelectorComponent } from "../../svg-selector";

export const RatingComponent = () => {
	return (
		<div className="flex gap-1 items-center cursor-pointer">
			<SvgSelectorComponent icon="rating" w={16} h={16} />
			<p>4,{(Math.random() * 100).toFixed()}</p>
		</div>
	);
};

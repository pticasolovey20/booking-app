import { SvgSelectorComponent } from "../svg-selector";

export const RatingComponent = () => {
	return (
		<div className="flex gap-1 items-center cursor-pointer">
			<SvgSelectorComponent icon="rating" />
			<p>4,{(Math.random() * 100).toFixed()}</p>
		</div>
	);
};

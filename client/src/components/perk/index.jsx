import { SvgSelectorComponent } from "../svg-selector";

export const PerkComponent = ({ perk, selected, onChange }) => {
	const handleClick = (event) => {
		const { checked, name } = event.target;

		checked
			? onChange([...selected, name])
			: onChange([...selected.filter((selectedName) => selectedName !== name)]);
	};

	return (
		<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
			<input type="checkbox" onChange={handleClick} name={perk.id} />
			<SvgSelectorComponent icon={perk.id} />
			<span>{perk.title}</span>
		</label>
	);
};

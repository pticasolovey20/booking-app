import { SvgSelectorComponent } from "../svg-selector";

export const PerkComponent = ({ perk, selected, onChange }) => {
	const handleClick = (event) => {
		const { checked, name } = event.target;

		checked
			? onChange([...selected, name])
			: onChange([...selected.filter((selectedName) => selectedName !== name)]);
	};

	return (
		<label className="flex justify-between items-center gap-2 p-4 border border-gray-800 rounded-xl shadow-lg shadow-black cursor-pointer">
			<div className="flex gap-4">
				<SvgSelectorComponent icon={perk} h={20} w={20} />
				<span className="uppercase">{perk}</span>
			</div>
			<input
				className="bg-transparent"
				checked={selected.includes(perk)}
				type="checkbox"
				onChange={handleClick}
				name={perk}
			/>
		</label>
	);
};

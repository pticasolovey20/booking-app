import { Link, useParams } from "react-router-dom";

import { SvgSelectorComponent } from "../components/svg-selector";

import { FormComponent } from "../components/form";

export const PlacesPage = () => {
	const { action } = useParams();

	return (
		<div>
			{action === "new" ? (
				<FormComponent />
			) : (
				<div className="text-center">
					<Link
						to={"/account/places/new"}
						className="inline-flex gap-1 text-white py-2 px-6 bg-secondary rounded-full"
					>
						<SvgSelectorComponent icon="plus" />
						Add new place
					</Link>
				</div>
			)}
		</div>
	);
};

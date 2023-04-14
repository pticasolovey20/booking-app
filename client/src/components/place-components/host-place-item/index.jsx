import { Link } from "react-router-dom";

import { PlaceImageComponent } from "../place-image";
import { PriceComponent } from "../price";
import { MarkupImageComponent, MarkupItemComponent } from "../../markup-components";

export const HostPlaceItemComponent = ({ place }) => {
	return (
		<MarkupItemComponent>
			<MarkupImageComponent>
				<PlaceImageComponent photo={place.photos[1]} className="object-cover" />
			</MarkupImageComponent>
			<div className="flex flex-col gap-2 p-4">
				<h2 className="flex-1 text-xl">{place.title}</h2>
				<p className="flex-text-sm text-gray-500">{place.description}</p>
				<div className="flex items-center justify-between">
					<PriceComponent place={place} />
					<Link
						to={"/account/places/" + place._id}
						className="px-4 py-1 border border-gray-500 rounded-xl"
					>
						Edit
					</Link>
				</div>
			</div>
		</MarkupItemComponent>
	);
};

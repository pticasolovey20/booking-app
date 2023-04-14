import { Link } from "react-router-dom";

import { PlaceImageComponent } from "../place-image";
import { SvgSelectorComponent } from "../../svg-selector";
import { RatingComponent } from "../rating";
import { PriceComponent } from "../price";

export const PlaceItemComponent = ({ place }) => {
	return (
		<div>
			<div className="relative flex rounded-2xl">
				{place?.photos?.[0] && (
					<Link to={"/place/" + place._id}>
						<PlaceImageComponent
							photo={place.photos[0]}
							className="aspect-square object-cover rounded-2xl"
						/>
					</Link>
				)}
				<button className="absolute right-2 top-2 p-1">
					<SvgSelectorComponent icon="heart" h={25} w={25} />
				</button>
			</div>
			<div className="flex flex-col gap-1 mt-4">
				<div className="flex justify-between gap-2">
					<h2 className="w-full truncate font-bold">{place.address}</h2>
					<RatingComponent />
				</div>
				<div className="text-gray-400">
					<p>Расстояние: 1945 километров</p>
				</div>
				<PriceComponent place={place} />
			</div>
		</div>
	);
};

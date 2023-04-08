import { Link } from "react-router-dom";

import { SvgSelectorComponent } from "../svg-selector";
import { RatingComponent } from "../rating";

export const PlaceItemComponent = ({ place }) => {
	return (
		<div>
			<div className="flex relative bg-gray-500 rounded-2xl">
				{place.photos?.[0] && (
					<Link to={"/place/" + place._id}>
						<img
							className="aspect-square object-cover rounded-2xl"
							src={"http://localhost:4000/uploads/" + place.photos?.[0]}
						/>
					</Link>
				)}
				<button className="absolute right-2 top-2 p-1">
					<SvgSelectorComponent icon="heart" />
				</button>
			</div>
			<div className="flex flex-col gap-1 mt-4">
				<div className="flex justify-between">
					<h2 className="font-bold">{place.address}</h2>
					<RatingComponent />
				</div>
				<div className="text-gray-400">
					<p>Расстояние: 1945 километров</p>
					<p>17-24 апр.</p>
				</div>
				<p>
					<span className="font-bold">$14 184</span> ночь
				</p>
			</div>
		</div>
	);
};

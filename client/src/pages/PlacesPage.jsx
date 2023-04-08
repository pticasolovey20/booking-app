import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersPlaces } from "../store/slices/placesSlice";

import { Link } from "react-router-dom";

import { SvgSelectorComponent } from "../components/svg-selector";

export const PlacesPage = () => {
	const dispatch = useDispatch();
	const { userPlaces } = useSelector((state) => state.placesReducer);

	useEffect(() => {
		dispatch(fetchUsersPlaces());
	}, []);

	return (
		<div>
			<div className="text-center">
				<Link
					to={"/account/places/new"}
					className="inline-flex gap-1 text-white py-2 px-6 bg-secondary rounded-full"
				>
					<SvgSelectorComponent icon="plus" />
					Add new place
				</Link>
			</div>
			<div className="mt-4">
				{userPlaces.length > 0 &&
					userPlaces.map((place) => (
						<Link
							key={place._id}
							to={"/account/places/" + place._id}
							className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl text-black"
						>
							<div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
								<img
									className="object-cover"
									src={"http://localhost:4000/uploads/" + place.photos[0]}
									alt="photos"
								/>
							</div>
							<div className="grow-0 shrink">
								<h2 className="text-xl">{place.title}</h2>
								<p className="text-sm mt-2">{place.description}</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

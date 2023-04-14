import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersPlaces } from "../store/slices/placesSlice";

import { MarkupPageComponent } from "../components/markup-components";
import { SvgSelectorComponent } from "../components/svg-selector";
import { HostPlaceItemComponent } from "../components/place-components/host-place-item";

export const PlacesPage = () => {
	const dispatch = useDispatch();
	const { userPlaces } = useSelector((state) => state.placesReducer);
	const { isMobile } = useSelector((state) => state.widthReducer);

	useEffect(() => {
		dispatch(fetchUsersPlaces());
	}, []);

	return (
		<MarkupPageComponent>
			<div
				className={`${
					isMobile && "justify-start"
				} fixed bottom-3 right-3 flex justify-center`}
			>
				<Link
					to={"/account/places/new"}
					className="inline-flex gap-2 text-white py-2 px-6 bg-secondary rounded-lg"
				>
					<SvgSelectorComponent icon="plus" />
					Add new place
				</Link>
			</div>
			<div className="flex flex-col gap-4">
				{userPlaces.length > 0 &&
					userPlaces.map((place) => (
						<HostPlaceItemComponent key={place._id} place={place} />
					))}
			</div>
		</MarkupPageComponent>
	);
};

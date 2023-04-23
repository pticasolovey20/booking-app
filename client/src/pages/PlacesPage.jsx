import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersPlaces } from "../store/slices/placesSlice";

import { MarkupPageComponent } from "../components/markup-components";
import { SvgSelectorComponent } from "../components/svg-selector";
import { HostPlaceItemComponent } from "../components/place-components/host-place-item";
import { styles } from "../styles/styles";

export const PlacesPage = () => {
	const dispatch = useDispatch();
	const { userPlaces } = useSelector((state) => state.placesReducer);
	const { isMobile } = useSelector((state) => state.appReducer);

	useEffect(() => {
		dispatch(fetchUsersPlaces());
	}, []);

	return (
		<MarkupPageComponent>
			{!isMobile && (
				<div className="fixed bottom-5 right-5 flex justify-center z-20">
					<Link
						to={"/account/places/new"}
						className="flex gap-2 text-white p-3 bg-secondary border-2 border-primary rounded-full shadow-lg shadow-secondary"
					>
						<SvgSelectorComponent icon="plus" h={25} w={25} />
					</Link>
				</div>
			)}
			<div className="flex flex-col gap-4">
				{userPlaces.length > 0 &&
					userPlaces.map((place) => (
						<HostPlaceItemComponent key={place._id} place={place} />
					))}
			</div>
		</MarkupPageComponent>
	);
};

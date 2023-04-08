import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlaces } from "../store/slices/placesSlice";

import { PlaceItemComponent } from "../components/place-item";

import { styles } from "../styles/styles";

export const HomePage = () => {
	const dispatch = useDispatch();
	const { places } = useSelector((state) => state.placesReducer);

	useEffect(() => {
		dispatch(fetchAllPlaces());
	}, []);

	return (
		<div className={`${styles.grid} gap-x-6 gap-y-10 mt-8`}>
			{places.length > 0 &&
				places.map((place) => <PlaceItemComponent key={place._id} place={place} />)}
		</div>
	);
};

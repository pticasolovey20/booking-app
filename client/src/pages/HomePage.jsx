import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { styles } from "../styles/styles";
import { SvgSelectorComponent } from "../components/svg-selector";
import { PlaceItemComponent } from "../components/place-item";

export const HomePage = () => {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		axios.get("/places").then((response) => {
			setPlaces(response.data);
		});
	}, []);

	return (
		<div className={`${styles.grid} gap-x-6 gap-y-10 mt-8`}>
			{places.length > 0 &&
				places.map((place) => <PlaceItemComponent key={place._id} place={place} />)}
		</div>
	);
};

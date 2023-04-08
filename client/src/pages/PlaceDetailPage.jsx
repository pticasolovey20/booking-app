import { useDispatch, useSelector } from "react-redux";
import { fetchPlaceById } from "../store/slices/placesSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { GalleryDetailComponent } from "../components/gallery-detail";
import { PlaceGalleryComponent } from "../components/place-gallery";
import { RatingComponent } from "../components/rating";
import { SvgSelectorComponent } from "../components/svg-selector";
import { ActionButtonComponent } from "../components/action-button";

import { generateRandomNumber } from "../utils/randomNumber";

export const PlaceDetailPage = () => {
	const dispatch = useDispatch();
	const { place, showAllPhotos } = useSelector((state) => state.placesReducer);

	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchPlaceById(id));
	}, [id]);

	if (showAllPhotos) {
		return <GalleryDetailComponent />;
	}

	return (
		<div className="flex justify-center text-white">
			<div className="mt-4 -mx-8 px-8 py-8 max-w-6xl">
				<h1 className="text-3xl">{place.title}</h1>
				<div className="flex items-center justify-between">
					<div className="flex gap-2 items-center">
						<RatingComponent />
						<p>{generateRandomNumber("tens")} reviews</p>
						<div className="flex gap-1 items-center">
							<SvgSelectorComponent icon="pined" />
							Superhost
						</div>
						<a className="my-2 block font-semibold underline">{place.address}</a>
					</div>
					<div className="flex gap-6 text-[20px]">
						<ActionButtonComponent icon="share" text="Share" />
						<ActionButtonComponent icon="heart" text="Save" />
					</div>
				</div>
				<PlaceGalleryComponent />
			</div>
		</div>
	);
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFromDateAction, setToDateAction } from "../store/slices/dateSlice";
import { fetchPlaceById } from "../store/slices/placesSlice";
import { useParams } from "react-router-dom";

import { GalleryDetailComponent } from "../components/gallery-detail";
import { PlaceGalleryComponent } from "../components/place-gallery";
import { RatingComponent } from "../components/rating";
import { SvgSelectorComponent } from "../components/svg-selector";
import { ActionButtonComponent } from "../components/action-button";
import { BookingWidgetComponent } from "../components/booking-widget";
import { DatePickerComponent } from "../components/date-picker";

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
				<div className="grid grid-cols-3 mt-10 pb-[50px] border-b border-gray-400">
					<div className="col-span-2 pr-[60px] text-gray-400">
						<div className="flex flex-col gap-2 border-b border-gray-500 pb-[30px]">
							<h1 className="text-2xl text-white font-semibold">Description</h1>
							<p>{place.description}</p>
							<p>
								If this cottage is booked for dates that interest you, check out the
								other two!
							</p>
						</div>
						<div className="flex flex-col gap-2 py-[30px]">
							<h1 className="text-2xl text-white font-semibold">
								What amenities await you
							</h1>
							<div className="flex flex-wrap gap-3 py-4 uppercase">
								{place?.perks?.length > 0 &&
									place.perks.map((perk) => (
										<div key={perk} className="w-[49%] flex gap-2">
											<SvgSelectorComponent icon={perk} />
											<h2>{perk}</h2>
										</div>
									))}
							</div>
							<button className="w-1/3 border border-gray-400 rounded-lg py-2 text-white">
								Show all facilities
							</button>
						</div>
						<div className="flex gap-4">
							<DatePickerComponent setDate={setFromDateAction} />
							<DatePickerComponent setDate={setToDateAction} />
						</div>
					</div>
					<BookingWidgetComponent />
				</div>
			</div>
		</div>
	);
};

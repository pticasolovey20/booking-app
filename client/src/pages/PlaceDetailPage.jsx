import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFromDateAction, setToDateAction } from "../store/slices/dateSlice";
import { fetchPlaceById } from "../store/slices/placesSlice";
import { useParams, Link } from "react-router-dom";

import { GalleryDetailComponent } from "../components/place-components/gallery-detail";
import { PlaceGalleryComponent } from "../components/place-components/place-gallery";
import { PlaceImageComponent } from "../components/place-components/place-image";
import { RatingComponent } from "../components/place-components/rating";
import { SvgSelectorComponent } from "../components/svg-selector";
import { ActionButtonComponent } from "../components/navigation-components/buttons";
import { BookingWidgetComponent } from "../components/booking-widget";
import { DatePickerComponent } from "../components/date-picker";

import { generateRandomNumber } from "../utils";

export const PlaceDetailPage = () => {
	const [selectedFirstDay, setSelectedFirstDay] = useState(null);
	const [selectedSecondDay, setSelectedSecondDay] = useState(null);

	const dispatch = useDispatch();
	const { place, showAllPhotos } = useSelector((state) => state.placesReducer);
	const { width, isMobile } = useSelector((state) => state.appReducer);

	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchPlaceById(id));
	}, [id]);

	if (showAllPhotos) {
		return <GalleryDetailComponent />;
	}

	return (
		<div className="flex justify-center text-white">
			<div
				className={`${!isMobile && "py-8 px-8"} ${
					width < 768 && "pb-[100px]"
				} mt-0 -mx-8 max-w-6xl`}
			>
				{isMobile && (
					<div>
						<div className="flex w-full justify-between absolute top-5 left-0 px-4 text-black">
							<Link
								to="/"
								className="p-2 border border-black rounded-full bg-white shadow-black shadow-md"
							>
								<SvgSelectorComponent icon="left" />
							</Link>
							<div className="flex gap-4">
								<button className="p-2 border border-black rounded-full bg-white shadow-black shadow-md">
									<SvgSelectorComponent icon="share" w={24} h={24} />
								</button>
								<button className="p-2 border border-black rounded-full bg-white shadow-black shadow-md">
									<SvgSelectorComponent icon="heart" w={24} h={24} />
								</button>
							</div>
						</div>
						{place.photos?.[0] && (
							<PlaceImageComponent place={place} className="object-cover" />
						)}
					</div>
				)}
				<div className={`${isMobile && "px-4"}`}>
					<h1 className="text-xl font-semibold mt-4 sm:text-2xl md:text-3xl ">
						{place.title}
					</h1>
					<div className={`${isMobile && "py-4"} flex items-center justify-between`}>
						<div
							className={`${isMobile && "flex-col"} flex gap-2 ${
								!isMobile && "items-center"
							}`}
						>
							<RatingComponent />
							<p>{generateRandomNumber("tens")} reviews</p>
							<div className="flex gap-1 items-center">
								<SvgSelectorComponent icon="pined" w={16} h={16} />
								Superhost
							</div>
							<a className="my-2 block font-semibold underline">{place.address}</a>
						</div>
						{!isMobile && (
							<div className="flex gap-6 text-[20px]">
								<ActionButtonComponent icon="share" text="Share" w={24} h={24} />
								<ActionButtonComponent icon="heart" text="Save" w={24} h={24} />
							</div>
						)}
					</div>
					{!isMobile && <PlaceGalleryComponent />}

					<div
						className={`${isMobile ? "flex flex-col gap-4" : "grid grid-cols-5 mt-8"}`}
					>
						<div className={`${!isMobile && "pr-5"} col-span-3 text-gray-400`}>
							<div className="flex flex-col gap-2 border-b border-gray-500 pb-[30px]">
								<h1 className="text-2xl text-white font-semibold">Description</h1>
								<p>{place.description}</p>
								<p>
									If this cottage is booked for dates that interest you, check out
									the other two!
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
												<SvgSelectorComponent icon={perk} h={20} w={20} />
												<h2>{perk}</h2>
											</div>
										))}
								</div>
								<button className="w-1/2 border border-gray-400 rounded-lg py-2 px-2 text-white">
									Show all facilities
								</button>
							</div>
							<div
								className={`${width > 743 && width < 1052 && "flex-col gap-6"} ${
									width < 541 && "flex-col gap-4"
								} flex gap-4`}
							>
								<DatePickerComponent
									setDate={setFromDateAction}
									selectedFirstDay={selectedFirstDay}
									setSelectedDay={setSelectedFirstDay}
								/>
								<DatePickerComponent
									setDate={setToDateAction}
									selectedSecondDay={selectedSecondDay}
									setSelectedDay={setSelectedSecondDay}
								/>
							</div>
						</div>
						{!isMobile && <BookingWidgetComponent />}
					</div>
				</div>
			</div>
		</div>
	);
};

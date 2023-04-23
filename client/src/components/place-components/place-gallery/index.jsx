import { useDispatch, useSelector } from "react-redux";
import { showAllPhotosAction } from "../../../store/slices/placesSlice";

import { PlaceImageComponent } from "../place-image";
import { SvgSelectorComponent } from "../../svg-selector";

import { imageClasses } from "../../../constants";

export const PlaceGalleryComponent = () => {
	const dispatch = useDispatch();
	const { place } = useSelector((state) => state.placesReducer);

	return (
		<div className="relative">
			{place.photos && (
				<div className="grid grid-cols-2 gap-2">
					<div>
						{place.photos?.[0] && (
							<button onClick={() => dispatch(showAllPhotosAction(true))}>
								<PlaceImageComponent
									photo={place.photos[0]}
									className="aspect-square object-cover rounded-s-2xl"
								/>
							</button>
						)}
					</div>
					<div>
						<div className="grid grid-cols-2 grid-rows-2 gap-2">
							{place?.photos?.length > 0 &&
								place.photos.slice(1, place.photos.length).map((photo, index) => (
									<button
										key={photo}
										onClick={() => dispatch(showAllPhotosAction(true))}
									>
										<PlaceImageComponent
											photo={place.photos[index + 1]}
											className={imageClasses[index]}
										/>
									</button>
								))}
						</div>
					</div>
					<button
						onClick={() => dispatch(showAllPhotosAction(true))}
						className="flex items-center gap-1 absolute bottom-4 right-2 py-2 px-4 bg-white rounded-2xl opacity-75 text-black"
					>
						<SvgSelectorComponent icon="more" w={24} h={24} />
						Show more photos
					</button>
				</div>
			)}
		</div>
	);
};

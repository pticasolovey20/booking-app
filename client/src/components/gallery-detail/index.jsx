import { useDispatch, useSelector } from "react-redux";
import { showAllPhotosAction } from "../../store/slices/placesSlice";

import { ActionButtonComponent } from "../action-button";

export const GalleryDetailComponent = () => {
	const dispatch = useDispatch();
	const { place } = useSelector((state) => state.placesReducer);

	return (
		<div className="absolute inset-0 bg-black min-h-screen">
			<div className="bg-black">
				<div className="mx-auto max-w-4xl p-8 flex flex-col gap-4">
					<div className="fixed left-8">
						<ActionButtonComponent
							icon="close"
							text="Close"
							handleClick={() => dispatch(showAllPhotosAction(false))}
						/>
					</div>
					<div className="fixed right-8 flex justify-end">
						<div className="flex gap-4 items-center">
							<ActionButtonComponent icon="share" text="Share" h={24} w={24} />
							<ActionButtonComponent icon="heart" text="Save" h={24} w={24} />
						</div>
					</div>
					{place?.photos?.length > 0 &&
						place.photos.map((photo, index) => (
							<img
								key={index}
								className="object-cover w-full"
								src={"http://localhost:4000/uploads/" + photo}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

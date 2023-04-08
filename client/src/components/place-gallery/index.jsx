import { SvgSelectorComponent } from "../svg-selector";

export const PlaceGalleryComponent = ({ place, handleClick }) => {
	return (
		<div className="relative">
			<div className="grid grid-cols-2 gap-2">
				<div>
					{place.photos?.[0] && (
						<div>
							<img
								className="aspect-square object-cover rounded-s-2xl"
								src={"http://localhost:4000/uploads/" + place.photos[0]}
							/>
						</div>
					)}
				</div>
				<div>
					{place.photos && (
						<div className="grid grid-cols-2 grid-rows-2 gap-2">
							<img
								className="aspect-square object-cover"
								src={"http://localhost:4000/uploads/" + place.photos[1]}
								alt="photo:1"
							/>
							<img
								className="aspect-square object-cover rounded-se-2xl"
								src={"http://localhost:4000/uploads/" + place.photos[2]} //
								alt="photo:2"
							/>
							<img
								className="aspect-square object-cover"
								src={"http://localhost:4000/uploads/" + place.photos[3]}
								alt="photo:3"
							/>
							<img
								className="aspect-square object-cover rounded-br-2xl"
								src={"http://localhost:4000/uploads/" + place.photos[4]} //
								alt="photo:4"
							/>
						</div>
					)}
				</div>
				<button
					onClick={handleClick}
					className="flex items-center gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl opacity-75 text-black"
				>
					<SvgSelectorComponent icon="more" />
					Show more photos
				</button>
			</div>
		</div>
	);
};

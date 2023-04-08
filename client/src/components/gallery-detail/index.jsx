import { ActionButtonComponent } from "../action-button";

export const GalleryDetailComponent = ({ place, handleClick }) => {
	return (
		<div className="absolute inset-0 bg-black min-h-screen">
			<div className="bg-black">
				<div className="mx-auto max-w-4xl p-8 flex flex-col gap-4">
					<div className="fixed left-8">
						<ActionButtonComponent
							icon="close"
							text="Close"
							handleClick={handleClick}
						/>
					</div>
					<div className="fixed right-8 flex justify-end">
						<div className="flex gap-4 items-center">
							<ActionButtonComponent icon="share" text="Share" />
							<ActionButtonComponent icon="heart" text="Save" />
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

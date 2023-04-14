import { Link } from "react-router-dom";

import { MarkupItemComponent, MarkupImageComponent } from "../../markup-components";
import { PlaceImageComponent } from "../place-image";
import { PriceComponent } from "../price";
import { RatingComponent } from "../rating";
import { SvgSelectorComponent } from "../../svg-selector";

export const BookingItemComponent = ({ booking }) => {
	return (
		<MarkupItemComponent>
			<MarkupImageComponent>
				<PlaceImageComponent photo={booking.place.photos[1]} className="object-cover" />
			</MarkupImageComponent>
			<div className="flex flex-col gap-2 p-4">
				<div className="flex justify-between">
					<h2 className="text-xl">{booking.place.title}</h2>
					<RatingComponent />
				</div>
				<div className="flex gap-1">
					<SvgSelectorComponent icon="" />
					<p className="text-md text-gray-200 underline">{booking.place.address}</p>
				</div>
				<p className="flex-1 text-sm text-gray-500">{booking.place.description}</p>
				<div className="flex items-center justify-between">
					<PriceComponent place={booking.place} />
					<Link
						to={"/account/bookings/" + booking.place._id}
						className="px-4 py-1 border border-gray-500 rounded-xl"
					>
						Pay
					</Link>
				</div>
			</div>
		</MarkupItemComponent>
	);
};

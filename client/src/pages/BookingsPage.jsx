import { useEffect, useState } from "react";
import axios from "axios";

import { MarkupPageComponent } from "../components/markup-components";
import { BookingItemComponent } from "../components/place-components/booking-item";

export const BookingsPage = () => {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		axios.get("/bookings").then((response) => {
			setBookings(response.data);
		});
	}, []);

	return (
		<MarkupPageComponent>
			{bookings?.length > 0 &&
				bookings.map((booking) => (
					<BookingItemComponent key={booking._id} booking={booking} />
				))}
		</MarkupPageComponent>
	);
};

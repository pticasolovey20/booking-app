import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { format, toDate } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
	setNightsAction,
	setNameAction,
	setPhoneAction,
	setMaxGuestsAction,
} from "../../store/slices/dateSlice";
import axios from "axios";

import { PriceComponent } from "../place-components/price";
import { RatingComponent } from "../place-components/rating";

import { generateRandomNumber } from "../../utils";

export const BookingWidgetComponent = () => {
	const [redirect, setRedirect] = useState("");

	const dispatch = useDispatch();

	const { checkIn, checkOut, nights, name, phone, maxGuests } = useSelector(
		(state) => state.dateReducer
	);
	const { place } = useSelector((state) => state.placesReducer);
	const { width } = useSelector((state) => state.widthReducer);

	useEffect(() => {
		if (typeof checkOut === "number") {
			dispatch(setNightsAction((checkOut - checkIn) / (24 * 3600) / 1000));
		}
	}, [dispatch, checkOut]);

	const handleBook = async () => {
		const response = await axios.post("/bookings", {
			checkIn,
			checkOut,
			maxGuests,
			name,
			phone,
			price: nights * place.price,
			place: place._id,
		});
		const bookingId = response.data._id;
		setRedirect(`/account/bookings/${bookingId}`);
	};

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<div className="h-auto col-span-2">
			<div className="sticky top-10 text-white p-6 rounded-2xl border border-gray-800 bg-[#0c1335] shadow-lg shadow-black">
				<div
					className={`${width < 1023 && "flex-col gap-2"} flex justify-between ${
						width > 1023 && "items-end"
					}`}
				>
					<div className="flex gap-2 h-full items-end">
						<PriceComponent place={place} />
					</div>
					<div className="flex gap-2 items-center">
						<RatingComponent />
						<p className="text-gray-500 underline">
							{generateRandomNumber("tens")} reviews
						</p>
					</div>
				</div>
				<div className="mt-6 flex flex-wrap justify-between border border-gray-400 rounded-xl text-sm">
					<div
						className={`flex flex-col justify-between w-full md:w-1/2 p-4 rounded-tl-xl ${
							width > 768 && "border-r border-gray-400"
						}`}
					>
						<p className="text-xs uppercase truncate overflow-hidden">arrival</p>
						{format(toDate(checkIn), "dd.MM.yyyy")}
					</div>
					<div
						className={`flex flex-col justify-between w-full md:w-1/2 p-4 ${
							width > 768 && "rounded-tr-xl"
						} ${width < 768 && "border-t border-gray-400"}`}
					>
						<p className="text-xs uppercase truncate overflow-hidden">checkout</p>
						{checkOut > checkIn ? format(toDate(checkOut), "dd.MM.yyyy") : null}
					</div>
					<div className="flex items-center justify-between w-full p-4 rounded-b-lg border-t border-gray-400">
						<p className="text-[16px]">maximum guests:</p>
						<input
							type="number"
							className="outline-none bg-transparent border border-gray-400 p-2 rounded-lg text-lg w-1/2"
							value={maxGuests}
							onChange={(event) => dispatch(setMaxGuestsAction(event.target.value))}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-4 py-4">
					<div className="flex items-center justify-between border border-gray-400 rounded-xl px-4 py-2">
						<p className="text-sm">Name: </p>
						<input
							type="text"
							className="w-1/2 outline-none bg-transparent"
							placeholder="Jhon Doe"
							value={name}
							onChange={(event) => dispatch(setNameAction(event.target.value))}
						/>
					</div>
					<div className="flex items-center justify-between border border-gray-400 rounded-xl px-4 py-2">
						<p className="text-sm">Phone:</p>
						<input
							type="text"
							className="w-1/2 outline-none bg-transparent"
							placeholder="+380"
							value={phone}
							onChange={(event) => dispatch(setPhoneAction(event.target.value))}
						/>
					</div>
				</div>
				<button onClick={handleBook} className="w-full mt-2 py-3 bg-secondary rounded-xl">
					Book
				</button>
				<p className="text-sm text-center text-gray-500 mt-3">You pay anything yet</p>
				<div className="flex flex-col text-gray-500 py-6 border-b border-gray-400">
					<div className="flex justify-between mt-2">
						<p className="underline">
							${place.price} x {nights > 0 && nights} nights
						</p>
						<p>${checkOut > checkIn ? place.price * nights : 0}</p>
					</div>
					<div className="flex justify-between mt-2">
						<p className="underline">Cleaning fee</p>
						<p>${checkOut > checkIn ? ((place.price / 10) * nights).toFixed() : 0}</p>
					</div>
					<div className="flex justify-between mt-2">
						<p className="underline">Service fee Airbnb</p>
						<p>
							${checkOut > checkIn ? ((place.price / 10) * 2 * nights).toFixed() : 0}
						</p>
					</div>
				</div>
				<div className="flex justify-between font-semibold mt-6">
					<h3>Total (excluding taxes)</h3>
					<p>
						$
						{checkOut > checkIn
							? (
									place.price * nights +
									(place.price / 10) * nights +
									(place.price / 10) * 2 * nights
							  ).toFixed()
							: 0}
					</p>
				</div>
			</div>
		</div>
	);
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNightsAction } from "../../store/slices/dateSlice";

import { RatingComponent } from "../rating";
import { SvgSelectorComponent } from "../svg-selector";

import { generateRandomNumber } from "../../utils/randomNumber";
import { format, toDate } from "date-fns";

export const BookingWidgetComponent = () => {
	// const [nights, setNights] = useState(0);
	const dispatch = useDispatch();

	const { firstDate, secondDate, nights } = useSelector((state) => state.dateReducer);
	const { place } = useSelector((state) => state.placesReducer);

	useEffect(() => {
		if (typeof secondDate === "number") {
			dispatch(setNightsAction((secondDate - firstDate) / (24 * 3600) / 1000));
		}
	}, [dispatch, secondDate]);

	return (
		<div className="sticky top-10 h-[550px] col-span-1 text-white  p-6 rounded-2xl border border-gray-800 bg-[#0c1335] shadow-inner shadow-lg shadow-[#0c1335]">
			<div className="flex justify-between">
				<div className="flex gap-2 h-full items-end">
					<h1 className="text-2xl font-semibold">$76</h1>
					<p> per night</p>
				</div>
				<div className="flex gap-2 items-center">
					<RatingComponent />
					<p className="text-gray-500 underline">
						{generateRandomNumber("tens")} reviews
					</p>
				</div>
			</div>
			<div className="mt-6 flex flex-wrap border border-gray-400 rounded-xl">
				<div className="w-full md:w-1/2 p-4 rounded-tl-xl border-r border-gray-400">
					<p className="text-xs uppercase">arrival</p>
					{format(toDate(firstDate), "dd.MM.yyyy")}
				</div>
				<div className="w-full md:w-1/2 p-4 rounded-tr-xl">
					<p className="text-xs uppercase">checkout</p>
					{secondDate > firstDate
						? format(toDate(secondDate), "dd.MM.yyyy")
						: "--.--.----"}
				</div>
				<div className="flex justify-between w-full p-4 rounded-b-lg border-t border-gray-400">
					<div className="flex flex-col">
						<p className="text-xs uppercase">for whom</p>
						<p className="text-sm">maximum guests: {place?.maxGuests}</p>
					</div>
					<button className="">
						<SvgSelectorComponent icon="down" />
					</button>
				</div>
			</div>
			<button className="w-full mt-6 py-3 bg-secondary rounded-xl">Book</button>
			<p className="text-sm text-center text-gray-500 mt-3">You pay anything yet</p>
			<div className="flex flex-col text-gray-500 py-6 border-b border-gray-400">
				<div className="flex justify-between mt-2">
					<p className="underline">{`$${
						76 * nights > 0 ? 76 * nights : 0
					} per nights`}</p>
					<p>${secondDate > firstDate ? 76 * nights : 0}</p>
				</div>
				<div className="flex justify-between mt-2">
					<p className="underline">Cleaning fee</p>
					<p>${secondDate > firstDate ? (7.6 * nights).toFixed() : 0}</p>
				</div>
				<div className="flex justify-between mt-2">
					<p className="underline">Service fee Airbnb</p>
					<p>${secondDate > firstDate ? (14.2 * nights).toFixed() : 0}</p>
				</div>
			</div>
			<div className="flex justify-between font-semibold mt-6">
				<h3>Total (excluding taxes)</h3>
				<p>
					$
					{secondDate > firstDate
						? (76 * nights + 7.6 * nights + 14.2 * nights).toFixed()
						: 0}
				</p>
			</div>
		</div>
	);
};

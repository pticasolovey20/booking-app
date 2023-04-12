import { useState } from "react";
import { useDispatch } from "react-redux";

import {
	add,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	getDay,
	isEqual,
	isSameMonth,
	isToday,
	parse,
	startOfToday,
	startOfWeek,
} from "date-fns";

import { SvgSelectorComponent } from "../svg-selector";

import { colStartClasses, weekDays } from "../../constants";

export const DatePickerComponent = ({ setDate }) => {
	const today = startOfToday();
	const dispatch = useDispatch();

	const [selectedDay, setSelectedDay] = useState();
	const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));

	const firstDayCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

	const days = eachDayOfInterval({
		start: startOfWeek(firstDayCurrentMonth),
		end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
	});

	const classNames = (...classes) => {
		return classes.filter(Boolean).join(" ");
	};

	const previousMonth = () => {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	};

	const nextMonth = () => {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy"));
	};

	const handleClick = (day) => {
		if (day.getTime() >= today.getTime()) {
			setSelectedDay(day);
			dispatch(setDate(day.getTime()));
		}
		if (!isSameMonth(day, firstDayCurrentMonth) && day.getDate() > today.getDate()) {
			previousMonth();
		} else if (!isSameMonth(day, firstDayCurrentMonth) && day.getDate() < today.getDate()) {
			nextMonth();
		}
	};

	return (
		<div className="w-full flex justify-around flex-col gap-4 p-4 border border-gray-700 rounded-lg">
			<div className="flex justify-between items-center">
				<button onClick={previousMonth}>
					<SvgSelectorComponent icon="left" />
				</button>
				<h2 className="text-xl font-semibold">
					{format(firstDayCurrentMonth, "MMMM yyyy")}
				</h2>
				<button onClick={nextMonth}>
					<SvgSelectorComponent icon="right" />
				</button>
			</div>
			<div className="grid grid-cols-7 gap-2">
				{weekDays.map((day, index) => (
					<div key={index} className="text-center">
						{day}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-2 mt-2">
				{days.map((day, index) => (
					<div
						key={day.toString()}
						className={classNames(index === 0 && colStartClasses[getDay(day)])}
					>
						<button
							onClick={() => handleClick(day)}
							className={classNames(
								isEqual(day, selectedDay) && "text-white",
								day.getTime() < today.getTime() && "hover:bg-gray-900",
								day.getTime() < today.getTime() && "hover:border border-[#ff0000]",

								!isEqual(day, selectedDay) &&
									isToday(day) &&
									"text-secondary hover:bg-gray-900",
								!isEqual(day, selectedDay) &&
									!isToday(day) &&
									isSameMonth(day, firstDayCurrentMonth) &&
									"text-white",
								!isSameMonth(day, firstDayCurrentMonth) &&
									day.getTime() > today.getTime() &&
									"hover:bg-secondary hover:text-white",
								!isEqual(day, selectedDay) &&
									!isToday(day) &&
									!isSameMonth(day, firstDayCurrentMonth) &&
									"text-gray-600",
								isEqual(day, selectedDay) && isToday(day) && "bg-secondary",
								isEqual(day, selectedDay) && !isToday(day) && "bg-secondary",
								!isEqual(day, selectedDay) && "hover:bg-secondary",

								"mx-auto flex h-8 w-8 items-center justify-center rounded-full text-lg"
							)}
						>
							<time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

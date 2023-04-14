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
import { classNames } from "../../utils";

export const DatePickerComponent = ({
	setDate,
	selectedFirstDay,
	selectedSecondDay,
	setSelectedDay,
}) => {
	const today = startOfToday();
	const dispatch = useDispatch();

	const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));

	const firstDayCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

	const days = eachDayOfInterval({
		start: startOfWeek(firstDayCurrentMonth),
		end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
	});

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
		<div className="flex justify-around flex-col gap-2 p-2 border border-gray-900 rounded-lg shadow-black shadow-lg">
			<div className="flex justify-between items-center mt-2">
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
			<div className="grid grid-cols-7 gap-2 py-4">
				{weekDays.map((day, index) => (
					<div
						key={index}
						className="flex items-center justify-center px-2 py-1 border border-gray-800 rounded-2xl"
					>
						{day}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-2">
				{days.map((day, index) => (
					<div
						key={day.toString()}
						className={classNames(index === 0 && colStartClasses[getDay(day)])}
					>
						<button
							onClick={() => handleClick(day)}
							className={classNames(
								!isSameMonth(day, firstDayCurrentMonth) &&
									"text-gray-700 hover:text-white",
								isToday(day) &&
									"text-secondary hover:text-white hover:bg-secondary",
								day.getTime() < today.getTime() && "hover:bg-gray-700",
								day.getTime() > today.getTime() && "hover:transparent text-white",
								!isSameMonth(day, firstDayCurrentMonth) && "hover:bg-gray-700",

								isEqual(day, selectedFirstDay) &&
									!isToday(day) &&
									"bg-secondary hover:bg-secondary",
								isEqual(day, selectedSecondDay) &&
									!isToday(day) &&
									"bg-[#2b79c2] hover:bg-[#2b79c2]",

								"mx-auto flex h-10 w-10 items-center justify-center rounded-full text-lg"
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

import { useSelector } from "react-redux";
import { classNames } from "../../utils";

export const MarkupPageComponent = ({ children }) => {
	const { isMobile } = useSelector((state) => state.appReducer);

	return (
		<div className="flex justify-center py-4">
			<div className={isMobile ? "pb-[100px] w-full" : "max-w-6xl px-24 mt-0 -mx-8"}>
				{children}
			</div>
		</div>
	);
};

export const MarkupFormComponent = ({ children }) => {
	const { isMobile } = useSelector((state) => state.appReducer);

	return (
		<div className={`${isMobile && "-mx-8 px-4"} flex justify-center`}>
			<div className="max-w-3xl w-full p-4 border border-purple-100 border-opacity-50 rounded-xl bg-[#0c1335]">
				{children}
			</div>
		</div>
	);
};

export const MarkupMenuComponent = ({ children, className }) => {
	return (
		<div
			className={`${className} flex items-center p-2 border border-black rounded-full shadow-sm duration-500 shadow-gray-500 bg-purple-100`}
		>
			{children}
		</div>
	);
};

export const MarkupItemComponent = ({ children }) => {
	const { width } = useSelector((state) => state.appReducer);

	return (
		<div
			className={`${
				width < 500 && "flex-col"
			} flex gap-4 rounded-2xl overflow-hidden bg-[#0c1335] shadow-xs shadow-purple-100 border-2 border-purple-100`}
		>
			{children}
		</div>
	);
};

export const MarkupImageComponent = ({ children }) => {
	const { isMobile, width } = useSelector((state) => state.appReducer);

	return (
		<div
			className={classNames(
				isMobile ? "w-1/2" : "w-1/3",
				width < 500 && "w-full",
				"flex shrink-0"
			)}
		>
			{children}
		</div>
	);
};

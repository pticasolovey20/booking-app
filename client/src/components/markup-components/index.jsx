import { useSelector } from "react-redux";
import { classNames } from "../../utils";

export const MarkupPageComponent = ({ children }) => {
	const { isMobile } = useSelector((state) => state.widthReducer);

	return (
		<div className="flex justify-center">
			<div className={`${isMobile && "pb-[100px]"} px-8 mt-0 -mx-8 max-w-6xl`}>
				{children}
			</div>
		</div>
	);
};

export const MarkupMenuComponent = ({ children }) => {
	return (
		<div className="flex items-center gap-2 border border-gray-500 rounded-full py-2 px-4 shadow-md shadow-[#463982] bg-[#463982]">
			{children}
		</div>
	);
};

export const MarkupItemComponent = ({ children }) => {
	const { width } = useSelector((state) => state.widthReducer);

	return (
		<div
			className={`${
				width < 500 && "flex-col"
			} flex gap-8 rounded-2xl overflow-hidden bg-[#0c1335]`}
		>
			{children}
		</div>
	);
};

export const MarkupImageComponent = ({ children }) => {
	const { isMobile, width } = useSelector((state) => state.widthReducer);

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

import React from "react";

export const WrapperComponent = ({ children }) => {
	return (
		<div className="flex items-center gap-2 border border-gray-500 rounded-full py-2 px-4 shadow-md shadow-[#463982] bg-[#463982]">
			{children}
		</div>
	);
};

import { SvgSelectorComponent } from "../../svg-selector";

import { bottomMenu } from "../../../constants";

export const BottomMenuComponet = () => {
	return (
		<div className="fixed right-0 bottom-0 z-10 min-w-full flex items-center justify-around py-4 px-2 border-t-[1px] border-tertiary text-sm bg-primary">
			{bottomMenu.map((button, index) => (
				<button key={index} className="flex flex-col items-center gap-1">
					<SvgSelectorComponent icon={button} h={28} w={28} />
					{button}
				</button>
			))}
		</div>
	);
};

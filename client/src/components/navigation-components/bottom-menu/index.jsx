import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { SvgSelectorComponent } from "../../svg-selector";

import { bottomMenu } from "../../../constants";

export const BottomMenuComponet = () => {
	return (
		<motion.div className="fixed right-0 bottom-0 z-10 min-w-full flex items-center justify-around py-4 px-2 border-t-[1px] border-gray-700 text-sm bg-primary">
			{bottomMenu.map((button) => {
				const variant = {
					hidden: {
						opacity: 0,
						x: -20 * button.id,
					},
					visible: {
						opacity: 1,
						x: 0,
						transition: {
							delay: 0.1 * button.id,
						},
					},
				};

				return (
					<motion.button
						key={button.id}
						variants={variant}
						initial="hidden"
						animate="visible"
						className={`${
							button.icon === "plus" && "text-secondary font-bold"
						} flex flex-col items-center gap-1 uppercase`}
					>
						<Link to={button.id === 1 ? "/" : `/account${button.route}`}>
							<SvgSelectorComponent
								icon={button.icon}
								h={28}
								w={28}
								strokeWidth={1.5}
							/>
						</Link>
					</motion.button>
				);
			})}
		</motion.div>
	);
};

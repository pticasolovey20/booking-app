import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { SvgSelectorComponent } from "../../svg-selector";

import { accountMenu } from "../../../constants";
import { menuVariants } from "../../../motion/variants";

export const MenuComponent = () => {
	return (
		<motion.div
			className="absolute top-[75px] right-4 flex flex-col gap-4 z-10"
			variants={menuVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			{accountMenu.map((element) => {
				const variant = {
					hidden: {
						opacity: 0,
						y: -20 * element.id,
					},
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							delay: 0.1 * element.id,
						},
					},
				};

				return (
					<motion.button
						className="flex items-center justify-center p-2 rounded-full border border-black rounded-full shadow-sm shadow-gray-500 bg-purple-100"
						key={element.id}
						variants={variant}
						initial="hidden"
						animate="visible"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link to={element.id === 1 ? "/" : `/account${element.route}`}>
							<SvgSelectorComponent icon={element.icon} h={24} w={24} />
						</Link>
					</motion.button>
				);
			})}
		</motion.div>
	);
};

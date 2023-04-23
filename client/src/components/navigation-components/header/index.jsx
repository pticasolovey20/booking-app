import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { MarkupMenuComponent } from "../../markup-components";
import { ActionButtonComponent, TopButtonComponent } from "../buttons";
import { BottomMenuComponet } from "../bottom-menu";
import { SvgSelectorComponent } from "../../svg-selector";
import { MenuComponent } from "../menu";
import { MenuButtonComponent } from "../menu-button";

import { buttons } from "../../../constants";
import { classNames } from "../../../utils";

export const HeaderComponent = () => {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef(null);

	const { user } = useSelector((state) => state.userReducer);
	const { width, isMobile } = useSelector((state) => state.appReducer);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	if (isMobile) {
		return <BottomMenuComponet />;
	}

	return (
		<header
			className={classNames(
				isMobile && "hidden",
				width > 870 && "grid grid-cols-3",
				width <= 870 && "flex justify-between"
			)}
		>
			{width > 870 && (
				<div className="flex justify-start">
					<Link to="/" className="flex items-center gap-1">
						<span className="font-bold text-2xl uppercase">booking</span>{" "}
					</Link>
				</div>
			)}
			<div className="flex justify-center">
				<MarkupMenuComponent>
					{buttons.map((button, index) => (
						<TopButtonComponent
							key={index}
							buttons={buttons}
							button={button}
							index={index}
						/>
					))}
				</MarkupMenuComponent>
			</div>

			<div className="flex justify-end items-center gap-4">
				<ActionButtonComponent
					icon="lang"
					text="Languages"
					handleClick={() => console.log("lang")}
					h={24}
					w={24}
					className="flex gap-1"
				/>
				<MarkupMenuComponent className="gap-2">
					<MenuButtonComponent isOpen={isOpen} setIsOpen={setIsOpen} />
					<AnimatePresence>
						{!isOpen && (
							<motion.button
								className="ml-2 border border-gray-500 rounded-full bg-gray-500 overflow-hidden"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{
									type: "tween",
									stiffness: 260,
									damping: 10,
								}}
							>
								<SvgSelectorComponent icon="user" h={24} w={24} />
							</motion.button>
						)}
					</AnimatePresence>
				</MarkupMenuComponent>
			</div>
			{isOpen && <MenuComponent />}
		</header>
	);
};

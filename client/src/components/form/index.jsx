import { useState } from "react";

import { HeadlineComponent } from "../headline";
import { ImageLinkComponent } from "../image-link";
import { ImageDescComponent } from "../image-desc";
import { PerkComponent } from "../perk";

import { perksList } from "../../constants";
import { styles } from "../../styles/styles";

export const FormComponent = () => {
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [chekIn, setCheckIn] = useState("");
	const [chekOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);

	return (
		<form className="text-black">
			<HeadlineComponent
				headText="Title"
				subText="Title for your place. should be short and catchy as in advertisemen"
			/>
			<input
				className={styles.input}
				type="text"
				placeholder="title, for example: My lovely apt"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<HeadlineComponent headText="Address" subText="Address to this place" />
			<input
				className={styles.input}
				type="text"
				placeholder="address"
				value={address}
				onChange={(event) => setAddress(event.target.value)}
			/>
			<ImageLinkComponent />
			<ImageDescComponent />
			<HeadlineComponent headText="Description" subText="description of the place" />
			<textarea
				className={styles.input}
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>
			<HeadlineComponent headText="Perks" subText="select all the perks of your place" />
			<div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols:6">
				{perksList.map((perkItem) => (
					<PerkComponent
						key={perkItem.id}
						perk={perkItem}
						selected={perks}
						onChange={setPerks}
					/>
				))}
			</div>
			<HeadlineComponent headText="Extra info" subText="house rules, etc" />
			<textarea
				className={styles.input}
				value={extraInfo}
				onChange={(event) => setExtraInfo(event.target.value)}
			/>
			<HeadlineComponent
				headText="Check in/out times, max guests"
				subText="add check in and out times, remember to have some time window for
							cleaning the room beetwen guests"
			/>
			<div className="grid gap-2 sm:grid-cols-3">
				<div>
					<h3 className="mt-2 -mb-1">Check in time</h3>
					<input
						className={styles.input}
						type="text"
						placeholder="16:00"
						value={chekIn}
						onChange={(event) => setCheckIn(event.target.value)}
					/>
				</div>
				<div>
					<h3 className="mt-2 -mb-1">Check out time</h3>
					<input
						className={styles.input}
						type="text"
						placeholder="11"
						value={chekOut}
						onChange={(event) => setCheckOut(event.target.value)}
					/>
				</div>
				<div>
					<h3 className="mt-2 -mb-1">Max number of guests</h3>
					<input
						className={styles.input}
						type="number"
						value={maxGuests}
						onChange={(event) => setMaxGuests(event.target.value)}
					/>
				</div>
			</div>
			<button className="bg-secondary my-4 w-full p-2 rounded-2xl">Save</button>
		</form>
	);
};

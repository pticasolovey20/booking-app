import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

import { HeadlineComponent } from "../components/headline";
import { ImageLinkComponent } from "../components/image-link";
import { ImageDescComponent } from "../components/image-desc";
import { PerkComponent } from "../components/perk";

import { perksList } from "../constants";
import { styles } from "../styles/styles";

export const PlacesFormPage = () => {
	const { id } = useParams();

	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [chekIn, setCheckIn] = useState("");
	const [chekOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);
	const [redirect, setRedirect] = useState("");

	useEffect(() => {
		if (!id) return;
		axios.get("/places/", +id).then((response) => {
			const { data } = response;
			setTitle(data[0].title);
			setAddress(data[0].address);
			setAddedPhotos(data[0].photos);
			setDescription(data[0].description);
			setPerks(data[0].perks);
			setExtraInfo(data[0].extraInfo);
			setCheckIn(data[0].chekIn);
			setCheckOut(data[0].chekOut);
			setMaxGuests(data[0].maxGuests);
		});
	}, [id]);

	const savePlace = async (event) => {
		event.preventDefault();

		const placeData = {
			title,
			address,
			addedPhotos,
			description,
			perks,
			extraInfo,
			chekIn,
			chekOut,
			maxGuests,
		};

		if (id) {
			await axios.put("/places", { id, ...placeData });
			setRedirect("/account/places");
		} else {
			await axios.post("/places", placeData);
			setRedirect("/account/places");
		}
	};

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<form className="text-black" onSubmit={savePlace}>
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
			<ImageLinkComponent setAddedPhotos={setAddedPhotos} />
			<ImageDescComponent addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
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

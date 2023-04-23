import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

import { MarkupFormComponent } from "../components/markup-components";
import { HeadlineComponent } from "../components/headline";
import { ImageLinkComponent } from "../components/image-link";
import { ImageDescComponent } from "../components/image-desc";
import { PerkComponent } from "../components/perk";

import { perksList } from "../constants";
import { styles } from "../styles/styles";
import { useSelector } from "react-redux";

export const PlacesFormPage = () => {
	const { id } = useParams();
	const { isMobile } = useSelector((state) => state.appReducer);

	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [chekIn, setCheckIn] = useState("");
	const [chekOut, setCheckOut] = useState("");
	const [price, setPrice] = useState(1);
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
			setCheckIn(data[0].chekIn);
			setPrice(data[0].price);
			setCheckOut(data[0].chekOut);
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
			chekIn,
			chekOut,
			price,
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
		<form className="flex flex-col p-4 gap-4 rounded-md overflow-hidden">
			<MarkupFormComponent>
				<HeadlineComponent headText="Title" />
				<input
					className={styles.input}
					style={{
						boxShadow: "inset 4px 8px 15px rgba(0, 0, 0, 0.4)",
					}}
					type="text"
					placeholder="for example: My lovely apt"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
			</MarkupFormComponent>
			<MarkupFormComponent>
				<HeadlineComponent headText="Address" />
				<input
					className={styles.input}
					style={{
						boxShadow: "inset 4px 8px 15px rgba(0, 0, 0, 0.4)",
					}}
					type="text"
					placeholder="address"
					value={address}
					onChange={(event) => setAddress(event.target.value)}
				/>
			</MarkupFormComponent>
			<MarkupFormComponent>
				<HeadlineComponent headText="add your photos" />
				<ImageDescComponent addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
				<ImageLinkComponent setAddedPhotos={setAddedPhotos} />
			</MarkupFormComponent>
			<MarkupFormComponent>
				<HeadlineComponent headText="Select all the perks of your place" />
				<div className="grid mt-2 gap-4 grid-cols-2">
					{perksList.map((perkItem) => (
						<PerkComponent
							key={perkItem}
							perk={perkItem}
							selected={perks}
							onChange={setPerks}
						/>
					))}
				</div>
			</MarkupFormComponent>
			<MarkupFormComponent>
				<HeadlineComponent headText="Description" />
				<textarea
					className={styles.input}
					style={{
						boxShadow: "inset 4px 8px 15px rgba(0, 0, 0, 0.4)",
					}}
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
			</MarkupFormComponent>
			<MarkupFormComponent>
				<HeadlineComponent headText="Price" subText="set the cost" />
				<div className="flex flex-col gap-4">
					<input
						className={styles.input}
						style={{
							boxShadow: "inset 4px 8px 15px rgba(0, 0, 0, 0.4)",
						}}
						type="number"
						value={price}
						onChange={(event) => setPrice(event.target.value)}
					/>
				</div>
			</MarkupFormComponent>
			<button className="uppercase w-full p-2 my-4 rounded-lg bg-secondary">Save</button>
		</form>
	);
};

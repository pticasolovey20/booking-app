import { useState } from "react";
import axios from "axios";

import { styles } from "../../styles/styles";

export const ImageLinkComponent = ({ setAddedPhotos }) => {
	const [photoLink, setPhotoLink] = useState("");

	const addPhotoByLink = async (event) => {
		event.preventDefault();
		const { data: filename } = await axios.post("/upload-by-link", { link: photoLink });
		setAddedPhotos((prev) => {
			return [...prev, filename];
		});
		setPhotoLink("");
	};

	return (
		<div className="flex gap-2">
			<input
				className={styles.input}
				type="text"
				placeholder="Add using link ...jpeg"
				value={photoLink}
				onChange={(event) => setPhotoLink(event.target.value)}
			/>

			<button className="bg-secondary px-4" onClick={addPhotoByLink}>
				Add photo
			</button>
		</div>
	);
};

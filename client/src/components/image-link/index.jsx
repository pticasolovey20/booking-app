import { useState } from "react";
import axios from "axios";

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
		<div className="flex gap-4 mt-4">
			<input
				className="w-full py-2 px-3 text-white rounded-lg border-none outline-none bg-transparent"
				style={{
					boxShadow: "inset 4px 8px 15px rgba(0, 0, 0, 0.4)",
				}}
				type="text"
				placeholder="https://image...jpeg"
				value={photoLink}
				onChange={(event) => setPhotoLink(event.target.value)}
			/>

			<button className="px-4 rounded-lg bg-pink-100" onClick={addPhotoByLink}>
				Add
			</button>
		</div>
	);
};

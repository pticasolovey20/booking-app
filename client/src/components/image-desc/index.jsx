import { useState } from "react";
import axios from "axios";

import { SvgSelectorComponent } from "../svg-selector";

export const ImageDescComponent = () => {
	const [addedPhotos, setAddedPhotos] = useState([]);

	const uploadPhoto = async (event) => {
		const files = event.target.files;
		const data = new FormData();
		for (let i = 0; i < files.length; i++) {
			data.append("photos", files[i]);
		}
		const { data: filename } = await axios.post("/upload", data, {
			headers: {
				"Content-type": "multipart/form-data",
			},
		});
		setAddedPhotos((prev) => {
			return [...prev, ...filename];
		});
	};

	return (
		<div className="mt-2 grid gap-2 grid-cols-3 lg:grid-cols:6 md:grid-cols-4">
			{addedPhotos.length > 0 &&
				addedPhotos.map((link, index) => (
					<div className="h-32 flex" key={index}>
						<img
							className="rounded-2xl w-full object-cover"
							src={"http://localhost:4000/uploads/" + link}
							alt=""
						/>
					</div>
				))}
			<label className="h-32 cursor-pointer flex items-center gap-1 justify-center border rounded-2xl p-2 text-2xl">
				<input className="hidden" type="file" multiple onChange={uploadPhoto} />
				<SvgSelectorComponent icon="upload" />
				Upload
			</label>
		</div>
	);
};

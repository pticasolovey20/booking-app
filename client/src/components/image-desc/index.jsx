import axios from "axios";

import { PlaceImageComponent } from "../place-components/place-image";
import { SvgSelectorComponent } from "../svg-selector";

import { styles } from "../../styles/styles";

export const ImageDescComponent = ({ addedPhotos, setAddedPhotos }) => {
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

	const removePhoto = (event, name) => {
		event.preventDefault();
		setAddedPhotos([...addedPhotos.filter((photo) => photo !== name)]);
	};

	const selectAsMainPhoto = (event, name) => {
		event.preventDefault();
		setAddedPhotos([name, ...addedPhotos.filter((photo) => photo !== name)]);
	};

	return (
		<div className="grid gap-3 grid-cols-3 grid-flow-row grid-auto-rows-auto">
			{addedPhotos.length > 0 &&
				addedPhotos.map((link, index) => (
					<div className="flex relative" key={index}>
						<PlaceImageComponent
							photo={link}
							className="w-full aspect-video object-cover rounded-lg shadow-2xl shadow-black"
						/>
						<button
							onClick={(event) => removePhoto(event, link)}
							className={`${styles.photoAction} bottom-1 right-1`}
						>
							<SvgSelectorComponent icon="delete" h={20} w={20} />
						</button>
						<button
							onClick={(event) => selectAsMainPhoto(event, link)}
							className={`${styles.photoAction} bottom-1 left-1`}
						>
							{link === addedPhotos[0] ? (
								<SvgSelectorComponent icon="star-fill" h={20} w={20} />
							) : (
								<SvgSelectorComponent icon="star" h={20} w={20} />
							)}
						</button>
					</div>
				))}
			<label className={styles.upload}>
				<input className="hidden" type="file" multiple onChange={uploadPhoto} />
				<SvgSelectorComponent icon="upload" h={32} w={32} />
				upload
			</label>
		</div>
	);
};

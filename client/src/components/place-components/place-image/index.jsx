export const PlaceImageComponent = ({ photo, className = null }) => {
	return <img className={className} src={"http://localhost:4000/uploads/" + photo} alt="photo" />;
};

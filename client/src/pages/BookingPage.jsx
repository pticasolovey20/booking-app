import { useParams } from "react-router-dom";

export const BookingPage = () => {
	const { id } = useParams();

	return <div>{id}</div>;
};

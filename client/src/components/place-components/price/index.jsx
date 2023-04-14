export const PriceComponent = ({ place }) => {
	return (
		<p>
			<span className="font-bold">${place.price}</span>/night
		</p>
	);
};

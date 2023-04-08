export const generateRandomNumber = (string) => {
	const multipliers = {
		tens: 100,
		hund: 1000,
		thou: 10000,
	};

	const multiplier = multipliers[string] || 1;

	const randomNumber = Math.floor(Math.random() * multiplier);

	return randomNumber;
};

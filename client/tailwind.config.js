/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#050816",
				secondary: "#F5385D",
				tertiary: "#E5E7EB",
			},
		},
	},
	plugins: [],
};

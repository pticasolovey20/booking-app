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
			screens: {
				sm: "549px",
				md: "768px",
				lg: "950px",
				xl: "1128px",
			},
		},
	},
	plugins: [],
};

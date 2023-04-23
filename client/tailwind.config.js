/** @type {import('tailwindcss').Config} */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#040714",
				secondary: "#F5385D",
				tertiary: "#E5E7EB",

				// "blue-100": "#111a45",
				"green-100": "#00cda7",

				// main colors

				primary: "#040714",

				blue: {
					100: "#0c1335",
				},

				purple: {
					100: "#5c199e",
				},

				pink: {
					100: "#e3105a",
				},
			},
			screens: {
				sm: "549px",
				md: "768px",
				lg: "950px",
				xl: "1128px",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};

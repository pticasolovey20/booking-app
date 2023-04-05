import React, { useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles/styles";

export const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPasssword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
	};

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="-mt-64">
				<h1 className="text-4xl text-center">Register</h1>
				<form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
					<input
						className={styles.input}
						type="text"
						placeholder="Jhon Doe"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						className={styles.input}
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className={styles.input}
						type="password"
						placeholder="password"
						value={password}
						onChange={(e) => setPasssword(e.target.value)}
					/>
					<button className="w-full bg-primary p-2 text-white rounded-2xl">
						Register
					</button>
					<div className="text-center py-2 text-gray-500">
						Allredy a member?{" "}
						<Link className="underline text-black" to={"/login"}>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

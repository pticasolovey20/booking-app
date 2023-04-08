import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/userSlice";
import { Link, Navigate } from "react-router-dom";

import { styles } from "../styles/styles";

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPasssword] = useState("");
	const [redirect, setRedirect] = useState(false);

	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();

		dispatch(loginUser({ email, password }));
		setRedirect(true);
	};

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="-mt-64">
				<h1 className="text-4xl text-center">Login</h1>
				<form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
					<input
						className={styles.input}
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<input
						className={styles.input}
						type="password"
						placeholder="password"
						value={password}
						onChange={(event) => setPasssword(event.target.value)}
					/>
					<button className="w-full bg-secondary p-2 text-white rounded-2xl">
						Login
					</button>
					<div className="text-center py-2 text-gray-500">
						Don't have an account yet?{" "}
						<Link className="underline text-black" to={"/register"}>
							Register
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "./../context/GlobalContext";
import { User, Key } from "phosphor-react";
import { Link, Redirect } from "react-router-dom";
import { setCredentials } from "./../helpers/auth-helper";
import { Helmet } from "react-helmet";

export default function Signin() {
	const { signIn, error, message, setToNull, token, user } = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [password, setpassword] = useState("");
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		setToNull();
	}, []);

	error ||
		(message &&
			setTimeout(() => {
				setToNull();
			}, 3000));

	function onSubmit(e) {
		e.preventDefault();
		setLoading(true);
		const user = {
			name,
			password,
		};
		signIn(user);

		setLoading(false);
	}

	useEffect(() => {
		if (token) setCredentials(token, () => setSignedIn(true));
	}, [token]);

	return (
		<>
			<Helmet>
				<title>Sign In - FarDean Blog</title>
			</Helmet>
			{loading && <div class="lds-dual-ring"></div>}

			<div className="container">
				{error && <div class="alert-danger">{error}</div>}
				{message && <div class="alert-success">{message}</div>}
				<h1 className="articles-header">Sign In</h1>
				<hr className="hr-articles" />
				<div className="signup-form">
					<form onSubmit={onSubmit}>
						<div className="textbox">
							<User size={35} />
							<input
								onChange={e => {
									setName(e.target.value);
								}}
								type="text"
								name="name"
								placeholder="Name"
								id="name"
							/>
						</div>
						<div className="textbox">
							<Key size={35} />
							<input
								onChange={e => {
									setpassword(e.target.value);
								}}
								type="password"
								name="password"
								placeholder="Password"
								id="password"
							/>
						</div>

						<div className="button-wrapper">
							<button type="submit" className="btn">
								Submit
							</button>
							<Link to="/">
								<button className="btn">Cancel</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
			{signedIn && <Redirect push to="/" />}
		</>
	);
}

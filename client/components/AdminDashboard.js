import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AdminDashboard() {
	return (
		<div className="container">
			<Helmet>
				<title>Admin Dashboard - FarDean Blog</title>
			</Helmet>
			<div className="dashboard">
				<Link to="/newarticle">Create new Article </Link>
			</div>
		</div>
	);
}

import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					 <img src="/workspaces/HelpingHands_Morocco-FinalProject/src/front/img/Capture.PNG" />
				</Link>
				<div className="navlinks">
					<Link to="/home">Home</Link>
					<Link to="/contact">Contact</Link>
					<Link to="/aboutUs">About Us</Link>
					<Link to="/login">Login</Link>
					<Link to="/signup">Signup</Link>
				</div>
			</div>
		</nav>
	);
};

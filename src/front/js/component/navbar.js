import React from "react";
import { Link } from "react-router-dom";
import logoImageUrl from "../../img/logo.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					 <img 
					 	className="logo" 
						src={logoImageUrl}
						style={{ width: "220px", height: "220px" }}/>
				</Link>
				<div className="navLinks">
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

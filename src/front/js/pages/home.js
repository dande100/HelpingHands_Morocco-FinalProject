import React, { useContext } from "react";
import { Context } from "../store/appContext";
import sliderBGImageUrl from "../../img/slider_bg.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div >
			<img className="backgroundImage" src={sliderBGImageUrl} alt="Slider Background" style={{ maxWidth: "100%", height: "auto" }} />
			<div className="text-overlay">
				<h1>Give A Hand To Make <br /> The <span id="better">Better</span> World</h1>
				<p>Following the recent earthquake in Morocco, your donation can truly make a difference. Join us in helping the affected communities recover and rebuild. Your contribution offers hope and strength to those in need, and together, we can work towards a resilient Morocco.</p>
			</div>
			<Link to="/signup" >
				<btn className="donate-button">Donate Now</btn>
			</Link>
		</div>
	);
};

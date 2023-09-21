import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import sliderBGImageUrl from "../../img/slider_bg.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import "../../styles/circular-progress-bar.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		// Add your logic to set the progress here (if needed)
	}, []);

	return (
		<div>
			<img className="backgroundImage" src={sliderBGImageUrl} alt="Slider Background" style={{ maxWidth: "100%", height: "auto" }} />
			<div className="text-overlay">
				<h1>Give A Hand To Make <br /> The <span id="better">Better</span> World</h1>
				<p>Following the recent earthquake in Morocco, your donation can truly make a difference. <br /> Join us in helping the affected communities recover and rebuild. <br /> Your contribution offers hope and strength to those in need, and together, <br /> we can work towards a resilient Morocco.</p>
			</div>
			<Link to="/signup">
				<button className="donate-button">Donate Now</button> 
			</Link>
			<div className="progress-bar">
				<div className="row">
					<div className="col-md-3 col-sm-6">
						<div className="progress blue">
							<span className="progress-left">
								<span className="progress-bar"></span>
							</span>
							<span className="progress-right">
								<span className="progress-bar"></span>
							</span>
							<div className="progress-value">90%</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-3 col-sm-6">
						<div className="raised-goal-container">
							<p className="raised">Raised <br /> $35,000</p>
						</div>
					</div>
					<div className="col-md-3 col-sm-6">
						<div className="raised-goal-container">
							<p className="goal">Goal: <br />35,000</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

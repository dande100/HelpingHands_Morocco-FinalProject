import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player"; // Import the react-player library
import { Context } from "../store/appContext";
import sliderBGImageUrl from "../../img/slider_bg.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import "../../styles/circular-progress-bar.css";
import sliderImageUrl1 from "../../img/photo.jpg";
import happyKidsImageUrl from "../../img/happyKids.jpg";
import happyKids1ImageUrl from "../../img/happyKids1.png";
import youtubeImageUrl from "../../img/youtube.png";

import AboutUs from "./aboutUs";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [isZoomed, setIsZoomed] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showVideo, setShowVideo] = useState(false);
	const [showStatement2, setShowStatement2] = useState(false);
	const [readMoreText, setReadMoreText] = useState("Read More");


	const handleReadMoreClick = () => {
		setShowStatement2(!showStatement2);
		setReadMoreText(showStatement2 ? "Read More" : "Read Less");
	};


	const carouselImages = [sliderBGImageUrl, sliderImageUrl1];

	const changeCarouselImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
	};

	useEffect(() => {
		const intervalId = setInterval(changeCarouselImage, 3000);
		return () => clearInterval(intervalId);
	}, []);


	const fetchProgress = () => {
		actions.fetchAllDonation()
	};

	useEffect(() => {
		fetchProgress();

		const intervalId = setInterval(() => {
			fetchProgress();
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const toggleVideo = () => {
		setShowVideo(!showVideo);
	};
	const closeVideo = () => {
		setShowVideo(false);
	};
	const handleImage2Click = () => {
		setIsZoomed(!isZoomed);
	}


	return (
		<div>
			<img
				className="backgroundImage"
				src={carouselImages[currentImageIndex]}
				alt="Slider Background"
			/>
			<div className="row">
				<div className="col">
					<div className="text-overlay">
						<h1>Give A Hand To Make <br /> The <span id="better">Better</span> World</h1>
						<p>Following the recent earthquake in Morocco, your donation can truly make a difference. <br /> Join us in helping the affected communities recover and rebuild. <br /> Your contribution offers hope and strength to those in need, and together, <br /> we can work towards a resilient Morocco.</p>
						<Link to="/signup">
							<button className="donate-button">Donate Now</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="progress-bar">
				<div className="body">
					<div className="row">
						<div className="col-md-3 col-sm-3">
							<div className="progress blue">
								<span className="progress-left">
									<span className="progress-bar" ></span>
								</span>
								<span className="progress-right">
									<span className="progress-bar" ></span>
								</span>
								<div className="progress-value">{Math.round(store.progressPercentage)}%</div>
							</div>
						</div>
						<div className="col-md-3 col-sm-3 progress-bar-statement">
							<h2>Urgent Relief</h2>
							<p>In the wake of a devastating earthquake that has left communities in Morocco reeling,<br /> we are calling upon compassionate individuals, organizations, and communities worldwide  <br /> to come together and join our mission to be a beacon of hope in aiding Morocco's earthquake recovery efforts.</p>
							<Link to="/signup">
								<button className="donate-button-statement">Donate Now</button>
							</Link>
						</div>
					</div>

					<div className="row row-cols-auto raised-goal">
						<div className="col ms-3 mt-3 ps-1">Raised<br />${Math.round(store.progressPercentage * 500)}</div>

						<div className="col ms-3  mt-3 ps-1 ">Goal<br />$50,000</div>
					</div>
				</div>
			</div >

			<div className="row image-video-aboutUs">
				<div className="col image-video">
					<img
						className={`image1`}
						src={happyKids1ImageUrl}
						alt="Image 1"
					/>
					<img
						className={`image2 ${isZoomed ? "zoomed" : ""}`}
						src={isZoomed ? happyKidsImageUrl : happyKidsImageUrl}
						alt="Image 2"
						onClick={handleImage2Click}
					/>
					<img
						className={`image3`}
						src={youtubeImageUrl}
						alt="Image 3"
						onClick={toggleVideo}
					/>

					{showVideo && (
						<div className="video-player">
							<ReactPlayer
								url="https://youtu.be/st6p05Z8NdA"
								controls={true}
								width="350px"
								height="350px"
								playing={showVideo}
							/>
							<button className="close-button" onClick={closeVideo}>
								Close Video
							</button>
						</div>
					)}

				</div>
				<div id="aboutUs" className="col aboutUsStatement">
					<h3 className="aboutUsHeader">We’re Changing Lives with your Help</h3>
					<p className="statement1">Catalyzing Change, Building Hope: Our mission, led by the HelpingHands Foundation, is to rally communities and individuals worldwide in support of Morocco's recovery and rebuilding efforts following natural disasters. We believe in the power of collective action to make a lasting impact, fostering resilience, and creating a brighter future for the people of Morocco.</p>
					<button className="readMore" onClick={handleReadMoreClick}>
						{readMoreText}
					</button>
					{showStatement2 && (
						<p className="statement2">
							We're here to provide a helping hand to those affected by the Morocco earthquake while maintaining honesty and transparency in how donations are used. Our focus is on supporting communities and working together for a bigger impact. We always strive to do what's right, treating everyone with respect and fairness, and keeping our processes simple and efficient. Our goal is not just immediate relief but also long-term recovery and resilience, listening to and including everyone's voice. We're always learning and looking for better ways to help, and we're thankful for every donor's support, aiming to make it count.
						</p>
					)}
				</div>
			</div>
			<br /> <br />
		</div>
	);
};

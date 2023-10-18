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
import mapImgURL from "../../img/Blank_US_Map_(states_only).png";
import CircularProgressBar from "./circularProgressBar";
import CountdownTimer from "./countDownTimer";



export const Home = () => {
	const { store, actions } = useContext(Context);
	const [isZoomed, setIsZoomed] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showVideo, setShowVideo] = useState(false);
	const [showStatement2, setShowStatement2] = useState(false);
	const [readMoreText, setReadMoreText] = useState("Read More");
	const [isMoving, setIsMoving] = useState(false);

	const startAnimation = () => {
		setIsMoving(true);
	};

	const stopAnimation = () => {
		setIsMoving(false);
	};
	useEffect(() => {

		startAnimation();


		const animationTimeout = setTimeout(() => {
			stopAnimation();
		}, 1000);
		return () => {
			clearTimeout(animationTimeout);
		};
	}, []);


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

		// const intervalId = setInterval(() => {
		// 	fetchProgress();
		// }, 1000);

		// return () => clearInterval(intervalId);
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
				<div className="row progress-bar1">
					<div className="col-6"><CircularProgressBar />
					</div>

					{/* <div className="col-4 mt-5 statement">
						<h2>Urgent Relief</h2>
						<p>In the wake of a devastating earthquake that has left communities in Morocco reeling,<br /> we are calling upon compassionate individuals, organizations, and communities worldwide  <br /> to come together and join our mission to be a beacon of hope in aiding Morocco's earthquake recovery efforts.</p>
						<Link to="/signup">
							<button className="donate-button-statement">Donate Now</button>
						</Link>
					</div> */}
					<div className="col-6"><CountdownTimer dueDate={new Date("2023-12-31T23:59:59")} /></div>
				</div>

				<div className="row  raised-goal">
					<div className="col donationMoney">Raised<br />${Math.round(store.progressPercentage * 500)}</div>

					<div className="col donationMoney">Goal<br />$50000</div>
				</div>
			</div >
			<div className={`instruction  ${isMoving ? 'moving' : ''}`}>
				Click the youtube icon to watch the video/click the photo to expand
			</div>
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
						<div className="video-container">
							<div className="video-player">
								<ReactPlayer
									url="https://youtu.be/st6p05Z8NdA"
									controls={true}
									width="550px"
									height="550px"
									top="-150px"
									playing={showVideo}
								/>
								<button className="close-button" onClick={closeVideo}>
									Close Video
								</button>
							</div>
						</div>
					)}
				</div>
				<div className="col">
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
			</div>
			<br /> <br />
			<section className="country-section pb-100">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 mb-4">
							<div className="country-area-content">
								<span>
									<i className="flaticon-selection"></i>
									Our Area
								</span>
								<h3>People generous is your state</h3>
								<p>In our community, people are coming together to raise funds in various locations across the area. Their collective efforts are making a significant impact, helping to support important causes and initiatives that benefit our local residents and beyond. This spirit of generosity and unity is a testament to the strength and compassion of our community.</p>
							</div>

							<div className="skill-bar" data-percentage="68%">
								<p className="progress-title-holder">
									<span className="progress-title">Utah</span>
									<span className="progress-number-wrapper">
										<span className="progress-number-mark" style={{ left: "68%" }}>
											<span className="percent">68%</span>
											<span className="down-arrow"></span>
										</span>
									</span>
								</p>
								<div className="progress-content-outter">
									<div className="progress-content" style={{ width: "68%" }}></div>
								</div>
							</div>

							<div className="skill-bar" data-percentage="90%">
								<p className="progress-title-holder">
									<span className="progress-title">Texas</span>
									<span className="progress-number-wrapper">
										<span className="progress-number-mark" style={{ left: "90%" }}>
											<span className="percent">90%</span>
											<span className="down-arrow"></span>
										</span>
									</span>
								</p>
								<div className="progress-content-outter">
									<div className="progress-content-two" style={{ width: "90%" }}></div>
								</div>
							</div>

							<div className="skill-bar" data-percentage="95%">
								<p className="progress-title-holder">
									<span className="progress-title">Florida</span>
									<span className="progress-number-wrapper">
										<span className="progress-number-mark" style={{ left: "95%" }}>
											<span className="percent">95%</span>
											<span className="down-arrow"></span>
										</span>
									</span>
								</p>
								<div className="progress-content-outter">
									<div className="progress-content-three" style={{ width: "95%" }}></div>
								</div>
							</div>
						</div>

						<div className="col-lg-6">
							<div className="map-img">
								<img src={mapImgURL} alt="map" />

								<div className="location location1">
									<a href="#">
										<div className="location-info">
											<h5>Utah</h5>
										</div>
									</a>
								</div>

								<div className="location location2">
									<a href="#">
										<div className="location-info">
											<h5>Wisconsin</h5>
										</div>
									</a>
								</div>



								<div className="location location4">
									<a href="#">
										<div className="location-info">
											<h5>Arkansas</h5>
										</div>
									</a>
								</div>

								<div className="location location5">
									<a href="#">
										<div className="location-info">
											<h5>Texas</h5>
										</div>
									</a>
								</div>

								<div className="location location6">
									<a href="#">
										<div className="location-info">
											<h5>Florida</h5>
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="fun-facts-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-6 col-sm-6">
							<div className="single-fun-fact">
								<p>Beneficiaries</p>
								<h3>
									<span className="sign-icon dolor">$</span>
									<span className="odometer odometer-auto-theme" data-count="500"><div className="odometer-inside"><span className="odometer-digit"><span className="odometer-digit-spacer">8</span><span className="odometer-digit-inner"><span className="odometer-ribbon"><span className="odometer-ribbon-inner"><span className="odometer-value">5</span></span></span></span></span><span className="odometer-digit"><span className="odometer-digit-spacer">8</span><span className="odometer-digit-inner"><span className="odometer-ribbon"><span className="odometer-ribbon-inner"><span className="odometer-value">0</span></span></span></span></span><span className="odometer-digit"><span className="odometer-digit-spacer">8</span><span className="odometer-digit-inner"><span className="odometer-ribbon"><span className="odometer-ribbon-inner"><span className="odometer-value">0</span></span></span></span></span></div></span>
									<span className="sign-icon">M</span>
								</h3>
							</div>
						</div>

						<div className="col-lg-3 col-md-6 col-sm-6">
							<div className="single-fun-fact">
								<p>Happy Donators</p>
								<h3>
									<span className="odometer odometer-auto-theme" data-count="458"><div className="odometer-inside"><span className="odometer-digit"><span className="odometer-digit-spacer">8</span><span className="odometer-digit-inner"><span className="odometer-ribbon"><span className="odometer-ribbon-inner"><span className="odometer-value">4</span></span></span></span></span><span className="odometer-digit"><span className="odometer-digit-spacer">8</span><span className="odometer-digit-inner"><span className="odometer-ribbon"><span className="odometer-ribbon-inner"><span className="odometer-value">5</span></span></span></span></span><span className="odometer-digit"><span className="odometer-digit-spacer">8</span><span className="odometer-digit-inner"><span className="odometer-ribbon"><span className="odometer-ribbon-inner"><span className="odometer-value">8</span></span></span></span></span></div></span>
									<span className="sign-icon">+</span>
								</h3>
							</div>
						</div>

						<div className="col-lg-3 col-md-6 col-sm-6">
							<div className="single-fun-fact">
								<p>Volunteer</p>
								<h3>
									<span className="odometer odometer-auto-theme" data-count="45"><div className="odometer-inside"><span className="odometer-digit"><span className="odometer-digit-spacer">8</span><span className="odometer-digit-inner"><span className="odometer-ribbon"><span className="odometer-ribbon-inner"><span className="odometer-value">4</span></span></span></span></span><span className="odometer-digit"><span className="odometer-digit-spacer">8</span><span className="odometer-digit-inner"><span className="odometer-ribbon"><span className="odometer-ribbon-inner"><span className="odometer-value">5</span></span></span></span></span></div></span>
									<span className="sign-icon">+</span>
								</h3>
							</div>
						</div>

						<div className="col-lg-3 col-md-6 col-sm-6">
							<div className="single-fun-fact">
								<p>Donated Poor</p>
								<h3>
									<span className="odometer odometer-auto-theme" data-count="20"><div className="odometer-inside"><span className="odometer-digit"><span className="odometer-digit-spacer">8</span><span className="odometer-digit-inner"><span className="odometer-ribbon"><span className="odometer-ribbon-inner"><span className="odometer-value">2</span></span></span></span></span><span className="odometer-digit"><span className="odometer-digit-spacer">8</span><span className="odometer-digit-inner"><span className="odometer-ribbon"><span className="odometer-ribbon-inner"><span className="odometer-value">0</span></span></span></span></span></div></span>
									<span className="sign-icon">K</span>
								</h3>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="home-testimonial">
				<div className="container-fluid">
					<div className="row d-flex justify-content-center testimonial-pos">
						<div className="col-md-12 pt-4 d-flex justify-content-center">
							<h3>Testimonials</h3>
						</div>
					</div>
					<section className="home-testimonial-bottom">
						<div className="container testimonial-inner">
							<div className="row d-flex justify-content-center">
								<div className="col-md-4 style-3">
									<div className="tour-item ">
										<div className="tour-desc bg-white">
											<div className="tour-text color-grey-3 text-center">"So happy I was able to use Helping Hands Morocco to make a donation for those affected in Morocco. The site was very easy to use and was a simple donation process!"</div>
											<div className="link-name d-flex justify-content-center mt-3">- John Smith</div>
											<div className="link-position d-flex justify-content-center mt-2">Donor</div>
											<div className="ratings justify-content-center">
												<i className="fa fa-star rating-color mr-n3"></i>
												<i className="fa fa-star rating-color mr-n3"></i>
												<i className="fa fa-star rating-color mr-n3"></i>
												<i className="fa fa-star rating-color mr-n3"></i>
												<i className="fa fa-star rating-color"></i>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-4 style-3">
									<div className="tour-item ">
										<div className="tour-desc bg-white">
											<div className="tour-text color-grey-3 text-center">"Very easy to use to website to make a donation to help those in Morocco affected by the earthquakes!"</div>
											<div className="link-name d-flex justify-content-center mt-3">- Jane Rogers</div>
											<div className="link-position d-flex justify-content-center mt-2">Donor</div>
											<div className="ratings">
												<i className="fa fa-star rating-color"></i>
												<i className="fa fa-star rating-color"></i>
												<i className="fa fa-star rating-color"></i>
												<i className="fa fa-star rating-color"></i>
												<i className="fa fa-star rating-gray-color"></i>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-4 style-3">
									<div className="tour-item ">
										<div className="tour-desc bg-white">
											<div className="tour-text color-grey-3 text-center">"So happy to have found Helping Hands Morocco so I could help those in Morocco who need it. Glad Helping Hands are here to help us make a difference!"</div>
											<div className="link-name d-flex justify-content-center mt-3">- David White</div>
											<div className="link-position d-flex justify-content-center mt-2">Donor</div>
											<div className="ratings">
												<i className="fa fa-star rating-color"></i>
												<i className="fa fa-star rating-color"></i>
												<i className="fa fa-star rating-color"></i>
												<i className="fa fa-star rating-color"></i>
												<i className="fa fa-star rating-color"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</section>
		</div >
	);
};  

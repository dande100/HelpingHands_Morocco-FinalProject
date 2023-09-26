import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import sliderBGImageUrl from "../../img/slider_bg.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import "../../styles/circular-progress-bar.css";
import happyKidsImageUrl from "../../img/happyKids.jpg";
import happyKids1ImageUrl from "../../img/happyKids1.png";
import youtubeImageUrl from "../../img/youtube.png";
import AboutUs from "./aboutUs";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [isZoomed, setIsZoomed] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Function to fetch progress data from the backend
  const fetchProgress = () => {
    fetch("https://legendary-sniffle-r99wqwx49443wgp-3001.app.github.dev/api/api/progress")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const { progress } = data;
        setProgressPercentage(progress);
      })
      .catch((error) => {
        console.error("Error fetching progress data:", error);
      });
  };

  // Fetch progress data initially and set up polling
  useEffect(() => {
    fetchProgress(); // Fetch progress data initially

    // Poll the progress every 10 seconds (adjust the interval as needed)
    const intervalId = setInterval(() => {
      fetchProgress();
    }, 10000); // 10 seconds interval

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleImage2Click = () => {
    setIsZoomed(!isZoomed);
  }

	return (
		<div>
			<img
				className="backgroundImage"
				src={sliderBGImageUrl}
				alt="Slider Background"
				style={{ maxWidth: "100%", height: "auto" }}
			/>
			<div className="text-overlay">
				<h1>Give A Hand To Make <br /> The <span id="better">Better</span> World</h1>
				<p>Following the recent earthquake in Morocco, your donation can truly make a difference. <br /> Join us in helping the affected communities recover and rebuild. <br /> Your contribution offers hope and strength to those in need, and together, <br /> we can work towards a resilient Morocco.</p>
				<Link to="/signup">
					<button className="donate-button">Donate Now</button>
				</Link>
			</div>

			<div className="progress-bar">
				<div className="body">
					<div className="row">
						<div className="col-md-3 col-sm-6">
							<div className="progress blue">
								<span className="progress-left">
									<span className="progress-bar" style={{ width: `${progressPercentage}%` }}></span>
								</span>
								<span className="progress-right">
									<span className="progress-bar"></span>
								</span>
								<div className="progress-value">{Math.round(progressPercentage)}%</div>
							</div>
						</div>
						<div className="col-md-3 col-sm-6l progress-bar-statement">
							<h2>Urgent Relief</h2>
							<p>In the wake of a devastating earthquake that has left communities in Morocco reeling,<br /> we are calling upon compassionate individuals, organizations, and communities worldwide  <br /> to come together and join our mission to be a beacon of hope in aiding Morocco's earthquake recovery efforts.</p>
							<Link to="/signup">
								<button className="donate-button-statement">Donate Now</button>
							</Link>
						</div>
					</div>

					<div className="row row-cols-auto raised-goal">
					<div className="col ms-5 ps-1">Raised<br />${Math.round(progressPercentage * 500)}</div>

						<div className="col ms-3 ps-1 ">Goal<br />$50,000</div>
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
					/>
				</div>
				<AboutUs />
			</div>
			<br /> <br />
		</div>
	);
};

import React, { useEffect, useState } from "react";
import volunteer1Image from "../../img/volunteer1.jpg";
import volunteer3Image from "../../img/volunteer3.jpg";
import volunteerImage from "../../img/volunteers.jpg";
import ailyImage from "../../img/aily-avatar.jpg";
import vasanthiImage from "../../img/vasanthi-avatar.jpg";
import jessImage from "../../img/jess-avatar.jpg";
import jerryImage from "../../img/jerry-avatar.jpg";

const AboutUs = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const carouselImages1 = [volunteer1Image, volunteer3Image, volunteerImage];

    const changeCarouselImage1 = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages1.length);
    };

    useEffect(() => {
        const intervalId = setInterval(changeCarouselImage1, 3000);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-5">
                    <img
                        className="aboutUsCarouselImage"
                        src={carouselImages1[currentImageIndex]}
                        alt="Slider Background"
                    />
                </div>
                <div className="col-2"></div>
                <div className="col-5 " >
                    <h1 className="mission">Our Mission</h1>
                    <h5 className="missionH5Tag">We’re Changing Lives with your Help</h5>
                    <p className="aboutUsPTag" >Catalyzing Change, Building Hope: Our mission, led by the HelpingHands Foundation, is to rally communities and individuals worldwide in support of Morocco's recovery and rebuilding efforts following natural disasters. We believe in the power of collective action to make a lasting impact, fostering resilience, and creating a brighter future for the people of Morocco.
                        We're here to provide a helping hand to those affected by the Morocco earthquake while maintaining honesty and transparency in how donations are used. Our focus is on supporting communities and working together for a bigger impact. We always strive to do what's right, treating everyone with respect and fairness, and keeping our processes simple and efficient. Our goal is not just immediate relief but also long-term recovery and resilience, listening to and including everyone's voice. We're always learning and looking for better ways to help, and we're thankful for every donor's support, aiming to make it count.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-5 ">
                    <h1 className="vision">Our Vission</h1>
                    <h5 className="visionH5Tag"> Empowering Morocco's Communities for a Sustainable Tomorrow</h5>
                    <p className="aboutUsPTag">We envision a future where the people of Morocco thrive, resilient in the face of challenges, and united in hope. Through collective action and unwavering commitment, we strive to catalyze lasting change. Our vision is a brighter, more prosperous Morocco, where every voice is heard, where transparency and fairness prevail, and where we continuously innovate to build a better future. Together, with the support of generous donors, we aim to be a beacon of hope and transformation, driving long-term recovery and resilience for Morocco and its people."</p>
                </div>
                <div className="col-2"></div>
                <div className="col-5 ">
                    <h1 className="history">Our History</h1>
                    <h5 className="historyH5Tag">Four Students United for Morocco: A Journey of Hope and Impact</h5>
                    <p className="aboutUsPTag">Four students embarked on a journey that would change their lives and impact the lives of countless others. It all began in the year 2023, when Jess, Vasanthi, Aily, and Jerry, all studying Full Stack Web Development at 4Geeks Academy, came together with a shared dream – to make a difference in the world, particularly in Morocco.</p>
                </div>
            </div>

            <div className="row volunteersRow">
                <div className="col volunteers mt-5">
                    <h1>Our Volunteers</h1>
                    <p className="aboutUsPTag">The founders and volunteers of the HelpingHands Foundation are a remarkable group of individuals.  These four inspiring individuals are not only the visionary founders but also the driving force behind the Foundation's impactful work. Their dedication knows no bounds as they combine their unique skills and unwavering passion to create positive change. Whether providing technical expertise, fundraising acumen, linguistic skills, or heartfelt empathy, they wear multiple hats to support Morocco's communities in times of need. Their collective spirit of collaboration, compassion, and global citizenship shines through, as they work tirelessly to create a brighter future for those they serve. </p>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-3">
                    <div className="card">
                        <img src={jessImage} />
                        <div className="card-body">
                            <h5 className="card-title">President</h5>
                            <p className="card-text">Jess</p>
                            <a href="https://www.linkedin.com/in/your-linkedin-profile-url" className="btn btn-primary">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <img src={vasanthiImage} />
                        <div className="card-body">
                            <h5 className="card-title">President</h5>
                            <p className="card-text">Vasanthi</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <img src={ailyImage} />
                        <div className="card-body">
                            <h5 className="card-title">President</h5>
                            <p className="card-text">Aily</p>
                            <a href="https://www.linkedin.com/in/ailygucfa" className="btn linkedInIcon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                            </svg></a>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <img src={jerryImage} />
                        <div className="card-body">
                            <h5 className="card-title">President</h5>
                            <p className="card-text">Jerry</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>


            </div>

        </div>

    );
};

export default AboutUs;

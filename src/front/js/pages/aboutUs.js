import React from "react";
import happyKids1 from "../../img/happyKids3.png";

const AboutUs = () => {


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-5">
                    <img src={happyKids1} alt="Happy Kids" />
                </div>
                <div className="col-2"></div>
                <div className="col-5 mission" >
                    <h1>Our Mission</h1>
                    <h5 >We’re Changing Lives with your Help</h5>
                    <p >Catalyzing Change, Building Hope: Our mission, led by the HelpingHands Foundation, is to rally communities and individuals worldwide in support of Morocco's recovery and rebuilding efforts following natural disasters. We believe in the power of collective action to make a lasting impact, fostering resilience, and creating a brighter future for the people of Morocco.
                        We're here to provide a helping hand to those affected by the Morocco earthquake while maintaining honesty and transparency in how donations are used. Our focus is on supporting communities and working together for a bigger impact. We always strive to do what's right, treating everyone with respect and fairness, and keeping our processes simple and efficient. Our goal is not just immediate relief but also long-term recovery and resilience, listening to and including everyone's voice. We're always learning and looking for better ways to help, and we're thankful for every donor's support, aiming to make it count.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-5 vision">
                    <h1>Our Vission</h1>
                    <h5> Empowering Morocco's Communities for a Sustainable Tomorrow</h5>
                    <p>We envision a future where the people of Morocco thrive, resilient in the face of challenges, and united in hope. Through collective action and unwavering commitment, we strive to catalyze lasting change. Our vision is a brighter, more prosperous Morocco, where every voice is heard, where transparency and fairness prevail, and where we continuously innovate to build a better future. Together, with the support of generous donors, we aim to be a beacon of hope and transformation, driving long-term recovery and resilience for Morocco and its people."</p>
                </div>
                <div className="col-2"></div>
                <div className="col-5 history">
                    <h1>Our History</h1>
                    <h5>Four Students United for Morocco: A Journey of Hope and Impact</h5>
                    <p>Four students embarked on a journey that would change their lives and impact the lives of countless others. It all began in the year 2023, when Jess, Vasanthi, Aily, and Jerry, all studying Full Stack Web Development at 4Geeks Academy, came together with a shared dream – to make a difference in the world, particularly in Morocco.</p>
                </div>

            </div>
        </div>

    );
};

export default AboutUs;

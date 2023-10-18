import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import CircularProgressBar from "./circularProgressBar";
import "../../styles/thank-you.css";
import "../../styles/circular-progress-bar.css";

export const ThankYou = () => {
    const { store, actions } = useContext(Context);
    const [filteredDonationHistory, setFilteredDonationHistory] = useState([]);

    useEffect(() => {
        actions.getUser()
        console.log(localStorage.getItem("user_id"))
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

    return (
        <>
            <div className="d-flex m-5 p-2 bd-highlight">Dear {store.user.first_name}  {store.user.last_name},<br></br><br></br>

                We want to express our heartfelt gratitude for your generous contribution to support earthquake relief efforts in Morocco.
                Your kindness and compassion are making a significant impact on the lives of those affected by this disaster.<br></br><br></br>

                Your donation is a beacon of hope in these challenging times. It will provide critical resources and assistance to earthquake-affected communities,
                ensuring that they receive the help they urgently need. Whether it's providing shelter, clean water, medical care, or educational support, your support is helping us rebuild lives and communities.<br></br><br></br>

                We want to assure you that your donation has been received and recorded. Your contribution will be used efficiently and effectively to make a tangible difference in Morocco's recovery journey.<br></br><br></br>

                At HelpingHands Morocco, our mission is clear: to rebuild lives and communities, one step at a time. We believe in the power of collective action and compassion to bring hope to those in need.
                Your support goes beyond financial assistance; it embodies the spirit of solidarity and empathy.<br></br><br></br>

                We are deeply committed to transparency and accountability. We promise to keep you informed about the progress of our relief projects,
                sharing success stories and updates on how your support is making an impact.<br></br><br></br>

                We will immediately put your contribution to work, ensuring that it reaches those who need it most.
                In the coming weeks, we will provide updates on our relief efforts and the difference you are helping us make.<br></br><br></br>

                Once again, thank you for your generosity and compassion. With supporters like you, we can bring hope and relief to those facing adversity.<br></br><br></br>

                Warm regards,<br></br><br></br>


                HelpingHands Morocco Team<br></br><br></br>
            </div>
            <div className="progress-bar">
                <div className="row progress-bar1">
                    <p className="text-dark fs-4"><strong>Your donation has been added to the HelpingHands Morocco support fund!</strong>
                    </p>
                    <div className="col-6"><CircularProgressBar /></div>
                </div>
                <div className="row  raised-goal mt-3">
                    <div className="col">Raised<br />${Math.round(store.progressPercentage * 500)}</div>

                    <div className="col">Goal<br />$50,000</div>
                </div>
            </div >
        </>
    );
};
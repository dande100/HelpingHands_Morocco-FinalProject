import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import DateFilter from "./dateFilter";
import PrintDonationHistory from "./printDonationHistory";
import "../../styles/thank-you.css";

export const ThankYou = () => {
    const { store, actions } = useContext(Context);
    const [filteredDonationHistory, setFilteredDonationHistory] = useState([]);

    useEffect(() => {
        actions.getUser()
        console.log(localStorage.getItem("user_id"))
        actions.fetchEachDonation();
        setFilteredDonationHistory(store.donations);
        console.log(store.donations)
    }, [])

    const shareButtons = document.querySelectorAll('.share-button');
    const url = window.location.href;

    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = window.location.href;
            const platform = button.classList[1];

            let shareUrl;
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/share?url=${encodeURIComponent(url)}`;
                    break;
                case 'reddit':
                    shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}`;
                    break;
            }

            window.open(shareUrl, '_blank');
        });
    });

    return (
        <>
            <div className="d-flex m-5 p-2 bd-highlight">Dear {store.user.first_name}  {store.user.last_name},<br></br><br></br>

                We want to express our heartfelt gratitude for your generous contribution to support earthquake relief efforts in Morocco.
                Your kindness and compassion are making a significant impact on the lives of those affected by this disaster.<br></br><br></br>

                Your donation of (Donation Amount) is a beacon of hope in these challenging times. It will provide critical resources and assistance to earthquake-affected communities,
                ensuring that they receive the help they urgently need. Whether it's providing shelter, clean water, medical care, or educational support, your support is helping us rebuild lives and communities.<br></br><br></br>

                We want to assure you that your donation has been received and recorded. Your contribution will be used efficiently and effectively to make a tangible difference in Morocco's recovery journey.<br></br><br></br>

                At HelpingHands Morocco, our mission is clear: to rebuild lives and communities, one step at a time. We believe in the power of collective action and compassion to bring hope to those in need.
                Your support goes beyond financial assistance; it embodies the spirit of solidarity and empathy.<br></br><br></br>

                We are deeply committed to transparency and accountability. We promise to keep you informed about the progress of our relief projects,
                sharing success stories and updates on how your support is making an impact.<br></br><br></br>

                We will immediately put your contribution to work, ensuring that it reaches those who need it most.
                In the coming weeks, we will provide updates on our relief efforts and the difference you are helping us make.<br></br><br></br>

                We encourage you to stay connected with us and follow our progress.
                Consider subscribing to our newsletter for regular updates on how your support is impacting Morocco's recovery journey.<br></br><br></br>

                Once again, thank you for your generosity and compassion. With supporters like you, we can bring hope and relief to those facing adversity.<br></br><br></br>

                Warm regards,<br></br><br></br>


                HelpingHands Morocco<br></br><br></br>
            </div>
            <div className="container flex" id="progBarDiv">
                <div className="row">
                    <div className="col-4 mt-3">
                        <div className="container">
                            <div>
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
                    </div>
                    <div className="col-7 mt-2">
                        <p><strong>Your donation has been added to the HelpingHands Morocco supportfund and brought the raised total to "new amount"!<br></br>
                            Your transaction ID # is: "transaction number"</strong>
                        </p>
                    </div>
                    <div className="row row-cols-auto">
                        <div className="col ms-5">

                        </div>
                        <div className="col ms-5 pt-n4 ps-1">Raised<br></br>
                            $37,500

                        </div>
                        <div className="col ms-3 pt-n4 ps-1">Goal<br></br>
                            $50,000

                        </div>
                        <div className="col">

                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <div className="row position-relative">
                    <div className="col-3 me-5">

                    </div>
                    <div className="col-8 ms-5 ps-5 position-absolute top-0 start-50 translate-middle-x">
                        <h6><strong>Spread the word! Share our campaign with your social media friends!</strong></h6>
                    </div>
                    <div className="col-1">

                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-4">

                    </div>
                    <div className="col-6 my-4 share-buttons">
                        <button className="share-button facebook" style={{ height: "100px", width: "100px", border: "none" }}
                            onClick={window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)}><svg xmlns="http://www.w3.org/2000/svg" className="me-2 pe-3" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                            </svg></button>
                        <button className="share-button twitter" style={{ height: "100px", width: "100px", border: "none" }}><svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                        </svg></button>
                        <button className="share-button reddit" style={{ height: "100px", width: "100px", border: "none" }}><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="rgb(255,69,0)"><path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z" /></svg></button>
                    </div>
                    <div className="col-2">

                    </div>
                </div>
            </div>

        </>
    );
};
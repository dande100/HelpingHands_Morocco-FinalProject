import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/thank-you.css";

export const ThankYou = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
            <div className="d-flex mx-5 p-2 bd-highlight">Dear (Donor's Name),<br></br><br></br>
                
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


                HelpingHands Morocco<br></br>

                (Contact Information)<br></br><br></br>
            </div>
            <div className="d-flex" id="progBarDiv">
                <img className= "hardCodeProgBar" src="https://www.shutterstock.com/image-vector/green-progress-bar-circle-260nw-609370772.jpg"></img>
                <p>Your donation has been added to the HelpingHands Morocco supportfund and brought the raised total to "new amount"!<br></br>
                    Your transaction ID # is: "transaction number"
                </p>
                <span>Raised<br></br>
                    $37,500
                </span>
                <span>Goal<br></br>
                    $50,000
                </span>

            </div>
        </>
	);
};
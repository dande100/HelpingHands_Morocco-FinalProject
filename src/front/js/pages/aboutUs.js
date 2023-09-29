import React, { useRef, useState } from "react"

const AboutUs = () => {
    const aboutUsSectionRef = useRef(null);
    const [readMoreText, setReadMoreText] = useState("Read More");
    const [showStatement2, setShowStatement2] = useState(false);

    const handleReadMoreClick = () => {
        setShowStatement2(!showStatement2);
        setReadMoreText(showStatement2 ? "Read More" : "Read Less");
    };

    return (

        <div id="aboutUs" className="col aboutUsStatement" ref={aboutUsSectionRef}>
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
      
    );
};

export default AboutUs;

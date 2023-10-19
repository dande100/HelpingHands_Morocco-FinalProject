import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";
import "../../styles/contact.css"
import backgroundUrl from "../../img/about-bg.jpg"

export const Contact = () => {
    const { store, actions } = useContext(Context);
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [commentsInput, setCommentsInput] = useState("");

    const onSubmit = () => {
        let senderInfo = {
            first_name: firstNameInput,
            last_name: lastNameInput,
            email: emailInput,
            phone: phoneInput,
            comments: commentsInput
        }
        actions.sendContactForm(senderInfo)
    }

    return (
        <>
            <div id="contactPageContainer">
                <div className="page-header" style={{ backgroundImage: `url(${backgroundUrl})` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Contact Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-4" id="contactPageP">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <p className="fs-4">
                                If you have any questions for our team send us a message below. If you are interested in ways you can help or
                                about volunteering in Morocco please fill out the form below. We will reach out to you about our next
                                volunteer trip schedules and other ways to get involved!
                            </p>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
                <div className="container mt-4" id="contactBody">
                    <div className="row">
                        <div className="col-5">
                        </div>
                        <div className="card col-10" id="contactFormCard">
                            <div className="card-body">
                                <form id="contactForm" >
                                    <div className="mb-3">
                                        <label htmlFor="Name" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="firstNameInput" name="first_name" placeholder="John Doe"
                                            onChange={event => setFirstNameInput(event.target.value)} value={firstNameInput}></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Name" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lastNameInput" name="last_name" placeholder="John Doe"
                                            onChange={event => setLastNameInput(event.target.value)} value={lastNameInput}></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Email" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="emailInput" name="email" placeholder="john@abc.com"
                                            onChange={event => setEmailInput(event.target.value)} value={emailInput}></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Phone-Number" className="form-label">Phone Number</label>
                                        <input type="text" className="form-control" id="phoneInput" name="phone" placeholder="1-555-222-1234"
                                            onChange={event => setPhoneInput(event.target.value)} value={phoneInput}></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Comments" className="form-label">Questions/Comments</label>
                                        <textarea type="text-area" className="form-control" id="commentsInput" name="comments" rows="5" placeholder="Let us know how we can help you help others."
                                            onChange={event => setCommentsInput(event.target.value)} value={commentsInput}></textarea>
                                    </div>
                                    <button id="contactFormSubmit" name="submit"
                                        onClick={() => onSubmit()}>Submit</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

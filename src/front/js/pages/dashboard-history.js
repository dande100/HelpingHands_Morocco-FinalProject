import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import PrintDonationHistory from "./printDonationHistory";
import DateFilter from "./dateFilter";

export const DashboardHistory = () => {
    const { store, actions } = useContext(Context);
    const { userDonationHistory } = store; // Get the user's donation history from the store
    const { user_id } = useParams(); // Get the user ID from the URL params
    const [filteredDonationHistory, setFilteredDonationHistory] = useState([]);


    useEffect(() => {
        // Fetch user's donation history when the component mounts
        actions.fetchEachDonation(user_id);
    }, [user_id, actions]);

    const handlePrint = () => {
        window.print(); // Trigger the browser's print dialog
    };

    const handleFilter = (selectedDate) => {
        if (selectedDate === "All") {
            setFilteredDonationHistory(userDonationHistory);
        } else {
            const filteredData = userDonationHistory.filter((payment) => {
                return payment.date === selectedDate;
            });
            setFilteredDonationHistory(filteredData);
        }
    };

    return (
        <>
            <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col dashboard">
                            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mx-5 my-5">
                                <ol className="breadcrumb mt-0">
                                    <li className="breadcrumb-item"><Link to="/dashboard">User Profile</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Donation History</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px" }}></img>
                                    <h5 className="my-3">Jess Morrison</h5>
                                    <p className="text-muted mb-4">Clearwater, Florida, USA</p>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0"></div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="col-sm-10">
                                    <div className="card-body">
                                        <div className="row">
                                            <DateFilter onFilter={handleFilter} onPrint={handlePrint} />
                                            <h3 className="my-3 donationHistoryHeader">Donation History</h3>
                                        </div>
                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Currency</th>
                                                <th>Payment Method</th>
                                                <th>Donation Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredDonationHistory.map((payment) => (
                                                <tr key={payment.id}>
                                                    <td>{payment.date}</td>
                                                    <td>{payment.currency}</td>
                                                    <td>{payment.payment_method}</td>
                                                    <td>${payment.payment_amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

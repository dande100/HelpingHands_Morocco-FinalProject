import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import PrintDonationHistory from "./printDonationHistory";
import DateFilter from "./dateFilter";

export const DashboardHistory = () => {
    const { store, actions } = useContext(Context);
    const [userDonationHistory, setUserDonationHistory] = useState([]);
    const { user_id } = useParams(); // Get the user ID from the URL params
    const [filteredDonationHistory, setFilteredDonationHistory] = useState(userDonationHistory);

    useEffect(() => {
        actions.fetchEachDonation(user_id);
    }, [user_id]);

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
                        <div className="col">
                            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 my-5">
                                <ol className="breadcrumb mb-0">
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

// import React, { useState, useEffect, useContext } from "react";

// import { Context } from "../store/appContext";
// import "../../styles/contact.css";
// import { Link } from "react-router-dom";
// import layout from "../layout";

// export const DashboardHistory = () => {
//     const { store, actions } = useContext(Context);

//     return (
//         <>
//             <section style={{ backgroundColor: "#eee" }}>
//                 <div className="container py-5">
//                     <div className="row">
//                         <div className="col">
//                             <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 my-5">
//                                 <ol className="breadcrumb mb-0">
//                                     <li className="breadcrumb-item"><Link to="/dashboard">User Profile</Link></li>
//                                     <li className="breadcrumb-item active" aria-current="page">Donation History</li>
//                                 </ol>
//                             </nav>
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-lg-4">
//                             <div className="card mb-4">
//                                 <div className="card-body text-center">
//                                     <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
//                                         className="rounded-circle img-fluid" style={{ width: "150px" }}></img>
//                                     <h5 className="my-3">Jess Morrison</h5>
//                                     <p className="text-muted mb-4">Clearwater, Florida, USA</p>
//                                 </div>
//                             </div>
//                             <div className="card mb-4 mb-lg-0">
//                                 <div className="card-body p-0">

//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-lg-8">
//                             <div className="card mb-4">
//                                 <div className="card-body">
//                                     <div className="row">
//                                         <div className="col-sm-10">
//                                             <h3 className="my-3">Donation History</h3>
//                                         </div>
//                                         <div className="col-sm-3">
//                                             <p className="mb-0">Date</p>
//                                         </div>
//                                         <div className="col-sm-9">
//                                             <p className="text-muted mb-0">09/01/2023</p>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-sm-3">
//                                             <p className="mb-0">Currency</p>
//                                         </div>
//                                         <div className="col-sm-9">
//                                             <p className="text-muted mb-0">$ Dollars</p>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-sm-3">
//                                             <p className="mb-0">Payment Method</p>
//                                         </div>
//                                         <div className="col-sm-9">
//                                             <p className="text-muted mb-0">Credit Card</p>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-sm-3">
//                                             <p className="mb-0">Donation Amount</p>
//                                         </div>
//                                         <div className="col-sm-9">
//                                             <p className="text-muted mb-0">$5000</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }
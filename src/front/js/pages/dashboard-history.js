import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PrintDonationHistory from "./printDonationHistory";
import DateFilter from "./dateFilter";

export const DashboardHistory = () => {
    const { store, actions } = useContext(Context);
    const [filteredDonationHistory, setFilteredDonationHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState(""); // Add selecte


    useEffect(() => {
        // Fetch user's donation history when the component mounts
        actions.fetchEachDonation();
    }, []);

    const handlePrint = () => {
        window.print(); // Trigger the browser's print dialog
    };

    const handleFilter = (selectedDate) => {
        setSelectedDate(selectedDate);

        actions.fetchEachDonation(selectedDate);
        if (selectedDate === "All") {
            setFilteredDonationHistory(store.donations);
        } else {
            const filteredData = store.donations.filter((payment) => {

                let newPayment = ""; // Initialize as an empty string
                for (let i = 4; i < 8; i++) {
                    newPayment += payment.date.toString()[i]; // Use += to concatenate
                }
                let newSelected = ""; // Initialize as an empty string
                for (let i = 0; i < 4; i++) {
                    newSelected += selectedDate[i]; // Use += to concatenate
                }
                console.log(newPayment, "payment date")
                console.log(newSelected, "selected")

                return newPayment === newSelected;
            });
            setFilteredDonationHistory(filteredData);
        }
    };
    // const handleFilter = (selectedDate) => {
    //     setSelectedDate(selectedDate);

    //     if (selectedDate === "All") {
    //         setFilteredDonationHistory(store.donations);
    //     } else {
    //         const filteredData = store.donations.filter((payment) => {
    //             const paymentYear = payment.date.substring(0, 4); // Extract the year portion (e.g., "2023")
    //             return paymentYear === selectedDate;
    //         });
    //         setFilteredDonationHistory(filteredData);
    //     }
    // };


    useEffect(() => {
        actions.getUser()
        console.log(localStorage.getItem("user_id"))
    }, [])

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
                                    <img src={store.user.gender == "male" ? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1696263499~exp=1696264099~hmac=e15908ec944c24765a64d9b8185abf84624a8d5de64883456a88f04bbb692d58' :
                                        store.user.gender == "not specified" ? 'https://t3.ftcdn.net/jpg/01/77/54/02/360_F_177540231_SkxuDjyo8ECrPumqf0aeMbean2Ai1aOK.jpg' :
                                            'https://img.freepik.com/free-vector/illustration-businesswoman_53876-5857.jpg?w=740&t=st=1696264556~exp=1696265156~hmac=32e49fc27755cf638e74a7414a1ef7dd852eedce42db8323c85c7499f1244623'} alt="avatar"
                                        className="rounded-circle img-fluid" style={{ width: "250px", height: "250px" }}></img>
                                    <h5 className="mt-n5 mb-3 fs-2">{store.user.first_name}  {store.user.last_name}</h5>
                                    <p className="text-muted mb-4 fs-3">{store.user.city},  {store.user.state}, {store.user.country}</p>
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
                                                <th>Payment Method</th>
                                                <th>Currency</th>
                                                <th>Donation Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredDonationHistory.map((payment) => (
                                                <tr key={payment.id}>
                                                    <td>{payment.date}</td>
                                                    <td>{payment.payment_method}</td>
                                                    <td>{payment.currency}</td>
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
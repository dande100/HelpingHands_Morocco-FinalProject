import React from "react";


const PrintDonationHistory = ({ userDonationHistory }) => {
    return (
        <div className="printable-content">

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
                    {userDonationHistory.map((donation) => (
                        <tr key={donation.id}>
                            <td>{donation.time_created}</td>
                            <td>{donation.currency}</td>
                            <td>{donation.payment_method}</td>
                            <td>${donation.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrintDonationHistory;

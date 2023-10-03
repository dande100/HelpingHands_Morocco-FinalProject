import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";
import "../../styles/contact.css";
import { Link } from "react-router-dom";

export const Dashboard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getUser()
        console.log(localStorage.getItem("user_id"))
    }, [])

    return (
        <>
            <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 my-5">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                                    <li className="breadcrumb-item"><Link to="/dashboard-history">Donation History</Link></li>
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
                                    {/* <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="btn btn-primary">Edit Contact info</button>
                                    </div> */}
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{store.user.first_name} {store.user.last_name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{store.user.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{store.user.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{store.user.street_address}, {store.user.city}, {store.user.state}, {store.user.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
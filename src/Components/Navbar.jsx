import React from "react";
import "../css/navbar.css";
import profileImg from "../Assets/user-profile.jpg";
// import { Link } from "react-router-dom";

function Navbar()
{
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand">EventHub</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav">
                <a className="nav-link" href="/">Browse Events</a>
                <a className="nav-link" href="./likedEvents">Liked Events</a>
                <a className="nav-link" href="./hostevent">Host an Event</a>
              </div>
              <div className="profile">
                <img src={profileImg} alt="profile-img"/>
                <span>aanchalrakheja2001</span>
              </div>
            </div>
          </div>
        </nav>
    );
}

export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
import "../css/likedEvents.css";

function LikedEvents()
{
    return(
        <Link to="./likedEvents">
            <div className="favourite">
                <i className="fas fa-heart"/>
            </div>
        </Link>
    );
}
export default LikedEvents;
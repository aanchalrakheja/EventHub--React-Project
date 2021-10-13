import React from "react";
import "../css/eventcard.css";
import { doc,runTransaction } from "firebase/firestore";
import db from "../firebase";
import defaultEventImg from "../Assets/default-event.png";

function EventCard(props)
{   
    // state to toggle the like heart button
    const[is_liked,setLike]=React.useState(props.val.isLiked);

    // function to handleLike which updates the is_Liked field in the database
    async function handleLike(itemid)
    {
        const docRef=doc(db,"Events",itemid);
        try {
            await runTransaction(db, async (transaction) => {
              const sfDoc = await transaction.get(docRef);
              const updatedValue=sfDoc.data().isLiked===true?false:true;
              transaction.update(docRef, { isLiked: updatedValue });
              setLike(updatedValue);
            });
          } catch (e) {
            console.log("Transaction failed: ", e);
          }
    }

    return(
        <div className="eventcard">
            <div className="event-image">
                <img src={props.val.Image===""?defaultEventImg:props.val.Image} alt="event"/>
            </div>
            <div className="event-details">
                <p className="event-name">{props.val.Name}</p>
                <p className="event-date"><i className="far fa-calendar-alt"></i>{props.val.Date.split("-").reverse().join("/")}</p>
                <p className="event-time"><i className="fas fa-clock"></i>{props.val.Time}</p>
                <p className="event-location"><i className="fas fa-map-marker-alt"></i>{props.val.Location}</p>
                <div className="event-like" onClick={()=>{
                    handleLike(props.id);
                }}>
                {/* shows outlined white coloured heart if event is not liked and a red heart if the event is liked */}
                    {is_liked===false?<i className="far fa-heart unliked"></i>:<i className="fas fa-heart liked"></i>}
                </div>
            </div>
        </div>
    )
}

export default EventCard;
import React from "react";
import "../css/hostevent.css";
import { collection, addDoc } from "firebase/firestore"; 
import db from "../firebase";


function HostEvent()
{
    // finding the current date to limit user from entering event date past current date
    const d=new Date();
    const currentYear=d.getFullYear();
    const currentMonth=d.getMonth()+1;
    const currentDate=d.getDate();

    // states to handle form submission and updating events
    const [name,setName]=React.useState("");
    const [date,setDate]=React.useState("");
    const [time,setTime]=React.useState("");
    const [location,setLocation]=React.useState("");
    const [img,setImg]=React.useState("");

    function handleNameChange(e)
    {
        setName(e.target.value);
    }
    function handleDateChange(e)
    {
        setDate(e.target.value);
        console.log(e.target.value.split("-").reverse().join("-"));
    }
    function handleTimeChange(e)
    {
        setTime(e.target.value);
        console.log(e.target.value);
    }
    function handleLocChange(e)
    {
        setLocation(e.target.value);
        console.log(e.target.value);
    }
    function handleImgChange(e)
    {
        setImg(e.target.value);
        console.log(e.target.value);
    }

    // function to handle form submission which adds a new event to the database
    async function handleSubmit(e)
    {
        e.preventDefault();
        console.log("submitted");
        try {
            const docRef = await addDoc(collection(db, "Events"), {
              Name:name,
              Date:date,
              Time:time,
              isLiked:false,
              Image:img,
              Location:location
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          setLocation("");
          setName("");
          setDate("");
          setTime("");
          window.location.href="./";
    }

    return(
        <div className="event-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="event-name">Event Name</label>
                <input id="event-name" type="text" max="200" placeholder="Enter the name of the event" value={name} onChange={handleNameChange} required></input>
                
                <label htmlFor="event-date">Event Date</label>
                <input id="event-date" type="date" min={`${currentYear}-${currentMonth}-${currentDate}`} value={date} onChange={handleDateChange} required></input>
                
                <label htmlFor="event-time">Event Time</label>
                <input id="event-time" type="time" value={time} onChange={handleTimeChange} required></input>
                
                <label htmlFor="event-location">Event Location</label>
                <input id="event-location" type="text" max="200" placeholder="Enter the location of the event" value={location} onChange={handleLocChange}></input>
                
                <label htmlFor="event-image">Event Image</label>
                <input id="event-image" type="file" accept="image/*" onChange={handleImgChange}></input>

                <input type="submit" value="ADD EVENT" id="addEvent"></input>
            </form>
        </div>
    )
}

export default HostEvent;
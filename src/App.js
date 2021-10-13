import React from "react";
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
// IMPORTING COMPONENTS
import EventCard from "./Components/EventCard";
import HostEvent from "./Components/HostEvent";
import Navbar from "./Components/Navbar";
import LikedEvents from "./Components/LikedEvents";
// IMPORTING CSS
import "../src/css/App.css";
// IMPORTING DATABASE REQUIREMENTS
import db from "./firebase";
import { collection, getDocs } from "firebase/firestore"; 

function App() {
  const[events,setEvents]=React.useState([]);

  React.useEffect(()=>{
    async function getData(){
      const data=[];
      const querySnapshot = await getDocs(collection(db, "Events"));
      querySnapshot.forEach((doc) => {
        data.push({
          id:doc.id,
          data:doc.data()
        });
      });
      setEvents(data);
    }
    getData();

    // cleanup function which runs when the component in unmounted
    return ()=>{
      getData();
    };
  },[]);

  return (
    <Router>
    <div className="App">
      <Navbar/>
        <Switch>
          <Route exact path="/">
            <div className="event-container">
                <h3 className="heading">Upcoming Events</h3>
                {/* mapping all the events to the event cards */}
                {events.map((val)=>{
                  return <EventCard val={val.data} key={val.id} id={val.id}/>
                })}
            </div>
          </Route>
          
{/* shows likedevents component only when the route is /likedEvents */}
          <Route path="/likedEvents">
            <div className="liked-events">
              <h3 className="heading">Liked Events</h3>
              {/* filtering the events which are liked */}
              {events.filter((val)=>{
                return val.data.isLiked===true;
              }).map((item)=>{
                return <EventCard val={item.data} key={item.id} id={item.id}/>
              })}
            </div>
          </Route>

{/* shows host an event form only when the route is /hostEvent */}
          <Route path="/hostEvent">    
            <div className="host-event">
              <h3 className="heading">Host an Event</h3>
              <HostEvent/>
            </div>
          </Route>
        </Switch>
      <LikedEvents/>
    </div>
    </Router>
  );
}

export default App;

import React from "react";
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import EventCard from "./Components/EventCard";
import HostEvent from "./Components/HostEvent";
import Navbar from "./Components/Navbar";
import LikedEvents from "./Components/LikedEvents";
import "../src/css/App.css";
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
                {events.map((val)=>{
                  return <EventCard val={val.data} key={val.id} id={val.id}/>
                })}
            </div>
          </Route>
          
          <Route path="/likedEvents">
            <div className="liked-events">
              <h3 className="heading">Liked Events</h3>
              {events.filter((val)=>{
                return val.data.isLiked===true;
              }).map((item)=>{
                return <EventCard val={item.data} key={item.id} id={item.id}/>
              })}
            </div>
          </Route>

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

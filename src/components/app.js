/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

import MapView from './mapview';
import Create from './create';


export const navStyle = {
  flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', flexFlow: 'row', listStyleType: 'none',
};

export const navOptionStyleHover = {
  color: 'orange',
  fontSize: '20px',
};

export const navOptionStyle = {
  color: '#FFFFFF',
};

const Nav = (props) => {
  const [isHover, setIsHover] = useState(false);
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);


  // @bella also change this. The <ol> / <li> should be changed; only thing to be preserved here exactly is the NavLink components
  return (
    <nav>
      <ol style={navStyle}>
        <li style={isHover ? navOptionStyleHover : navOptionStyle}
          onMouseEnter={() => { setIsHover(true); }}
          onMouseLeave={() => { setIsHover(false); }}
        >
          <NavLink to="/" exact>Home</NavLink>
        </li>
        <li style={isHover1 ? navOptionStyleHover : navOptionStyle}
          onMouseEnter={() => { setIsHover1(true); }}
          onMouseLeave={() => { setIsHover1(false); }}
        >
          <NavLink to="/whatsup">{'See what\'s up with who\'s down!'}</NavLink>
        </li>
        <li style={isHover2 ? navOptionStyleHover : navOptionStyle}
          onMouseEnter={() => { setIsHover2(true); }}
          onMouseLeave={() => { setIsHover2(false); }}
        >
          <NavLink to="/create">Create portal (only to be used to that listserv middleman)</NavLink>
        </li>
      </ol>

    </nav>

  );
};

const FallBack = (props) => {
  // this is our 404 page, this is also a low priority
  return <div>URL Not Found</div>;
};


const Welcome = (props) => {
  // @bella the majority of your work will go right here in the return block of this function, this is your highest priority

  const styleObj = {
    fontSize: 30,
    color: '#4a54f1',
    paddingTop: '100px',
  };


  // ^now you can re-use this style object where you need to

  return (
    <div>
      <h1 style={{ color: 'orange' }}>Who's Down: Spontaneity Organized.</h1>
      <div style={styleObj}>Imagine a Campus Where...</div> {/* this style is ugly don't use this just wanted to show you an example */}
      <ul>
        <li>No commitment is necessary to meet new people.</li>
        <li>A user-friendly interface shows what’s happening on campus right now.</li>
        <li>People, not organizations, create events.</li>
      </ul>
      <div> The meaningful connections of the ‘24s don’t have to be another casualty of COVID-19.</div>
      <div className="container">
        Featuring hard event capacity limits that prevent discovery of full events,
        rigorous data analytics and event moderation to measure and enforce compliance,
        in-app reminders to follow public safety measures, and built in functionality
        to organize real-life and virtual events alike, Who’s Down offers a way for ‘24s and
        other Dartmouth undergraduates to ameliorate the pains of social distancing in a measurably safe way.
      </div>
      <img src="https://live.staticflickr.com/65535/50201520242_9bdce03c13_b.jpg" alt="" />
      <div>
        <ul style={{
          flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', flexFlow: 'row',
        }}
        >
          <div>
            <li>Geographically and Systematically View Events Near You</li>
            <ul>
              <li style={{ overflowWrap: 'break-word' }}>We help event seekers discover spontaneous events through geographic display and extensive filtering capabilities.</li>
            </ul>
          </div>
          <div>
            <li>Connect Students Across Communities</li>
            <ul>
              <li>We help you publish events  to create and plan them as they occur.</li>
            </ul>
          </div>
          <div>
            <li>Manage Remote Events</li>
            <ul>
              <li>We support in-person and virtual events, helping students keep track of Zoom links and in-person gatherings to connect with the events that matter to them.</li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};

// ==================== EVERYTHING BELOW THIS LINE BELLA DOESN'T NEED TO TOUCH ==================== //

const About = (props) => {
  // don't touch this
  return <MapView />;
};


const App = (props) => {
  // don't touch this
  return (
    <div>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/whatsup" component={About} />
            <Route path="/create" component={Create} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import '../style.scss';
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
    <nav className="navBar">
      <ol style={navStyle}>
        <li style={isHover ? navOptionStyleHover : navOptionStyle}
          onMouseEnter={() => { setIsHover(true); }}
          onMouseLeave={() => { setIsHover(false); }}
        >
          <NavLink to="/" exact style={{ color: '#ff5722', fontFamily: 'Montserrat', fontWeight: 'bold' }}>Home</NavLink>
        </li>
        <li style={isHover1 ? navOptionStyleHover : navOptionStyle}
          onMouseEnter={() => { setIsHover1(true); }}
          onMouseLeave={() => { setIsHover1(false); }}
        >
          <NavLink to="/whatsup" style={{ color: '#ff5722', fontFamily: 'Montserrat' }}>Explore</NavLink>
        </li>
        <li style={isHover2 ? navOptionStyleHover : navOptionStyle}
          onMouseEnter={() => { setIsHover2(true); }}
          onMouseLeave={() => { setIsHover2(false); }}
        >
          <NavLink to="/create" style={{ color: '#ff5722', fontFamily: 'Montserrat' }}>Create Portal</NavLink>
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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#B5D8CF',
    paddingTop: '100px',
    backgroundColor: 'black',
  };


  // ^now you can re-use this style object where you need to

  const boldText = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
  };

  const blueHeaderStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#005975',
    paddingTop: '100px',
  };

  const blueBodyStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 12,
    fontWeight: 'extra-light',
    color: '#005975',
  };

  return (
    <div>
      <div className="titleBox">
        <h1 style={{
          fontFamily: 'Pacifico', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 25, fontSize: 40,
        }}
        >Who's Down
        </h1>
        <h1 style={{
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', marginBottom: 60, marginLeft: 10, fontSize: 30,
        }}
        > Spontaneity Organized.
        </h1>
      </div>

      <div className="mainPage">

        <div className="imagine">Imagine a Campus Where...</div> {/* this style is ugly don't use this just wanted to show you an example */}
        <div className="topBox">
          <div className="reasonBox"><p className="basicText">No commitment is necessary to meet new people.</p></div>
          <div className="reasonBox"><p className="basicText">A user-friendly interface shows what’s happening on campus right now.</p></div>
          <div className="reasonBox"><p className="basicText">People, not organizations, create events.</p></div>
        </div>

        <img className="image" src="https://live.staticflickr.com/65535/50201520242_9bdce03c13_b.jpg" alt="whosdowninfographic" />

        <div className="appDesc">
          <div className="topBox"> <p className="basicTextBoldWhite">The meaningful connections of the ‘24s don’t have to be another casualty of COVID-19.</p></div>
          <div className="topBox">
            <p className="basicTextWhite">
              Featuring hard event capacity limits that prevent discovery of full events,
              rigorous data analytics and event moderation to measure and enforce compliance,
              in-app reminders to follow public safety measures, and built in functionality
              to organize real-life and virtual events alike, Who’s Down offers a way for ‘24s and
              other Dartmouth undergraduates to ameliorate the pains of social distancing in a measurably safe way.
            </p>
          </div>

        </div>
        <div className="topBox">

          <div className="reasonBox">
            <p className="basicTextBold">Geographically and Systematically View Events Near You</p>

            <p className="basicText">We help event seekers discover spontaneous events through geographic display and extensive filtering capabilities.</p>

          </div>

          <div className="reasonBox">
            <p className="basicTextBold">Connect Students Across Communities</p>

            <p className="basicText">We help you publish events  to create and plan them as they occur.</p>

          </div>

          <div className="reasonBox">
            <p className="basicTextBold">Manage Remote Events</p>

            <p className="basicText">We support in-person and virtual events, helping students keep track of Zoom links and in-person gatherings to connect with the events that matter to them.</p>

          </div>


        </div>
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

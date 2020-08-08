/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

import MapView from './mapview';
import Create from './create';


const Nav = (props) => {
  // @bella also change this. The <ol> / <li> should be changed; only thing to be preserved here exactly is the NavLink components
  return (
    <nav>
      <ol>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/whatsup">{'See what\'s up with who\'s down!'}</NavLink></li>
        <li><NavLink to="/create">Create portal (only to be used to that listserv middleman)</NavLink></li>
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
  return (
    <div>
      <div>Marketing website goes here</div>
      <div>Who's Down: Spontaneity Organized.</div>
      <div>Imagine a Campus Where...</div>
      <ol>
        <li>No commitment is necessary to meet new people.</li>
        <li>A user-friendly interface shows what’s happening on campus right now.</li>
        <li>People, not organizations, create events.</li>
      </ol>
      <div> The meaningful connections of the ‘24s don’t have to be another casualty of COVID-19.</div>
      <div>Featuring hard event capacity limits that prevent discovery of full events, rigorous data analytics and event moderation to measure and enforce compliance, in-app reminders to follow public safety measures, and built in functionality to organize real-life and virtual events alike, Who’s Down offers a way for ‘24s and other Dartmouth undergraduates to ameliorate the pains of social distancing in a measurably safe way.</div>
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

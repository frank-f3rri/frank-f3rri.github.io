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

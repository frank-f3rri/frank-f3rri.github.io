/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable indent */

// change require to es6 import style
// eslint-disable-next-line no-unused-vars
import $ from 'jquery';
// eslint-disable-next-line import/no-absolute-path
import '/Users/arjunbhatt/Documents/GitHub/sa6/src/style.scss';
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-duplicates
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// eslint-disable-next-line import/no-duplicates
import { Switch } from 'react-router-dom';
import MapView from './mapview';
import Create from './create';

// import to be used in your App component


/* const App = () => <div className="test">All the REACT are belong to us!</div>; */


const About = (props) => {
  return <MapView />;
};
const Welcome = (props) => {
  return (

    <div>Marketing website goes here</div>
);
};

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/whatsup">See what's up with who's down!</NavLink></li>
        <li><NavLink to="/create">Create portal (only to be used to that listserv middleman)</NavLink></li>
      </ul>
    </nav>
  );
};

const Test = (props) => {
  console.log('test getting called!');
  return <Create />;
};

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
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

/* let time = 0;

function updateClock() {
    time += 1;
    $('#main').html(`You have been on this page for ${String(time)} seconds.`);
    console.log('update called!');
}

window.setInterval(updateClock, 1000);
*/

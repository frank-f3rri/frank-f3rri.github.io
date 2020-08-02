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
import Counter from './counter';
import Controls from './controls';
import MapView from './mapview';

// import to be used in your App component


/* const App = () => <div className="test">All the REACT are belong to us!</div>; */


const About = (props) => {
  return <div> All there is to know about me </div>;
};
const Welcome = (props) => {
  return (
    <Counter>
      <div>Welcome</div>
    </Counter>
);
};

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">test id1</NavLink></li>
        <Controls>
          <li><NavLink to="/test/id2">test id2</NavLink></li>
        </Controls>
      </ul>
    </nav>
  );
};

const Test = (props) => {
  return <div> ID: {props.match.params.id} </div>;
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
            <Route path="/about" component={About} />
            <Route exact path="/test/:id" component={Test} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
      <MapView />
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

/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import '../style.scss';
import AOS from 'aos';
import MapView from './mapview';
import Create from './create';
import 'aos/dist/aos.css';
import Nav from '../containers/nav';
import Footer from '../containers/footer';
import Landing from './Landing';
import Legal from './Legal';
import About from './About';
import Download from './Download';

AOS.init(); // {mirror: true} changes the animations significantly but I think it goes a bit over the top

const FallBack = (props) => {
  // this is our 404 page, this is also a low priority
  return <div>URL Not Found</div>;
};

// TODO: Migrate Explore to new container when beginning to work on this
const Explore = (props) => {
  return <MapView />;
};

const App = (props) => {
  return (
    <div>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/map" component={Explore} />
            <Route path="/create" component={Create} />
            <Route path="/legal" component={Legal} />
            <Route path="/about" component={About} />
            <Route path="/link/*" component={Download} />
            <Route component={FallBack} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;

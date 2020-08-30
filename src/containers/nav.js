import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import '../style.scss';

class Nav extends Component {
  render() {
    return (
      <div className="navContainer">
        <nav>
          <ul className="navBar">
            <li><NavLink className="navItem" exact to="/"> Home </NavLink></li>
            <li><NavLink className="navItem" to="/whatsup"> Explore </NavLink></li>
            <li><NavLink className="navItem" to="/create"> Create Portal </NavLink></li>
            <li><NavLink className="navItem" to="/legal"> Legal </NavLink></li>
            <li><NavLink className="donateItem" to="https://www.buymeacoffee.com/whosdown"><span> Donate </span> </NavLink></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(Nav);

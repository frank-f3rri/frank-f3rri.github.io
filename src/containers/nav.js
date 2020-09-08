import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import '../style.scss';

class Nav extends Component {
  render() {
    return (
      <div className="container">
        <nav>
          <ul className="navBar">
            <li><NavLink className="navItem" exact to="/"> Home </NavLink></li>
            <li><NavLink className="navItem" to="/about"> About </NavLink></li>
            <li><a className="donateItem" href="https://www.buymeacoffee.com/whosdown"><span> Donate! </span> </a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(Nav);
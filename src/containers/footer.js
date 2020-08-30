import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import '../style.scss';

// TODO: add additional footer links as needed, add Logo to replace the "Home" link text
class Footer extends Component {
  render() {
    return (
      <div className="footerContainer">
        <nav>
          <ul className="footerBar">
            <li><NavLink className="footerItem" to="/legal"> Legal </NavLink></li>
            <li><NavLink className="footerItem" exact to="/"> Home </NavLink></li>
            <li><NavLink className="footerItem" to="/about"> About </NavLink></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(Footer);

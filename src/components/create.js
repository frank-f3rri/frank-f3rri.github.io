/* eslint-disable react/no-unused-state */
/* eslint-disable new-cap */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-dupe-keys */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unreachable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../actions';


class Create extends Component {
  constructor(props) {
    super(props);
    console.log('create getting called!');

    this.state = {
      mounted: false,
      center: {
        lat: 43.7044,
        lng: 72.2887,
      },
      zoom: 3,
      activeID: '',
    };
  }

  render() {
    return (
      <div>
        <div style={{ height: '1000px', width: '1000px' }}> make new event</div>
      </div>
    );
  }
}

export default connect(null, { createEvent })(Create);

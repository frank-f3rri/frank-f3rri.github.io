/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-dupe-keys */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unreachable */
import React, { Component } from 'react';
import { connect } from 'react-redux';


// eslint-disable-next-line react/prefer-stateless-function
class MapView extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return <div>hi</div>;
  }
}

export default connect(null, null)(MapView);

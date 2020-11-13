/* eslint-disable react/no-unused-state */
/* eslint-disable new-cap */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-dupe-keys */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Modal from 'react-bootstrap/Modal';

import { fetchEvents } from '../actions';
import { API_KEY } from '../../env';
import locationDot from '../img/map_dot.png';

// eslint-disable-next-line react/prefer-stateless-function
class MapView extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      center: {
        lat: 43.7044,
        lng: -72.2887,
      },
      zoom: 14,
      activeID: '',
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    if ('geolocation' in navigator) {
      console.log('Available');
    } else {
      console.log('Not Available');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
      this.setState({ center: { lat: position.coords.latitude, lng: position.coords.longitude } });
    });
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  componentDidMount = () => {
    this.props.fetchEvents();
    this.setState({ mounted: true });
  }

  distanceToMouse = ({ x, y }, { x: mouseX, y: mouseY }) => {
    return Math.sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY));
  }

  onMapChildHover = (_hoverKey, childProps) => {
    this.setState({ activeID: _hoverKey });
  }

  noMoreHover = (_hoverKey, childProps) => {
    this.setState({ activeID: '' });
  }


  render() {
    const locations = this.props.eventList.all.map((event) => {
      if (!event.virtual) {
        return (
          <div
            key={event.id}
            lat={event.latitude}
            lng={event.longitude}
          >
            <img
              src={locationDot}
              alt=""
              height="10px"
              width="10px"
              text={event.eventTitle}
              showMore={() => { this.showMore(event.id); }}
            />
            {event.id == this.state.activeID && (
              <div className="mapPinPopup">
                <div className="mapPinTitle">{event.eventTitle}</div>
                <div>{event.hostName}</div>
                <div>{event.skillLevel}</div>
              </div>
            )}
          </div>
        );
      } return (<div />);
    });

    const eventList = this.props.eventList.all.map((event) => {
      return (
        <div className="eventListItem" onClick={this.handleOpenModal} type="button">
          <div className="eventListTitle">{event.eventTitle}</div>
          <div>{event.hostName}</div>
        </div>
      );
    });


    return (
      <div className="explorePageContainer">
        <Modal
          show={this.state.showModal}
          onHide={this.handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title><h1>Are you down?</h1></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Download the app to:</h4>
            <ul>
              <li>Add events to your calendar</li>
              <li>RSVP</li>
              <li>Chat with other attendees</li>
            </ul>
            <p>.. and much more!</p>
          </Modal.Body>
          <Modal.Footer>
            <a className="findOutMoreButton" href="https://linktr.ee/Whosdown">
              I'm Down!
            </a>
          </Modal.Footer>
        </Modal>
        <div className="mapContainer">
          <div className="exploreMap">
            <GoogleMapReact
              bootstrapURLKeys={{ key: API_KEY }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
              hoverDistance={15}
              distanceToMouse={this.distanceToMouse}
              onChildMouseEnter={this.onMapChildHover}
              onChildMouseLeave={this.noMoreHover}
            >
              {locations}
            </GoogleMapReact>
          </div>
        </div>
        <div className="eventListContainer">
          {eventList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => (
  {
    eventList: reduxState.event,
  }
);

export default connect(mapStateToProps, { fetchEvents })(MapView);

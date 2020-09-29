/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unused-state */
/* eslint-disable new-cap */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-dupe-keys */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unreachable */
import React, { Component, Text, Image } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import { ToastContainer } from 'react-toastify';
import { createEvent } from '../actions';
import { API_KEY_GEOCODE } from '../../env';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      center: {
        lat: 43.7044,
        lng: -72.2887,
      },
      zoom: 15,
      activeID: '',
      pastebox: '',
      defaultState: null,
      category: 'nightlife',
      skillLevel: 'casual',
      showPasteSuccess: false,
      latitude: null,
      longitude: null,
      virtual: false,
      blitz: true,
      fake: true,
      maxCapacity: 10,
      // another monstrosity, basically sets the default date to now
      // & puts it in a format the stupid datetime-local html thing can recognize
      // end time is 2 hours from now, to change that change the 2 in this.add2hrs
      startTime: new Date(`${new Date(this.add5min(new Date())).toString().split('GMT')[0]} UTC`).toISOString().split('.')[0],
      endTime: new Date(`${new Date(this.add2hrs(new Date())).toString().split('GMT')[0]} UTC`).toISOString().split('.')[0],
      address: '',
    };

    // this.geoLocate = this.geoLocate.bind(this);
    this.handleVirtualToggle = this.handleVirtualToggle.bind(this);
    this.handleBlitzToggle = this.handleBlitzToggle.bind(this);

    Geocode.setApiKey(API_KEY_GEOCODE);
    Geocode.setLanguage('en');
  }

  add2hrs = (input, amt = 2) => {
    const dt = new Date(input);
    return new Date(dt.setHours(dt.getHours() + amt));
  }

  add5min = (input, amt = 5) => {
    const dt = new Date(input);
    return new Date(dt.setMinutes(dt.getMinutes() + amt));
  }

  handleSubmit = (event) => {
    // rather complicated block that sets showpastesuccess as true for exactly 2 seconds, then sets it as false again
    this.setState({ showPasteSuccess: true }, () => {
      this.parseBlitz();
      setTimeout(() => {
        this.setState({ showPasteSuccess: false });
      }, 2000);
    });
    event.preventDefault();
  }

  parseBlitz = () => {
    const parsed = this.state.pastebox.split(' ');
    this.setState({ title: parsed[0], description: parsed.slice(1).join(' ') });
    console.log(parsed);
  }

  handleChange = (event, kind) => {
    const newState = this.state;
    newState[kind] = event.target.value;
    this.setState(newState);
  }

  handleCreate = (event) => {
    const maxCapacityValue = (this.state.virtual === true) ? 999 : this.state.maxCapacity;

    const createdEvent = {
      eventTitle: this.state.title,
      description: this.state.description,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      category: this.state.category,
      skillLevel: this.state.skillLevel,
      startTime: new Date(this.state.startTime),
      endTime: new Date(this.state.endTime),
      virtual: this.state.virtual,
      blitz: this.state.blitz,
      fake: this.state.fake,
      maxCapacity: maxCapacityValue,
    };
    console.log('this is your submitted event:', createdEvent);
    console.log('this is our start time type', typeof (this.state.startTime));
    this.setState(this.state.defaultState);
    this.props.createEvent(createdEvent);
    event.preventDefault();

    // latitude: Number,
    // longitude: Number,
  }

  handleMapClick = (e) => {
    console.log('map was clicked!', e);
    this.setState({ latitude: e.lat, longitude: e.lng }, () => { console.log('state set!'); this.getAddress(); });
  }

  getAddress = () => {
    Geocode.fromLatLng(this.state.latitude, this.state.longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
        this.setState({ address });
      },
      (error) => {
        console.error(error);
      },
    );
  }

  handleVirtualToggle = (event) => {
    this.setState({
      virtual: !this.state.virtual,
    });
  }

  handleBlitzToggle = (event) => {
    this.setState({
      blitz: !this.state.blitz,
    });
  }

  handleActualEventToggle = (event) => {
    this.setState({
      fake: !this.state.fake,
    });
  }

  // geoLocate() {
  //
  // }

  renderPasteBox = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Paste blitz here: <br />
          <textarea value={this.state.pastebox} onChange={(event) => this.handleChange(event, 'pastebox')} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  renderLocationPicker = () => {
    return (
      <div>
        <div style={{ height: '500px', width: '500px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY_GEOCODE }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            onClick={this.handleMapClick}
          >
            {this.state.latitude && (
            <div lat={this.state.latitude} lng={this.state.longitude}>
              <img alt="" height="20px" width="20px" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" />
            </div>
            )}
          </GoogleMapReact>
        </div>
      </div>
    );
  }

  renderLocationInput = () => {
    if (this.state.virtual) {
      return (
        <div>
          Location:
          <br />
          Virtual!
        </div>
      );
    } else {
      return (
        <label>
          Location:
          <input type="text" size="40" value={this.state.address} onFocus={this.geoLocate} onChange={(event) => this.handleChange(event, 'address')} />
        </label>
      );
    }
  }

  renderMaxCapacityInput = () => {
    if (this.state.virtual) {
      return (
        <div> </div>
      );
    } else {
      return (
        <label>
          Max Capacity:
          <input type="text" size="20" value={this.state.maxCapacity} onChange={(event) => this.handleChange(event, 'maxCapacity')} />
        </label>
      );
    }
  }

  renderCreateEventForm = () => {
    return (
      <div className="createEventFormContainer">
        <form className="createEventForm" onSubmit={this.handleCreate}>
          <label>
            Event Title:
            <input type="text" size="40" value={this.state.title} onChange={(event) => this.handleChange(event, 'title')} />
          </label>
          <label>
            Event Description:
            <textarea id="eventDescription" wrap="soft" cols="40" type="text" value={this.state.description} onChange={(event) => this.handleChange(event, 'description')} />
          </label>
          <label htmlFor="cat">Choose a category:</label>
          <select id="category" name="category" onChange={(event) => this.handleChange(event, 'category')}>
            <option value="nightlife">Nightlife</option>
            <option value="culture">Culture</option>
            <option value="educational">Educational</option>
            <option value="food">Food</option>
            <option value="sport">Sport</option>
          </select>
          <br />
          <label htmlFor="skill">Choose a skill level:</label>
          <select id="skillLevel" name="skillLevel" onChange={(event) => this.handleChange(event, 'skillLevel')}>
            <option value="casual">Casual</option>
            <option value="amateur">Amateur</option>
            <option value="pro">Professional</option>
          </select>
          <br />
          <label>
            Start Time:
            <input type="datetime-local" value={this.state.startTime} onChange={(event) => this.handleChange(event, 'startTime')} />
          </label>
          <label>
            End Time:
            <input type="datetime-local" value={this.state.endTime} onChange={(event) => this.handleChange(event, 'endTime')} />
          </label>
          <div>Campus Blitz</div>
          <label className="switch">
            <div>
              <input type="checkbox" onClick={(event) => this.handleBlitzToggle(event)} defaultChecked />
              <span className="slider round" />
            </div>
          </label>
          <div>Actual Event</div>
          <label className="switch">
            <div>
              <input type="checkbox" onClick={(event) => this.handleActualEventToggle(event)} />
              <span className="slider round" />
            </div>
          </label>
          <div>Virtual Event</div>
          <label className="switch">
            <div>
              <input type="checkbox" onClick={(event) => this.handleVirtualToggle(event)} />
              <span className="slider round" />
            </div>
          </label>
          {this.renderLocationInput()}
          {this.renderMaxCapacityInput()}
          <input className="submitButton" type="submit" value="Submit" />
        </form>
        <div>
          {this.renderLocationPicker()}
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </div>
    );
  }

  render() {
    return (
      <div className="container createContainer">
        <div className="createTitleContainer">
          Create an event!
        </div>
        {this.renderCreateEventForm()}
      </div>
    );
  }
}

export default connect(null, { createEvent })(Create);

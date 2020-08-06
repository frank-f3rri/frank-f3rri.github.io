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
import { createEvent } from '../actions';
import { API_KEY_GEOCODE } from '../../env';


class Create extends Component {
  constructor(props) {
    super(props);
    console.log('create getting called!');

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
      showPasteSuccess: false,
      latitude: null,
      longitude: null,
      address: null,
      // another monstrosity, basically sets the default date to now
      // & puts it in a format the stupid datetime-local html thing can recognize
      // end time is 2 hours from now, to change that change the 2 in this.add2hrs
      startTime: new Date(`${new Date(this.add5min(new Date())).toString().split('GMT')[0]} UTC`).toISOString().split('.')[0],
      endTime: new Date(`${new Date(this.add2hrs(new Date())).toString().split('GMT')[0]} UTC`).toISOString().split('.')[0],
      address: 'Not yet set',

      // these are placeholders for the initial suggestions
      startTimeOptions: ['stime 1'],
      endTimeOptions: ['etime 1'],
      addressOptions: ['location1'],
      titleOptions: ['title1', 'title2'],
    };
  }

  componentDidMount = () => {
    // don't touch, this is handling address <--> latitude/longitude conversion
    this.setState({ defaultState: this.state });
    Geocode.setApiKey(API_KEY_GEOCODE);
    Geocode.setLanguage('en');
  }

  add2hrs = (input, amt = 2) => {
    // helper function; adds 2 hours to the input date
    const dt = new Date(input);
    return new Date(dt.setHours(dt.getHours() + amt));
  }

  add5min = (input, amt = 5) => {
    // helper function, adds 5 minutes to the input date
    const dt = new Date(input);
    return new Date(dt.setMinutes(dt.getMinutes() + amt));
  }

  handleSubmit = (event) => {
    // rather complicated block that sets showpastesuccess as true for exactly 2 seconds, then sets it as false again
    // practically speaking, showpastesuccess being true just means a little thing pops up and gives a success message
    this.setState({ showPasteSuccess: true }, () => {
      this.parseBlitz();
      setTimeout(() => {
        this.setState({ showPasteSuccess: false });
      }, 2000);
    });
    event.preventDefault();
  }

  parseBlitz = () => {
    // @abhi: here you need to setState both for the best option and for the second-4th best options
    // 2nd-4th best will become the suggestions

    const parsed = this.state.pastebox.split(' ');
    this.setState({ title: parsed[0], description: parsed.slice(1).join(' ') });
  }

  handleChange = (event, kind) => {
    // handles editing of fields
    const newState = this.state;
    newState[kind] = event.target.value;
    this.setState(newState);
  }

  handleCreate = (event) => {
    // handles submitting the event to WD server
    const createdEvent = {
      eventTitle: this.state.title,
      description: this.state.description,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      category: this.state.category,
      skillLevel: this.state.skillLevel,
      startTime: new Date(this.state.startTime),
      endTime: new Date(this.state.endTime),
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    // console.log('this is your submitted event:', createdEvent);
    // console.log('this is our start time type', typeof (this.state.startTime));
    this.setState(this.state.defaultState);
    this.props.createEvent(createdEvent);
    event.preventDefault(); // very important line here since I was lazy and used an html form
  }

  handleMapClick = (e) => {
    // gets the latitude / longitude of a point on the map, sends to getAddress to extract location
    console.log('map was clicked!', e);
    this.setState({ latitude: e.lat, longitude: e.lng }, () => { console.log('state set!'); this.getAddress(); });
  }

  getAddress = () => {
    // extracts human readable address from latitude & longitude using Google maps API
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


  handleSuggestionPick = (optionList, field, option) => {
    // @abhi this is kind of incomplete as a lot of it depend on what you're extracting
    // For locations, don't forget to use geocoding to get the lat/long from address as lat/lng are what's important for
    // our createEvent request to the WD server
    // for times, the datetime-local html thing is a pain in the ass so you'll need to wrangle it a bit to have it display as a string
    // but be stored in state as a datetime object (which is what WD server needs)

    // optionList: the list of suggestions
    // option: the option in optionlist that they picked
    // field: the key in state corresponding to the selected item

    // this block puts the previous selection in the optionlist, and removes the item picked from the option list
    const newState = this.state;
    const prevSel = this.state[field];
    newState[field] = option;
    const newOptionList = optionList.filter((val) => val !== option);
    newOptionList.push(prevSel);

    // these lines then plug the new list into the new state
    const optionKey = `${field}Options`;
    newState[optionKey] = newOptionList;

    // and then we set the state as this new state
    this.setState(newState, console.log('newState=', this.state));
  }

  // ============ @BELLA EVERYTHING YOU'LL BE DEALING WITH IS UNDER THIS LINE ==============
  // this entire file isn't going to be seen by users though, so don't put too much effort into making a design
  // I just want things centered & arranged in flexboxes, the ugly html buttons are honestly fine
  // this page should be your lowest priority as far as the website goes

  generateSuggestions = (optionList, field) => {
    // this code generates a button for every suggestion
    // when a button is clicked handleSuggestionPick takes that suggestion, changing state
    // Just make sure the onclick method is preserved
    return optionList.map((i) => {
      return <div> <button type="button" onClick={() => { this.handleSuggestionPick(optionList, field, i); }}> {i}</button></div>;
    });
  }

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
        <div style={{ height: '700px', width: '700px' }}>
          {this.state.address && (<div>Location: {this.state.address}</div>)}
          <div>{this.generateSuggestions(this.state.addressOptions, 'address')}</div>
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


  renderCreateEventForm = () => {
    return (
      <form onSubmit={this.handleCreate}>
        <label>
          Event Title:
          <input type="text" value={this.state.title} onChange={(event) => this.handleChange(event, 'title')} />
        </label>
        <div>{this.generateSuggestions(this.state.titleOptions, 'title')}</div>
        <br />
        <label>
          Event Description:
          <input type="text" value={this.state.description} onChange={(event) => this.handleChange(event, 'description')} />
        </label>
        <br />
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
        <select id="category" name="category" onChange={(event) => this.handleChange(event, 'skillLevel')}>
          <option value="casual">Casual</option>
          <option value="amateur">Amateur</option>
          <option value="pro">Professional</option>
        </select>

        <br />
        <label>
          Start Time:
          <input type="datetime-local" value={this.state.startTime} onChange={(event) => this.handleChange(event, 'startTime')} />
        </label>
        <div>{this.generateSuggestions(this.state.startTimeOptions, 'title')}</div>

        <label>
          End Time:
          <input type="datetime-local" value={this.state.endTime} onChange={(event) => this.handleChange(event, 'endTime')} />
        </label>
        <div>{this.generateSuggestions(this.state.endTimeOptions, 'title')}</div>

        {this.renderLocationPicker()}
        <input type="submit" value="Submit" />
      </form>
    );
  }

  render() {
    return (
      <div>
        {this.renderPasteBox()}
        {this.state.showPasteSuccess && (<div>Autoparsing complete!</div>)}
        {this.renderCreateEventForm()}
      </div>
    );
  }
}

export default connect(null, { createEvent })(Create);

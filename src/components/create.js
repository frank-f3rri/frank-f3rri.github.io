/* eslint-disable jsx-a11y/label-has-associated-control */
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
      pastebox: '',
      defaultState: null,
      category: 'nightlife',
    };

    this.setState({ defaultState: this.state });
  }

  handleSubmit = (event) => {
    // eslint-disable-next-line no-alert
    alert(`An essay was submitted: ${this.state.pastebox}`);
    event.preventDefault();
  }

  handleChange = (event, kind) => {
    const newState = this.state;
    newState[kind] = event.target.value;
    this.setState(newState);
  }

  handleCreate = (event) => {
    const createdEvent = {
      eventTitle: this.state.title,
      description: this.state.description,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      category: this.state.category,
      skillLevel: this.state.skillLevel,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
    };
    console.log('this is your submitted event:', createdEvent);
    this.setState(this.state.defaultState);
    this.props.createEvent(createdEvent);
    event.preventDefault();

    // latitude: Number,
    // longitude: Number,
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
        <div>
          hi
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
        <label>
          Skill Level:
          <input type="text" value={this.state.skillLevel} onChange={(event) => this.handleChange(event, 'skillLevel')} />
        </label>
        <br />
        <label>
          Start Time:
          <input type="datetime-local" value={this.state.startTime} onChange={(event) => this.handleChange(event, 'startTime')} />
        </label>
        <label>
          End Time:
          <input type="datetime-local" value={this.state.endTime} onChange={(event) => this.handleChange(event, 'endTime')} />
        </label>
        {this.renderLocationPicker()}
        <input type="submit" value="Submit" />
      </form>
    );
  }

  render() {
    return (
      <div>
        {this.renderPasteBox()}
        {this.renderCreateEventForm()}
      </div>
    );
  }
}

export default connect(null, { createEvent })(Create);

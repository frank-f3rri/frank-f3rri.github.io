// keys for actiontypes

import axios from 'axios';

const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';


export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  fetchEvents: 'fetchEvents',
  createEvent: 'createEvent',
};

export function fetchEvents(debug = false) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/fetchEvents`)
      .then((response) => {
        if (debug) { console.log(response); }
        dispatch({ type: ActionTypes.fetchEvents, payload: response });
      })
      .catch((error) => {
        console.log('error!', error);
      });
  };
}

export function createEvent(event, debug = false) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/newEvent`)
      .then((response) => {
        if (debug) { console.log(response); }
        dispatch({ type: ActionTypes.fetchEvents, payload: response });
      })
      .catch((error) => {
        console.log('error!', error);
      });
  };
}

export function increment() {
  return {
    type: ActionTypes.INCREMENT,
    payload: null,
  };
}

export function decrement() {
  return {
    type: ActionTypes.DECREMENT,
    payload: null,
  };
}

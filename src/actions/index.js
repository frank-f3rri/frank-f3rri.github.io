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

export function createEvent(event, debug = true) {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZjIyNDRmNjY0YTQ5YzAwMzg0ZTI2MTMiLCJpYXQiOjE1OTYwODEzOTkxNDl9.6xSO69MmqKFM5KEDl_SP9YdEHm01X4PlIN1LLolcSxw';
  return (dispatch) => {
    axios.post(`${ROOT_URL}/newEvent`, event, { headers: { authorization: token } })
      .then((response) => {
        if (debug) { console.log('this is the response we got from the server', response); }
        dispatch({ type: ActionTypes.fetchEvents, payload: response });
      })
      .catch((error) => {
        console.log('error!', error, error.response);
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

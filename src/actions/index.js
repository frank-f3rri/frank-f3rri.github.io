// keys for actiontypes

import axios from 'axios';
import { toast } from 'react-toastify';

const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';


export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  fetchEvents: 'fetchEvents',
  createEvent: 'createEvent',
  collectUserEmail: 'collectUserEmail',
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
  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZjIyNDRmNjY0YTQ5YzAwMzg0ZTI2MTMiLCJpYXQiOjE1OTYwODEzOTkxNDl9.6xSO69MmqKFM5KEDl_SP9YdEHm01X4PlIN1LLolcSxw';
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZjYwM2U5NzZjMzZmODAwMzgzNDYxMWQiLCJpYXQiOjE2MDAxNDM2MTYwNTV9.jwDSTN3NM9t8p6hl8DGDvAF23mFX6yKK01qHyvJr9YQ';
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

export function collectUserEmail(email) {
  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZjIyNDRmNjY0YTQ5YzAwMzg0ZTI2MTMiLCJpYXQiOjE1OTYwODEzOTkxNDl9.6xSO69MmqKFM5KEDl_SP9YdEHm01X4PlIN1LLolcSxw';
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZjYwM2U5NzZjMzZmODAwMzgzNDYxMWQiLCJpYXQiOjE2MDAxNDM2MTYwNTV9.jwDSTN3NM9t8p6hl8DGDvAF23mFX6yKK01qHyvJr9YQ';
  return (dispatch) => {
    axios.post(`${ROOT_URL}/collectAndroidUserEmail`, email, { headers: { authorization: token } })
      .then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.collectUserEmail, payload: response.data.message });
        toast(response.data.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log('error', error, error.response);
        dispatch({ type: ActionTypes.collectUserEmail, payload: error.response.data.message });
        toast(error.response.data.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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

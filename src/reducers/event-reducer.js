import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  // filtered: new Map(),
  error: null,
  attendingUsers: [],
};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.fetchEvents:
      console.log('in the reducer, putting this in props:', action.payload.data);
      return {
        ...state, error: action.error, all: action.payload.data,
      };
    default:
      return state;
  }
};

export default EventReducer;

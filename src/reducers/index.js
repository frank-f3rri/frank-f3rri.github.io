// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import EventReducer from './event-reducer';
import LandingPageReducer from './landing-page-reducer';

const rootReducer = combineReducers({
  event: EventReducer,
  landingPage: LandingPageReducer,
});

export default rootReducer;

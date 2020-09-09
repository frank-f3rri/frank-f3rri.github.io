import { ActionTypes } from '../actions';

const LandingPageReducer = (state = {
  emailResponse: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.collectUserEmail:
      return {
        emailResponse: action.payload,
      };

    default:
      return state;
  }
};

export default LandingPageReducer;

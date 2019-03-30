import * as T from '../actions/types';

const initialState = {
  offerAccepted: true,
  policyAccepted: true,
  bannersSeen: false,
};

export default (state = initialState, action) => {
  let {type, payload} = action;
  // console.log('APP action type => ', type);

  switch (type) {
  case T.READ_STATE:
    console.log('APP/READ_STATE', state);
    return state;

  case T.RESET_STATE:
    console.log('APP/RESET_STATE', state);
    return initialState;

  case T.OFFER_TOGGLE:
    console.log('APP/OFFER_TOGGLE', state);
    return {
      ...state,
      offerAccepted: !state.offerAccepted,
    };

  case T.POLICY_TOGGLE:
    console.log('APP/POLICY_TOGGLE', state);
    return {
      ...state,
      policyAccepted: !state.policyAccepted,
    };

  case T.BANNERS_SEEN:
    console.log('APP/BANNERS_SEEN', payload);
    return {
      ...state,
      bannersSeen: true,
    };


  default:
    return state;
  }
};

import * as T from '../actions/types';

const initialState = {
  offerAccepted: false,
  bannersLoaded: null,
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
    return {};

  case T.OFFER_TOGGLE:
    console.log('APP/OFFER_TOGGLE', state);
    return {
      ...state,
      offerAccepted: !state.offerAccepted,
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

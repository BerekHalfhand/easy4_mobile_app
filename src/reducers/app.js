import * as T from '../actions/types';

const initialState = {
  offerAccepted: true,
  policyAccepted: true,
  bannersSeen: false,
  doNotPersist: false,
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
    console.log(`APP/${type}`, payload);
    return {
      ...state,
      offerAccepted: !state.offerAccepted,
    };

  case T.POLICY_TOGGLE:
    console.log(`APP/${type}`, payload);
    return {
      ...state,
      policyAccepted: !state.policyAccepted,
    };

  case T.DO_NOT_PERSIST_TOGGLE:
    console.log(`APP/${type}`, payload);
    return {
      ...state,
      doNotPersist: !state.doNotPersist,
    };

  case T.BANNERS_SEEN:
    console.log(`APP/${type}`, payload);
    return {
      ...state,
      bannersSeen: true,
    };

  case T.BIOMETRY_SET_TYPES:
    console.log(`APP/${type}`, payload);
    return {
      ...state,
      bioTouch: payload.supported.indexOf(1) > -1, // true if supports touchId
      bioFace: payload.supported.indexOf(2) > -1,  // true if supports faceId
    };

  case T.BIOMETRY_SET_SAVED:
    console.log(`APP/${type}`, payload);
    return {
      ...state,
      bioSaved: payload.saved,
    };

  case T.LOGOUT_SUCCESS:
  case T.LOGOUT_FAILURE:
    console.log(`APP/${type}`, payload);
    return {
      ...state,
      doNotPersist: false,
    };

  default:
    return state;
  }
};

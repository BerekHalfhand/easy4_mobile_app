import * as T from '../actions/types';

export default (state = {}, action) => {
  let {type, payload} = action;
  // console.log('AUTH action type => ', type);

  switch (type) {
  case T.READ_STATE:
    console.log('AUTH/READ_STATE', state);
    return state;

  case T.RESET_STATE:
  case T.LOGOUT_SUCCESS:
  case T.LOGOUT_FAILURE:
  case T.ESIA_LINK_FAILURE:
    console.log(`AUTH/${type}`, state);
    return {};

  case T.CHECK_TOKEN_FAILURE:
    console.log('AUTH/CHECK_TOKEN_FAILURE');
    return {
      ...state,
      accessToken: null,
    };

  case T.UPDATE_TOKEN_SUCCESS:
    console.log('AUTH/UPDATE_TOKEN_SUCCESS', payload);
    return {
      ...state,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };

  case T.UPDATE_TOKEN_FAILURE:
  case T.LOGIN_FAILURE:
    console.log('AUTH/UPDATE_TOKEN_FAILURE');
    return {
      ...state,
      accessToken: null,
      refreshToken: null,
    };

  case T.SIGNUP_SUCCESS:
  case T.SIGNUP_FAILURE:
  case T.CHECK_TOKEN_SUCCESS:
    console.log(`AUTH/${type}`, payload);
    return state;

  case T.LOGIN_SUCCESS:
  case T.ESIA_AUTH_SUCCESS:
    console.log(`AUTH/${type}`, payload);
    return {
      ...state,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };

  case T.DO_NOT_PERSIST_TOGGLE:
    console.log(`AUTH/${type}`, payload);
    return {
      ...state,
      doNotPersist: !state.doNotPersist,
    };

  case T.ESIA_LINK_SUCCESS:
    console.log(`AUTH/${type}`, payload);
    return {
      ...state,
      esiaLink: payload.url,
    };

  default:
    return state;
  }
};

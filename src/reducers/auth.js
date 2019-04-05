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
    console.log(`AUTH/${type}`, state);
    return {};

  case T.CHECK_TOKEN_SUCCESS:
    console.log('AUTH/CHECK_TOKEN_SUCCESS', payload);
    return {...state, authorized: true};

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
      authorized: true,
    };

  case T.UPDATE_TOKEN_FAILURE:
    console.log('AUTH/UPDATE_TOKEN_FAILURE');
    return {
      ...state,
      accessToken: null,
      refreshToken: null,
      authorized: false,
    };

  case T.SIGNUP_SUCCESS:
  case T.SIGNUP_FAILURE:
    console.log(`AUTH/${type}`, payload);
    return state;

  case T.LOGIN_SUCCESS:
    console.log('AUTH/LOGIN_SUCCESS', payload);
    return {
      ...state,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      authorized: true,
    };

  case T.LOGIN_FAILURE:
    console.log('AUTH/LOGIN_FAILURE');
    return {
      ...state,
      authorized: false,
    };

  case T.DO_NOT_PERSIST_TOGGLE:
    return {
      ...state,
      doNotPersist: !state.doNotPersist,
    };

  default:
    return state;
  }
};

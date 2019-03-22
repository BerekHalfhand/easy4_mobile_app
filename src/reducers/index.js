import * as T from '../actions/types';

export default (state = {}, action) => {
  console.log('action type => ', action.type);
  let {payload} = action;

  switch (action.type) {
  case T.API_START:
    return {
      ...state,
      isLoadingData: true
    };

  case T.API_ERROR:
    console.log('action/API_ERROR', payload);
    return {
      ...state,
      errors: payload.errors
    };

  case T.API_END:
    return {
      ...state,
      isLoadingData: false
    };

  case T.READ_STATE:
    console.log('action/READ_STATE', state);
    return state;

  case T.RESET_STATE:
    console.log('action/RESET_STATE', state);
    return {};

  case T.CHECK_TOKEN_SUCCESS:
    console.log('action/CHECK_TOKEN_SUCCESS', payload);
    return {...state, authorized: true};

  case T.CHECK_TOKEN_FAILURE:
    console.log('action/CHECK_TOKEN_FAILURE');
    return {...state, accessToken: null};

  case T.UPDATE_TOKEN_SUCCESS:
    console.log('action/UPDATE_TOKEN_SUCCESS', payload);
    return {
      ...state,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      authorized: true,
    };

  case T.UPDATE_TOKEN_FAILURE:
    console.log('action/UPDATE_TOKEN_FAILURE');
    return {
      ...state,
      accessToken: null,
      refreshToken: null,
    };

  case T.USER_INFO_SUCCESS:
    console.log('action/USER_INFO_SUCCESS', payload);
    return {
      ...state,
      user: {
        firstName: payload.firstName,
        secondName: payload.secondName,
        lastName: payload.lastName,
        phone: payload.phone,
        email: payload.email,
      }
    };

  case T.USER_INFO_FAILURE:
    console.log('action/USER_INFO_FAILURE');
    return state;

  case T.LOGIN_SUCCESS:
    console.log('action/LOGIN_SUCCESS', payload);
    return {
      ...state,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      authorized: true,
    };

  case T.LOGIN_FAILURE:
    console.log('action/LOGIN_FAILURE');
    return {
      ...state,
      user: null,
    };

  case T.LOGOUT:
    console.log('action/LOGOUT');
    return {};

  default:
    return state;
  }
};
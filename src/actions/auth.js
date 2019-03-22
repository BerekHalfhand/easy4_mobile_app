import * as T from './types';
import {apiAction} from './api';
import NavigationService from 'app/src/services/NavigationService';

// LOGOUT

export const logoutAction = () => ({ type: 'LOGOUT', payload: {} });

export function logout() {
  return function(dispatch) {
    dispatch(logoutAction());
    NavigationService.navigate('Home');
  };
}

// LOGIN

export function login(login, password) {
  console.log('login', login, password);

  return apiAction({
    url: '/auth/login',
    method: 'POST',
    data: {
      login,
      password
    },
    onSuccess: loginSuccess,
    successTransition: 'Main',
    onFailure: loginFailure,
    label: T.LOGIN,
    errorLabel: 'loginError'
  });
}

const loginSuccess = data => {
  return {
    type: T.LOGIN_SUCCESS,
    payload: data
  };
};

const loginFailure = data => {
  return {
    type: T.LOGIN_FAILURE,
    payload: data
  };
};

// SIGNUP

export function signup(email, password) {
  console.log('signup', email, password);

  return apiAction({
    url: '/users',
    method: 'POST',
    data: {
      email,
      password
    },
    onSuccess: (data) => signupSuccess(data, email, password),
    onFailure: signupFailure,
    label: T.SIGNUP,
    errorLabel: 'signupError'
  });
}

const signupSuccess = (data, email, password) => {
  return function(dispatch) {
    console.log('signupSuccess', data, email, password);
    dispatch(login(email, password));
    return {
      type: T.SIGNUP_SUCCESS,
      payload: data
    };
  };
};

const signupFailure = data => {
  return {
    type: T.SIGNUP_FAILURE,
    payload: data
  };
};

// CHECK TOKEN

export function checkToken(accessToken, refreshToken) {
  // console.log('checkToken', token);
  return apiAction({
    url: `/auth/tokens/check/${accessToken}`,
    accessToken: accessToken,
    onSuccess: checkTokenSuccess,
    // onSuccess: () => updateToken(refreshToken),
    onFailure: () => updateToken(refreshToken),
    // onFailure: () => checkTokenFailure(refreshToken),
    label: T.CHECK_TOKEN
  });
}

const checkTokenSuccess = data => {
  return {
    type: T.CHECK_TOKEN_SUCCESS,
    payload: data
  };
};

const checkTokenFailure = refreshToken => {
  // updateToken(refreshToken);
  return {
    type: T.CHECK_TOKEN_FAILURE,
    payload: refreshToken
  };
};

// TODO: add side effect here to reset accessToken if a check failed

// function checkTokenFailure(refreshToken) {
//   updateToken(refreshToken);
//   return function(dispatch) {
//     dispatch({
//       type: T.CHECK_TOKEN_FAILURE,
//       payload: refreshToken
//     });
//   };
// }

// UPDATE TOKEN

function updateToken(token) {
  console.log('updateToken', token);
  return apiAction({
    url: '/auth/tokens/refresh',
    method: 'POST',
    data: {token},
    accessToken: token,
    onSuccess: updateTokenSuccess,
    onFailure: updateTokenFailure,
    label: T.UPDATE_TOKEN
  });
}

const updateTokenSuccess = data => {
  return {
    type: T.UPDATE_TOKEN_SUCCESS,
    payload: data
  };
};

const updateTokenFailure = data => {
  return {
    type: T.UPDATE_TOKEN_FAILURE,
    payload: data
  };
};

import * as T from './types';
import {apiAction, apiErrorDismiss} from './api';
import NavigationService from 'app/src/services/NavigationService';
import { Alert } from 'react-native';

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
  // console.log('login', login, password);

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
    errorLabel: 'loginError',
    busyScreen: 'login',
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
  // console.log('signup', email, password);

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
    errorLabel: 'signupError',
    busyScreen: 'signup',
  });
}

const signupSuccess = (data, email, password) => {
  return function(dispatch) {
    // console.log('signupSuccess', data, email, password);
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
    onFailure: () => checkTokenFailure(refreshToken),
    label: T.CHECK_TOKEN
  });
}

const checkTokenSuccess = data => {
  return {
    type: T.CHECK_TOKEN_SUCCESS,
    payload: data
  };
};

const checkTokenFailure = refreshToken => dispatch => {
  dispatch({
    type: T.CHECK_TOKEN_FAILURE,
    payload: refreshToken
  });

  dispatch(updateToken(refreshToken));
};

// UPDATE TOKEN

function updateToken(token) {
  // console.log('updateToken', token);
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

export function restorePassword(email) {
  // console.log('restorePassword', restorePassword);
  return apiAction({
    url: `/emails/${email}/restore/password`,
    onSuccess: restorePasswordSuccess,
    onFailure: restorePasswordFailure,
    errorLabel: 'restorePasswordError',
    label: T.RESTORE_PASSWORD,
    busyScreen: 'recovery',
  });
}

const restorePasswordSuccess = data => dispatch => {
  // console.log('restorePasswordSuccess', data);

  const onDismiss = () => {
    dispatch(apiErrorDismiss('restorePasswordError'));
    NavigationService.navigate('Login');
  };

  Alert.alert(
    'Recovery success',
    'На вашу почту отправлено письмо с описанием следующего шага',
    [{text: 'OK', onPress: onDismiss}],
    { onDismiss: onDismiss }
  );

  return {
    type: T.RESTORE_PASSWORD_SUCCESS,
    payload: data
  };
};

const restorePasswordFailure = data => {
  return {
    type: T.RESTORE_PASSWORD_FAILURE,
    payload: data
  };
};

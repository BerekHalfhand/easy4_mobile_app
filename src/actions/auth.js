import * as T from './types';
import {apiAction, apiErrorDismiss} from './api';
import {userInfo, fetchMsisdns} from './user';
import NavigationService from 'app/src/services/NavigationService';
import { Alert } from 'react-native';

const defaultError = 'Что-то пошло не так! Мы уже работаем над этим';

// LOGOUT

export function logout(accessToken) {
  return apiAction({
    url: `/auth/logout/${accessToken}`,
    onSuccess: logoutSuccess,
    successTransition: 'Home',
    onFailure: logoutFailure,
    label: T.LOGOUT,
    errorLabel: 'logoutError',
  });
}

const logoutSuccess = data => {
  return {
    type: T.LOGOUT_SUCCESS,
    payload: data
  };
};

const logoutFailure = data => {
  return {
    type: T.LOGOUT_FAILURE,
    payload: data
  };
};

// LOGIN

export function login(login, password) {
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

const loginSuccess = data => dispatch => {
  dispatch({
    type: T.LOGIN_SUCCESS,
    payload: data
  });

  if (data && data.accessToken) {
    dispatch(userInfo(data.accessToken));
    dispatch(fetchMsisdns(data.accessToken));
  }
};

const loginFailure = data => dispatch => {
  const onDismiss = () => {
    dispatch(apiErrorDismiss('loginError'));
  };

  Alert.alert(
    '',
    'Неправильная комбинация логин-пароль',
    [{text: 'OK', onPress: onDismiss}],
    { onDismiss: onDismiss }
  );

  dispatch({
    type: T.LOGIN_FAILURE,
    payload: data
  });
};

// SIGNUP

export function signup(email, password) {
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
  return apiAction({
    url: `/auth/tokens/check/${accessToken}`,
    accessToken: accessToken,
    onSuccess: checkTokenSuccess,
    onFailure: () => checkTokenFailure(refreshToken),
    label: T.CHECK_TOKEN,
    errorLabel: 'checkTokenError',
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
  return apiAction({
    url: '/auth/tokens/refresh',
    method: 'POST',
    data: {token},
    accessToken: token,
    onSuccess: updateTokenSuccess,
    onFailure: updateTokenFailure,
    label: T.UPDATE_TOKEN,
    errorLabel: 'updateTokenError',
  });
}

const updateTokenSuccess = data => dispatch => {
  dispatch({
    type: T.UPDATE_TOKEN_SUCCESS,
    payload: data
  });

  dispatch(apiErrorDismiss('checkTokenError'));
};

const updateTokenFailure = data => {
  return {
    type: T.UPDATE_TOKEN_FAILURE,
    payload: data
  };
};

export function restorePassword(email) {
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

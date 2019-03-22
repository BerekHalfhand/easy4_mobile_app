import * as T from './types';
import NavigationService from 'app/src/services/NavigationService';

export const logoutAction = () => ({ type: 'LOGOUT', payload: {} });

export function logout() {
  return function(dispatch) {
    dispatch(logoutAction());
    NavigationService.navigate('Home');
  };
}

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

export function userInfo(accessToken) {
  console.log('userInfo', accessToken);
  return apiAction({
    url: '/user/info',
    accessToken: accessToken,
    onSuccess: userInfoSuccess,
    // onSuccess: () => updateToken(refreshToken),
    onFailure: userInfoFailure,
    // onFailure: () => checkTokenFailure(refreshToken),
    label: T.USER_INFO
  });
}

const userInfoSuccess = data => {
  return {
    type: T.USER_INFO_SUCCESS,
    payload: data
  };
};

const userInfoFailure = data => {
  // updateToken(refreshToken);
  return {
    type: T.USER_INFO_FAILURE,
    payload: data
  };
};

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
    // failureTransition: 'Home',
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

function apiAction({
  url = '',
  method = 'GET',
  data = null,
  accessToken = null,
  onSuccess = () => {},
  successTransition = null,
  onFailure = () => {},
  failureTransition = null,
  label = '',
  headersOverride = null,
  errorLabel = 'error'
}) {
  return {
    type: T.API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      successTransition,
      onFailure,
      failureTransition,
      label,
      headersOverride,
      errorLabel,
    }
  };
}

import { API, API_START, API_END, ACCESS_DENIED, API_ERROR } from './types';
import { store } from 'app/src/reducers';

export const apiAction = ({
  url = '',
  baseUrlOverride = null,
  method = 'GET',
  data = null,
  onSuccess = () => {},
  successTransition = null,
  onFailure = () => {},
  failureTransition = null,
  label = '',
  headersOverride = null,
  errorLabel = null,
  busyScreen = null,
}) => {
  const {auth} = store.getState();
  const {accessToken} = auth;
  return {
    type: API,
    payload: {
      url,
      baseUrlOverride,
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
      busyScreen,
    }
  };
};

export const apiStart = (label, busyScreen) => ({
  type: API_START,
  payload: {
    label,
    busyScreen
  }
});

export const apiEnd = (label, busyScreen) => ({
  type: API_END,
  payload: {
    label,
    busyScreen
  }
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = (errorLabel, error) => ({
  type: API_ERROR,
  payload: {
    errors: {
      [errorLabel]: error.toString(),
    }
  }
});

export const apiErrorDismiss = (errorLabel) => {
  return {
    type: 'ERROR_DISMISS',
    payload: {errorLabel}
  };
};

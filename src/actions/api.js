import { API, API_START, API_END, ACCESS_DENIED, API_ERROR } from './types';

export const apiAction = ({
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
  errorLabel = 'error',
  busyScreen = null,
}) => {
  return {
    type: API,
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
// TODO: erase that error on success

import { API_START, API_END, ACCESS_DENIED, API_ERROR } from './types';

export const apiStart = label => ({
  type: API_START,
  payload: label
});

export const apiEnd = label => ({
  type: API_END,
  payload: label
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

export * from './auth';
export * from './user';

export const readState = () => {
  return {
    type: 'READ_STATE',
    payload: {}
  };
};

export const dismissError = (errorLabel) => {
  return {
    type: 'ERROR_DISMISS',
    payload: {errorLabel}
  };
};

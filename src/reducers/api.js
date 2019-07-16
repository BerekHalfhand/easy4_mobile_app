import * as T from '../actions/types';

export default (state = {}, action) => {
  let {type, payload} = action;
  // console.log('API action type => ', type);

  switch (type) {
  case T.READ_STATE:
    console.log('API/READ_STATE', state);
    return state;

  case T.RESET_STATE:
    console.log('API/RESET_STATE', state);
    return {};

  case T.API_START:
    console.log('API/API_START', payload);

    return {
      ...state,
      isLoadingData: true,
      ...(payload.busyScreen && {
        busy: {
          ...state.busy,
          [payload.busyScreen]: true
        }
      })
    };

  case T.API_ERROR:
    console.log('API/API_ERROR', payload);
    return {
      ...state,
      errors: payload.errors
    };

  case T.API_END:
    console.log('API/API_END', payload);

    return {
      ...state,
      isLoadingData: false,
      ...(payload.busyScreen && {
        busy: {
          ...state.busy,
          [payload.busyScreen]: false
        }
      })
    };

  case T.ERROR_DISMISS:
    console.log('API/ERROR_DISMISS', payload);
    return {
      ...state,
      ...(payload.errorLabel && {
        errors: {
          ...state.errors,
          [payload.errorLabel]: null
        }
      }),
      ...(!payload.errorLabel && {
        errors: {}
      })
    };

  default:
    return state;
  }
};

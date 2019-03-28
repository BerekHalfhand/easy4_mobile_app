import * as T from '../actions/types';

export default (state = {}, action) => {
  let {type, payload} = action;
  // console.log('USER action type => ', type);

  switch (type) {
  case T.READ_STATE:
    console.log('USER/READ_STATE', state);
    return state;

  case T.RESET_STATE:
    console.log('USER/RESET_STATE', state);
    return {};

  case T.USER_INFO_FAILURE:
  case T.LOGIN_SUCCESS:
  case T.LOGIN_FAILURE:
  case T.LOGOUT_SUCCESS:
  case T.LOGOUT_FAILURE:
    console.log(`USER/${type}`, payload);
    return {};

  case T.USER_INFO_SUCCESS:
    console.log('USER/USER_INFO_SUCCESS', payload);
    return {
      ...state,
      firstName: payload.firstName,
      secondName: payload.secondName,
      lastName: payload.lastName,
      ...(payload.firstName && {fullName: `${payload.firstName} ${payload.lastName}`}),
      phone: payload.phone,
      email: payload.email,
    };

  case T.SELECT_PHONE:
    console.log('USER/SELECT_PHONE', payload);
    return {
      ...state,
      selectedPhone: payload.phone,
    };

  case T.MSISDNS_FETCH_SUCCESS:
    console.log('USER/MSISDNS_FETCH_SUCCESS', payload);
    return {
      ...state,
      msisdns: payload.items.map(v => v.msisdn),
    };

  case T.MSISDNS_FETCH_FAILURE:
    console.log('USER/MSISDNS_FETCH_FAILURE', payload);
    return {
      ...state,
      msisdns: [],
    };

  case T.BALANCE_FETCH_SUCCESS:
    console.log('USER/BALANCE_FETCH_SUCCESS', payload);
    return {
      ...state,
      balance: payload.balance,
    };

  case T.BALANCE_FETCH_FAILURE:
    console.log('USER/BALANCE_FETCH_FAILURE');
    return {
      ...state,
      balance: null,
    };

  default:
    return state;
  }
};

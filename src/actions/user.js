import * as T from './types';
import {apiAction, apiError, apiErrorDismiss} from './api';
import { store } from 'app/src/reducers';

// USER INFO

export function userInfo(accessToken) {
  return apiAction({
    url: '/user/info',
    accessToken: accessToken,
    onSuccess: userInfoSuccess,
    onFailure: userInfoFailure,
    failureTransition: 'Login',
    errorLabel: 'userInfoError',
    label: T.USER_INFO
  });
}

const userInfoSuccess = data => {
  return {
    type: T.USER_INFO_SUCCESS,
    payload: data
  };
};

const userInfoFailure = data => dispatch => {
  dispatch({
    type: T.USER_INFO_FAILURE,
    payload: data
  });

  dispatch(apiErrorDismiss('userInfoError'));
  dispatch(apiError('loginError', 'Сессия истекла или была прервана, пожалуйста войдите заново'));
};

// PHONES

export const selectPhone = phone => {
  return {
    type: T.SELECT_PHONE,
    payload: {phone}
  };
};

export function fetchMsisdns(accessToken) {
  return apiAction({
    url: '/external/msisdns',
    accessToken: accessToken,
    onSuccess: (data) => fetchMsisdnsSuccess(data, accessToken),
    onFailure: fetchMsisdnsFailure,
    failureTransition: 'Login',
    errorLabel: 'fetchMsisdnsError',
    label: T.MSISDNS_FETCH
  });
}

const fetchMsisdnsSuccess = (data, accessToken) => dispatch => {
  // data = {
  //   items : [
  //     {msisdn: '79198774513'},
  //     {msisdn: '79135446211'},
  //   ]
  // };
  dispatch({
    type: T.MSISDNS_FETCH_SUCCESS,
    payload: data
  });

  const {user} = store.getState();

  if (data && data.items && data.items.length && data.items[0].msisdn) {
    if (!user.selectedPhone) {
      dispatch(selectPhone(data.items[0].msisdn));
      dispatch(fetchBalance(data.items[0].msisdn, accessToken));
    } else dispatch(fetchBalance(user.selectedPhone, accessToken));
  }
};

const fetchMsisdnsFailure = data => dispatch => {
  dispatch({
    type: T.MSISDNS_FETCH_FAILURE,
    payload: data
  });

  dispatch(apiErrorDismiss('fetchMsisdnsError'));
  dispatch(apiError('loginError', 'Сессия истекла или была прервана, пожалуйста войдите заново'));
};

export function fetchBalance(phone, accessToken) {
  return apiAction({
    url: '/test/balance/' + phone,
    accessToken: accessToken,
    onSuccess: fetchBalanceSuccess,
    onFailure: fetchBalanceFailure,
    errorLabel: 'fetchBalanceError',
    label: T.BALANCE_FETCH
  });
}

const fetchBalanceSuccess = data => {
  return {
    type: T.BALANCE_FETCH_SUCCESS,
    payload: data
  };
};

const fetchBalanceFailure = data => dispatch => {
  dispatch({
    type: T.BALANCE_FETCH_FAILURE,
    payload: data
  });
};

import * as T from './types';
import {apiAction} from './api';
import NavigationService from 'app/src/services/NavigationService';

// USER INFO

export function userInfo(accessToken) {
  console.log('userInfo', accessToken);
  return apiAction({
    url: '/user/info',
    accessToken: accessToken,
    onSuccess: userInfoSuccess,
    onFailure: userInfoFailure,
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

const userInfoFailure = data => {
  return {
    type: T.USER_INFO_FAILURE,
    payload: data
  };
};

export const selectPhone = phone => {
  return {
    type: T.SELECT_PHONE,
    payload: {phone}
  };
};

export function fetchMsisdns(accessToken) {
  console.log('fetchMsisdns', accessToken);
  return apiAction({
    url: '/external/msisdns',
    accessToken: accessToken,
    onSuccess: fetchMsisdnsSuccess,
    onFailure: fetchMsisdnsFailure,
    errorLabel: 'fetchMsisdnsError',
    label: T.MSISDNS_FETCH
  });
}

const fetchMsisdnsSuccess = data => {
  return {
    type: T.MSISDNS_FETCH_SUCCESS,
    payload: data
  };
};

const fetchMsisdnsFailure = data => {
  return {
    type: T.MSISDNS_FETCH_FAILURE,
    payload: data
  };
};

export function fetchBalance(phone, accessToken) {
  console.log('fetchBalance', phone, accessToken);
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

const fetchBalanceFailure = data => {
  return {
    type: T.BALANCE_FETCH_FAILURE,
    payload: data
  };
};

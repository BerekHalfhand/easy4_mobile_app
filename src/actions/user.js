import * as T from './types';
import {apiAction, apiError, apiErrorDismiss} from './api';
import { store } from 'app/src/reducers';
import { Alert } from 'react-native';
import NavigationService from 'app/src/services/NavigationService';

// USER INFO

export function userInfo() {
  return apiAction({
    url: '/user/info',
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

const selectPhoneAction = phone => ({ type: T.SELECT_PHONE, payload: {phone} });

const gatherPhoneData = (phone) => dispatch => {
  dispatch(fetchBalance(phone));
  dispatch(fetchTariff(phone));
  dispatch(fetchRemains(phone));
};

export const selectPhone = (phone) => dispatch => {
  dispatch(gatherPhoneData(phone));
  dispatch(selectPhoneAction(phone));
};

export function fetchMsisdns() {
  return apiAction({
    url: '/external/iccids',
    onSuccess: fetchMsisdnsSuccess,
    onFailure: fetchMsisdnsFailure,
    failureTransition: 'Login',
    errorLabel: 'fetchMsisdnsError',
    busyScreen: 'msisdns',
    label: T.MSISDNS_FETCH
  });
}

const fetchMsisdnsSuccess = data => dispatch => {
  dispatch({
    type: T.MSISDNS_FETCH_SUCCESS,
    payload: data
  });

  const {user} = store.getState();
  let firstItem = null;
  let altPhone = null;

  if (data && data.items) {
    if (data.items[0]) { // if the user got at least one SIM, show them Main
      firstItem = data.items[0];
      if (firstItem.msisdns && firstItem.msisdns[0] && firstItem.msisdns[0].msisdn) {
        altPhone = firstItem.msisdns[0].msisdn;
        let phone = user.selectedPhone || altPhone;

        if (!user.selectedPhone)
          dispatch(selectPhoneAction(phone));

        dispatch(gatherPhoneData(phone));

        NavigationService.navigate('Main');
      } else { // otherwise consider them a newbie
        NavigationService.navigate('Newbie');
      }
    } else {
      NavigationService.navigate('Newbie');
    }
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

export function fetchBalance(msisdn) {
  return apiAction({
    // url: `/msisdn/${msisdn}/balance`,
    url: `/protei/msisdn/${msisdn}/balance`,
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

export function fetchTariff(phone) {
  return apiAction({
    // url: `/msisdn/${phone}/tariff`,
    url: `/protei/msisdn/${phone}/tariff`,
    onSuccess: fetchTariffSuccess,
    onFailure: fetchTariffFailure,
    errorLabel: 'fetchTariffError',
    label: T.TARIFF_FETCH
  });
}

const fetchTariffSuccess = data => {
  return {
    type: T.TARIFF_FETCH_SUCCESS,
    payload: data
  };
};

const fetchTariffFailure = data => dispatch => {
  dispatch({
    type: T.TARIFF_FETCH_FAILURE,
    payload: data
  });
};

export function fetchRemains(phone) {
  return apiAction({
    // url: `/msisdn/${phone}/remains/products`,
    url: `/protei/msisdn/${phone}/remains/products`,
    onSuccess: fetchRemainsSuccess,
    onFailure: fetchRemainsFailure,
    errorLabel: 'fetchRemainsError',
    label: T.REMAINS_FETCH
  });
}

const fetchRemainsSuccess = data => dispatch => {
  dispatch({
    type: T.REMAINS_FETCH_SUCCESS,
    payload: data
  });
};

const fetchRemainsFailure = data => dispatch => {
  dispatch({
    type: T.REMAINS_FETCH_FAILURE,
    payload: data
  });
};

export function iccidInfo(iccid, msisdn, userId) {
  return apiAction({
    url: `/iccids/info/${iccid}`,
    onSuccess: data => iccidInfoSuccess(data, iccid, msisdn, userId),
    onFailure: iccidInfoFailure,
    errorLabel: 'iccidInfoError',
    busyScreen: 'iccidInfo',
    label: T.ICCID_INFO
  });
}

const iccidInfoSuccess = (data, iccid, msisdn, userId) => dispatch => {
  dispatch({
    type: T.ICCID_INFO_SUCCESS,
    payload: data
  });

  if (data.msisdns &&
      data.msisdns[0] &&
      data.msisdns[0].msisdn &&
      data.msisdns[0].msisdn == msisdn
  )
    dispatch(iccidBind(iccid, userId));
};

const iccidInfoFailure = data => dispatch => {
  dispatch({
    type: T.ICCID_INFO_FAILURE,
    payload: data
  });
};

export function iccidBind(iccid, userId) {
  return apiAction({
    url: `/iccids/${iccid}/bind/user/${userId}`,
    method: 'POST',
    onSuccess: iccidBindSuccess,
    onFailure: iccidBindFailure,
    errorLabel: 'iccidBindError',
    busyScreen: 'iccidBind',
    label: T.ICCID_BIND
  });
}

const iccidBindSuccess = data => dispatch => {
  const onDismiss = () => {
    const {auth} = store.getState();
    dispatch(apiErrorDismiss('iccidBindError'));

    if (auth && auth.accessToken) {
      dispatch(fetchMsisdns());
      NavigationService.navigate('Main');
    } else {
      NavigationService.navigate('Login');
    }
  };

  Alert.alert(
    '',
    'SIM-карта привязана к вашему аккаунту',
    [{text: 'OK', onPress: onDismiss}],
    { onDismiss: onDismiss }
  );

  dispatch({
    type: T.ICCID_BIND_SUCCESS,
    payload: data
  });
};

const iccidBindFailure = data => dispatch => {
  dispatch({
    type: T.ICCID_BIND_FAILURE,
    payload: data
  });
};

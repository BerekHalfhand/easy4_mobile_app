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

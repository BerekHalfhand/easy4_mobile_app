import * as T from './types';
import {apiAction, apiErrorDismiss} from './api';
import NavigationService from 'app/src/services/NavigationService';
import { Alert } from 'react-native';


export function fetchBanners() {
  return apiAction({
    url: '/mobilepromo',
    onSuccess: fetchBannersSuccess,
    onFailure: fetchBannersFailure,
    label: T.BANNERS_FETCH,
  });
}

const fetchBannersSuccess = data => {
  return {
    type: T.BANNERS_FETCH_SUCCESS,
    payload: data
  };
};

const fetchBannersFailure = data => {
  return {
    type: T.BANNERS_FETCH_FAILURE,
    payload: data
  };
};

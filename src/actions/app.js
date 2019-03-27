import * as T from './types';
import {apiAction, apiErrorDismiss} from './api';
import NavigationService from 'app/src/services/NavigationService';
import { Alert } from 'react-native';

export const readState = () => {
  return { type: T.READ_STATE };
};

export const resetState = () => {
  return { type: T.RESET_STATE };
};

const toggleOfferAction = () => ({ type: T.OFFER_TOGGLE, payload: {} });

export function toggleOffer() {
  return function(dispatch) {
    dispatch(toggleOfferAction());
  };
}

// export function fetchBanners() {
//   return apiAction({
//     url: '/mobilepromo',
//     onSuccess: fetchBannersSuccess,
//     successTransition: 'Banners',
//     onFailure: fetchBannersFailure,
//     failureTransition: 'Home',
//     label: T.BANNERS_FETCH,
//     errorLabel: 'bannersError',
//     busyScreen: 'banners',
//   });
// }
//
// const fetchBannersSuccess = data => {
//   return {
//     type: T.BANNERS_FETCH_SUCCESS,
//     payload: data
//   };
// };
//
// const fetchBannersFailure = data => {
//   return {
//     type: T.BANNERS_FETCH_FAILURE,
//     payload: data
//   };
// };

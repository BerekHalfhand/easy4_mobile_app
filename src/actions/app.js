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

const markBannersSeenAction = () => ({ type: T.BANNERS_SEEN, payload: {} });

export function markBannersSeen() {
  return function(dispatch) {
    dispatch(markBannersSeenAction());
  };
}

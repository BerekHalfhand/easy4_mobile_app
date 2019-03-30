import * as T from './types';
import {apiAction, apiError, apiErrorDismiss} from './api';
import NavigationService from 'app/src/services/NavigationService';
import { Alert } from 'react-native';
import { store } from 'app/src/reducers';

export const readState = () => ({ type: T.READ_STATE });
export const resetState = () => ({ type: T.RESET_STATE });

const toggleOfferAction = () => ({ type: T.OFFER_TOGGLE, payload: {} });
const togglePolicyAction = () => ({ type: T.POLICY_TOGGLE, payload: {} });
const markBannersSeenAction = () => ({ type: T.BANNERS_SEEN, payload: {} });

export const toggleOffer = () => dispatch => dispatch(toggleOfferAction());
export const togglePolicy = () => dispatch => dispatch(togglePolicyAction());
export const markBannersSeen = () => dispatch => dispatch(markBannersSeenAction());


export function sendLead(data, actions) {
  return apiAction({
    baseUrlOverride: 'https://crm.easy4.pro',
    url: '/rest-api/crm_leads/putlead/?a=a',
    method: 'POST',
    data,
    onSuccess: data => sendLeadSuccess(data, actions),
    onFailure: sendLeadFailure,
    errorLabel: 'sendLeadError',
    label: T.SEND_LEAD
  });
}

const sendLeadSuccess = (data, actions) => dispatch => {
  const onDismiss = () => {
    const {auth} = store.getState();
    dispatch(apiErrorDismiss('sendLeadError'));
    actions.setSubmitting(false);
    if (auth.authorized)
      NavigationService.navigate('Main');
    else
      NavigationService.navigate('Home');

  };

  Alert.alert(
    '',
    'Спасибо, ваше обращение получено. С вами свяжутся в ближайшее время.',
    [{text: 'OK', onPress: onDismiss}],
    { onDismiss: onDismiss }
  );

  dispatch({
    type: T.SEND_LEAD_SUCCESS,
    payload: data
  });
};

const sendLeadFailure = data => dispatch => {
  dispatch({
    type: T.SEND_LEAD_FAILURE,
    payload: data
  });
};

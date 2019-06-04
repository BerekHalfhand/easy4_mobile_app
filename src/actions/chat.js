import * as T from './types';
import {apiAction, apiError, apiErrorDismiss} from './api';
import NavigationService from 'app/src/services/NavigationService';

export function fetchMessages(userId = '') {
  return apiAction({
    baseUrlOverride: 'https://stage.mp.api.easy4.pro/mobile-chat',
    url: `/messages/${userId}`,
    method: 'GET',
    onSuccess: fetchMessagesSuccess,
    onFailure: fetchMessagesFailure,
    label: T.MESSAGES_FETCH
  });
}

const fetchMessagesSuccess = data => dispatch => {
  dispatch({
    type: T.MESSAGES_FETCH_SUCCESS,
    payload: data
  });
};

const fetchMessagesFailure = data => dispatch => {
  dispatch({
    type: T.MESSAGES_FETCH_FAILURE,
    payload: data
  });
};

export function sendMessage(data) {
  return apiAction({
    baseUrlOverride: 'https://stage.mp.api.easy4.pro/mobile-chat',
    url: '/messages',
    method: 'POST',
    data,
    onSuccess: sendMessageSuccess,
    onFailure: sendMessageFailure,
    label: T.MESSAGES_SEND
  });
}

const sendMessageSuccess = data => dispatch => {
  dispatch({
    type: T.MESSAGES_SEND_SUCCESS,
    payload: data
  });
};

const sendMessageFailure = data => dispatch => {
  dispatch({
    type: T.MESSAGES_SEND_FAILURE,
    payload: data
  });
};

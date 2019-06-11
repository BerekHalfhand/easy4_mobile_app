import * as T from './types';
import {apiAction} from './api';

const chatUrl = 'https://stage.mp.api.easy4.pro/mobile-chat';
// const chatUrl = 'http://192.168.1.55:3000/mobile-chat';

export function fetchMessages(chatroom = '') {
  return apiAction({
    baseUrlOverride: chatUrl,
    url: `/messages/${chatroom}`,
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
    baseUrlOverride: chatUrl,
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

export function createChatroom(data) {
  console.log('createChatroom', data);
  return apiAction({
    baseUrlOverride: chatUrl,
    url: '/chatrooms',
    method: 'POST',
    data,
    onSuccess: createChatroomSuccess,
    onFailure: createChatroomFailure,
    label: T.CHATROOM_CREATE
  });
}

const createChatroomSuccess = data => dispatch => {
  dispatch({
    type: T.CHATROOM_CREATE_SUCCESS,
    payload: data
  });
};

const createChatroomFailure = data => dispatch => {
  dispatch({
    type: T.CHATROOM_CREATE_FAILURE,
    payload: data
  });
};

export const receiveMessage = data => dispatch => {
  console.log('receiveMessage');
  dispatch({
    type: T.MESSAGES_RECEIVE,
    payload: data
  });
};
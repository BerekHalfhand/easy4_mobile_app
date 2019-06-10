import * as T from '../actions/types';

export default (state = {}, action) => {
  let {type, payload} = action;
  let messages = {};//new Map();

  switch (type) {
  case T.READ_STATE:
    console.log('CHAT/READ_STATE', state);
    return state;

  case T.MESSAGES_FETCH_SUCCESS:
    console.log(`CHAT/${type}`, payload);
    payload.result.map(item => {
      messages[item._id] = item;
      // messages.set(item._id, item);
    });

    return {
      messages: messages,
      ...state
    };

  case T.CHATROOM_CREATE:
    console.log(`CHAT/${type}`, payload);
    return state;

  case T.MESSAGES_RECEIVE:
    console.log(`CHAT/${type}`, payload);
    messages = state.messages || {};
    messages[payload._id] = payload;
    return {
      messages,
      ...state
    };

  case T.CHATROOM_CREATE_SUCCESS:
    console.log(`CHAT/${type}`, payload);
    return {
      chatroom: payload.result,
      ...state
    };

  case T.CHATROOM_CREATE_FAILURE:
  case T.MESSAGES_SEND_FAILURE:
  case T.MESSAGES_FETCH_FAILURE:
    console.log(`CHAT/${type}`, payload);
    return state;

  default:
    return state;
  }
};

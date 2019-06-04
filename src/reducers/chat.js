import * as T from '../actions/types';

export default (state = {}, action) => {
  let {type, payload} = action;

  switch (type) {
  case T.MESSAGES_FETCH_SUCCESS:
    console.log(`AUTH/${type}`, payload);
    return {
      messages: payload.result,
      ...state
    };

  case T.MESSAGES_SEND_SUCCESS:
    console.log(`AUTH/${type}`, payload);
    return {
      messages: state.messages.push(payload.result),
      ...state
    };

  case T.MESSAGES_SEND_FAILURE:
  case T.MESSAGES_FETCH_FAILURE:
    console.log(`AUTH/${type}`, payload);
    return state;

  default:
    return state;
  }
};

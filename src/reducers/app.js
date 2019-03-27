import * as T from '../actions/types';

export default (state = {}, action) => {
  let {type, payload} = action;
  // console.log('APP action type => ', type);

  switch (type) {
  case T.READ_STATE:
    console.log('APP/READ_STATE', state);
    return state;

  case T.RESET_STATE:
    console.log('APP/RESET_STATE', state);
    return {};

  case T.BANNERS_FETCH_SUCCESS:
    console.log('APP/BANNERS_FETCH_SUCCESS', payload);
    return state;

  case T.BANNERS_FETCH_FAILURE:
    console.log('APP/BANNERS_FETCH_FAILURE', payload);
    return state;

  default:
    return state;
  }
};

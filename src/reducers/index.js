export default (state = {}, action) => {
  let {payload} = action;

  switch (action.type) {
  case 'READ':
    console.log('reducer read', state);
    return state;

  case 'RESET':
    console.log('reducer reset', state);
    return {};

  case 'PERSIST_ACCESS_TOKEN':
    console.log('reducer/PERSIST_ACCESS_TOKEN', state, action);
    return {...state, accessToken: payload.token};

  case 'PERSIST_REFRESH_TOKEN':
    console.log('reducer/PERSIST_REFRESH_TOKEN', state, action);
    return {...state, refreshToken: payload.token};

  default:
    return state;
  }
};

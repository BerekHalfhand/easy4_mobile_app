export const persistAccessToken = (token) => ({ type: 'PERSIST_ACCESS_TOKEN', payload: {token} });
export const persistRefreshToken = (token) => ({ type: 'PERSIST_REFRESH_TOKEN', payload: {token} });

export function setAccessToken(token) {
  return function(dispatch) {
    dispatch(persistAccessToken(token));
  };
}

export function setRefreshToken(token) {
  return function(dispatch) {
    dispatch(persistRefreshToken(token));
  };
}

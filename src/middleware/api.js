import { API } from 'app/src/actions/types';
import { accessDenied, apiError, apiStart, apiEnd } from 'app/src/actions/api';

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== API) return;

  const {
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headers
  } = action.payload;
  const useBody = !['GET', 'HEAD'].includes(method);

  const baseHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  });
  const baseUrl = 'https://mp.api.easy4.pro';

  if (label) {
    dispatch(apiStart(label));
  }

  let body = JSON.stringify({
    ...data
  });

  fetch(baseUrl+url, {
    method,
    headers: headers || baseHeaders,
    ...(useBody && {body: body})
  })
    // .then(response => {
    //   console.log('response: ', response);
    //   if (!response.ok) {
    //     let error = response.json();
    //     console.log('throwing: ', error);
    //     // TODO: get error text by statusText
    //     throw error;
    //   }
    //   return response.json()
    // })
    .then(response => response.json())
    .then(data => {
      console.log('API response data: ', data);
      if (data.msg && data.msg !== 'OK') throw data.msg;

      dispatch(onSuccess(data));
    })
    .catch(error => {
      console.log('error', error);
      dispatch(apiError(error));
      dispatch(onFailure(error));

      if (error.response && error.response.status === 403) {
        dispatch(accessDenied(window.location.pathname));
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;

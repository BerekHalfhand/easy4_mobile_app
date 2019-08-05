import { API } from 'app/src/actions/types';
import { accessDenied, apiError, apiStart, apiEnd } from 'app/src/actions/api';
import NavigationService from 'app/src/services/NavigationService';
import {NetInfo} from 'react-native';
import {apiUrl} from 'app/.env.json';
// import { store } from 'app/src/reducers';

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== API) return;

  const {
    url,
    baseUrlOverride,
    method,
    data,
    accessToken,
    onSuccess,
    successTransition,
    onFailure,
    failureTransition,
    label,
    headers,
    errorLabel,
    busyScreen,
  } = action.payload;
  const useBody = !['GET', 'HEAD'].includes(method);

  // const {auth} = store.getState();
  // console.log('accessToken', accessToken);

  const baseHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(accessToken && {'Authorization': `Bearer ${accessToken}`}),
  });

  // const baseUrl = baseUrlOverride || 'https://stage.mp.api.easy4.pro';
  // const baseUrl = baseUrlOverride || 'https://mp.api.easy4.pro';
  const baseUrl = baseUrlOverride || apiUrl;

  NetInfo.getConnectionInfo().then((connectionInfo) => {
    // If the connection is gone, redirect to the Offline screen, and memorize the failed action
    if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
      let route = NavigationService.getCurrentRoute(true);
      NavigationService.navigate('Offline', {action, route: route});
    }
  });

  if (label) {
    dispatch(apiStart(label, busyScreen));
  }

  let body = JSON.stringify({
    ...data
  });

  // console.log(`${baseUrl+url} => API`, {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  //   ...(auth.accessToken && {'Authorization': `Bearer ${auth.accessToken}`}),
  // });

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
    // .then(response => {
    //   console.log(`${baseUrl+url} response: `, response);
    //   return response;
    // })
    .then(response => response.json())
    .then(data => {
      console.log(`${baseUrl+url} => API response data:`, data);
      if (data.msg && data.msg !== 'OK') throw data.msg;
      if (data.errors && data.errors[0] && data.errors[0].error) throw data.errors[0].error;

      dispatch(onSuccess(data));
      if (successTransition)
        NavigationService.navigate(successTransition);
    })
    .catch(error => {
      if (errorLabel) {
        console.warn(`${baseUrl+url} => API error:`, error);
        dispatch(apiError(errorLabel, error));
      } else console.error(`${baseUrl+url} => API error:`, error);

      dispatch(onFailure(error));

      if (error.response && error.response.status === 403) {
        dispatch(accessDenied(window.location.pathname));
      }
      if (failureTransition)
        NavigationService.navigate(failureTransition);
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label, busyScreen));
      }
    });
};

export default apiMiddleware;

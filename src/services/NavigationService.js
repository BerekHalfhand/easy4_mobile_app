import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function getCurrentRoute(online = false) {
  let route = _navigator.state.nav;
  let routesStack = [];
  while(route.routes) {
    route = route.routes[route.index];
    routesStack.push(route.routeName);
  }
  // console.warn('routesStack', routesStack);
  if (online) {
    for (let i = routesStack.length - 1; i >= 0; i--) {
      if (routesStack[i] != 'Offline') return routesStack[i];
    }
  }
  return route.routeName;
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  getCurrentRoute,
};

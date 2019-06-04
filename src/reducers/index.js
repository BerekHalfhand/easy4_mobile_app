import { createStore, applyMiddleware, combineReducers} from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';
import apiMiddleware from 'app/src/middleware/api';

import api from './api';
import app from './app';
import auth from './auth';
import user from './user';
import chat from './chat';

const DoNotPersistTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    if (inboundState.doNotPersist)
      return {};

    return { ...inboundState };
  },
  // transform state being rehydrated
  null, //(outboundState, key) => {}
  // define which reducers this transform gets called for.
  { whitelist: ['user', 'auth'] }
);

const rootPersistConfig = {
  storage,
  key: 'root',
  stateReconciler: autoMergeLevel2,
  transforms: [DoNotPersistTransform],
  whitelist: [
    // 'api',
    // 'app',
    'auth',
    'user',
  ],
};

const appPersistConfig = {
  storage,
  key: 'app',
  blacklist: ['doNotPersist']
};

const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, app),
  api,
  auth,
  user,
  chat
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunk,
    apiMiddleware
  )
);
window.store = store;

export const persistor = persistStore(store);

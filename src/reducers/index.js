import { createStore, applyMiddleware, combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';
import apiMiddleware from 'app/src/middleware/api';

import api from './api';
import app from './app';
import auth from './auth';
import user from './user';

const rootPersistConfig = {
  storage,
  key: 'root',
  whitelist: [
    // 'api',
    'app',
    'auth',
    'user',
  ],
};

// const apiPersistConfig = {
//   storage,
//   key: 'api',
//   blacklist: ['errors']
// };

const rootReducer = combineReducers({
  // api: persistReducer(apiPersistConfig, api),
  api,
  app,
  auth,
  user
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

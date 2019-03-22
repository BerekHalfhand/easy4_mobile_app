import { createStore, applyMiddleware, combineReducers} from 'redux';
import reducers from 'app/src/reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';
import apiMiddleware from 'app/src/middleware/api';

const persistConfig = {
  storage,
  key: 'root',
  whitelist: [
    'accessToken',
    'refreshToken',
    'user',
  ],
};

// const rootReducer = combineReducers({
//   reducers,
// });

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunk,
    apiMiddleware
  )
);
window.store = store;

export const persistor = persistStore(store);

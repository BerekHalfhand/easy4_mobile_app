import { createStore, applyMiddleware, combineReducers} from 'redux';
import reducers from 'app/src/reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

// const rootReducer = combineReducers({
//   reducers,
// });

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);

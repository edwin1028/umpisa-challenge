import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducer';

const persistConfig = {
  key: 'UMPISA-0NOAMgrgDPhxMxFu',
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: 'SiaOSfH1kv3Mo1rXJoQss39u3aUqjx7U',
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  //blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
  let persistor = persistStore(store)
  return { store, persistor }
}
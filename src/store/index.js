import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { 
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './slices/contactsSlice';
import userReducer from './slices/userSlice'

const rootReducer = combineReducers({
  contacts: contactsReducer,
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Указываете, какие редюсеры сохранять (в данном случае, только 'user')
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

export const persistor = persistStore(store)

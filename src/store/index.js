import { combineReducers, configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactsSlice';
import userReducer from './slices/userSlice'

const rootReducer = combineReducers({
  contacts: contactsReducer,
  user: userReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store

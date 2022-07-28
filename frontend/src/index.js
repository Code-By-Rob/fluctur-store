import React from 'react';
import ReactDOM from 'react-dom/client';
import './global-styles.css';
import App from './main/App';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './redux/reducer';
import { configureStore } from '@reduxjs/toolkit'
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'fluctur',
  storage
}

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
      cart: persistedReducer,
  }
});
const persister = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persister} >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
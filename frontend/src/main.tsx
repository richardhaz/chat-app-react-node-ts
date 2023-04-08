import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/sass/root.scss';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  /*   <React.StrictMode> */
  <Provider store={store}>
    <ToastContainer theme="dark" />
    <App />
  </Provider>
  /*   </React.StrictMode> */
);

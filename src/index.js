import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './fonts/Gilroy/Gilroy-Semibold.ttf';
import './fonts/Gilroy/Gilroy-Medium.ttf';
import './fonts/Gilroy/Gilroy-Bold.ttf';
import './fonts/Nunito/NunitoSans-Regular.ttf';
import './fonts/Nunito/NunitoSans-Bold.ttf';
import './fonts/Nunito/NunitoSans-BoldItalic.ttf';
import './fonts/Nunito/NunitoSans-SemiBold.ttf';
import { Provider } from 'react-redux';
import store from '../src/Store/Store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();


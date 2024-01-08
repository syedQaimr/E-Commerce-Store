import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactErrorBoundary from './components/frontendErrorHandler/ReactErrorBoundry';

const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  timeout: 5000,
  position: positions.MIDDLE,
  transition: transitions.SCALE

}

root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <ReactErrorBoundary>
        <App />
      </ReactErrorBoundary>
    </AlertProvider>

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

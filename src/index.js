import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./scss/global.scss"
import App from './App';
import {rootReducer} from "./redux/store"
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={rootReducer}>
    <App />
    </Provider>
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { EricMeyerReset } from '../src/shared/reset';
import { GlobalStyle } from './shared/global.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <EricMeyerReset />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);


import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App.jsx';
var e = React.createElement;

ReactDOM.render(React.createElement(
  React.StrictMode,
  null,
  React.createElement(App, null)
), document.getElementById('root'));
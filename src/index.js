import React from 'react';
import ReactDOM from 'react-dom/client';

import '../node_modules/react-bootstrap/dist/react-bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


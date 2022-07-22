import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.scss';
import './index.scss'
import { ContextProvider } from './contexts/ContextProvider'

ReactDOM.render(
  <ContextProvider>
      <App />
  </ContextProvider>, 
  document.getElementById('root'));
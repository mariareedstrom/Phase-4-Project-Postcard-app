import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { CssBaseline } from "@mui/material";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <CssBaseline />
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



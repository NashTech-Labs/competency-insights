import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { MsalProvider } from '@azure/msal-react';
import {PublicClientApplication} from "@azure/msal-browser";
import {msalConfig} from "./auth/authConfig";

const root = ReactDOM.createRoot(document.getElementById('root'));
const msalInstance = new PublicClientApplication(msalConfig);


root.render(
  <React.StrictMode>
    <Router>
      <MsalProvider instance={msalInstance}>
      <App />
      </MsalProvider>
      </Router>
  </React.StrictMode>
);
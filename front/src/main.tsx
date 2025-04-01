/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

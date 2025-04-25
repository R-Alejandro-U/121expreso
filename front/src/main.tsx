import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import App from './App';
import './index.css';
import { ReviewsProvider } from './context/CommentContex';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
      <ReviewsProvider>
        <App />
      </ReviewsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);


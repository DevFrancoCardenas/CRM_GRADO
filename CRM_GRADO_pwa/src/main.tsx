import React from 'react';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from './context/store';
import App from './App';
import client from './api';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
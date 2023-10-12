import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import { Root } from './routes/Root.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)

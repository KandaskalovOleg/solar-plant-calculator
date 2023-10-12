import React from 'react';
import './Main.scss';
import { Outlet } from 'react-router-dom';

export const Main: React.FC = () => {
  
  return (
    <main>
      <Outlet />
    </main>
  );
}
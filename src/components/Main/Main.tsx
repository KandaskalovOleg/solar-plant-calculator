import React from 'react';
import './Main.scss';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

export const Main: React.FC = () => {
  
  return (
    <main className='main'>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </main>
  );
}
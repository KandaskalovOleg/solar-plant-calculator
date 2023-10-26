import React from 'react';
import './styles/App.scss';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {

  return (
    <div className='app-container'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

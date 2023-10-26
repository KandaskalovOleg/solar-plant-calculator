import React from 'react';
import { useTranslation } from 'react-i18next'; 
import './Home.scss';
import solarPlantSrc from './../../assets/images/solar-plant.jpg';
import { SimpleCalculator } from '../../components/SimpleCalculator/SimpleCalculator';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='page-wrapper'>
      <h1 className='title'>Solar Plant Calculator</h1>
      <div className='description'>
        <div className='description-image'>
          <img className="image" src={solarPlantSrc} alt="Solar plant image"/>
        </div>
        <div className='description-block'>
          <p className='description-text'>{t('description')}</p>
        </div>
      </div>
      <SimpleCalculator />
    </div>
  );
}
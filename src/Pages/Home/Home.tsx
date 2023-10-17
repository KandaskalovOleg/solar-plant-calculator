import React from 'react';
import { useTranslation } from 'react-i18next'; 
import './Home.scss';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('greeting')}
    </div>
  );
}
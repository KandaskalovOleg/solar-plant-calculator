import React from 'react';
import './Contacts.scss';
import { useTranslation } from 'react-i18next';

export const Contacts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('contacts')}
    </div>
  );
}
import React from 'react';
import { useTranslation } from 'react-i18next'; 
import './ChoseDevices.scss';
import { renderAutocomplete } from './renderAutocomplete';

const options1 = [
  { label: 'The Godfather' },
  { label: 'Pulp Fiction' },
  { label: 'The Godfather' },
  { label: 'Pulp Fiction' },
  { label: 'The Godfather' },
  { label: 'Pulp Fiction' },
  { label: 'The Godfather' },
  { label: 'Pulp Fiction' },
  { label: 'The Godfather' },
];

const options2 = [
  { label: 'The Godfather' },
  { label: 'Pulp Fiction' },
  { label: 'The Godfather' },
  { label: 'Pulp Fiction' },
  { label: 'The Godfather' },
  { label: 'Pulp Fiction' },
  { label: 'The Godfather' },
  { label: 'Pulp Fiction' },
  { label: 'The Godfather' },
];

const options3 = [
  { label: '1' },
  { label: '2' },
  { label: '3' },
  { label: '4' },
  { label: '5' },
  { label: '6' },
  { label: '7' },
  { label: '8' },
  { label: '9' },
];

interface ChoseDeviceProps {
  isXs: boolean;
  onDeviceChange: (type: 'inverter' | 'panel' | 'quantity', value: string | null) => void;
}

export const ChoseDevices: React.FC<ChoseDeviceProps> = ({ isXs, onDeviceChange }) => {
  const { t } = useTranslation();

  return (
    <div className='chose-devices'>
      {renderAutocomplete({
        type: 'inverter',
        label: t('devices.inverter.label'),
        options: options1,
        isXs,
        onDeviceChange,
      })}
      {renderAutocomplete({
        type: 'panel',
        label: t('devices.panel.label'),
        options: options2,
        isXs,
        onDeviceChange,
      })}
      {renderAutocomplete({
        type: 'quantity',
        label: t('devices.counter.label'),
        options: options3,
        isXs,
        onDeviceChange,
      })}
    </div>
  );
};
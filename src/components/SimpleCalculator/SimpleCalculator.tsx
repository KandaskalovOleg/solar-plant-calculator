import React from 'react';
import './SimpleCalculator.scss';
import { useTranslation } from 'react-i18next';
import { ChoseLocation } from '../../shared/ChoseLocation/ChoseLocation';
import { ChoseDevices } from '../../shared/ChoseDevices/ChoseDevices';
import { useJsApiLoader } from '@react-google-maps/api';
import { useMediaQuery, useTheme } from '@mui/material';
import { PositionStation } from '../../shared/PositionStation/PositionStation';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

interface SelectedDevices {
  inverter: string | null;
  panel: string | null;
  quantity: string | null;
}

export const SimpleCalculator: React.FC = () => {
  const { t } = useTranslation();

  const [coordinates, setCoordinates] = React.useState<{ lat: number; lng: number } | null>(null);
  const [selectedDevices, setSelectedDevices] = React.useState<SelectedDevices>({ inverter: null, panel: null, quantity: null });
  
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));

  const [center, setCenter] = React.useState({
    lat: +t('locations.lat'),
    lng: +t('locations.lng'),
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['places'],
  })

  const onPlaceSelect = React.useCallback((coordinates: React.SetStateAction<{ lat: number; lng: number; }>) => {
    setCenter(coordinates);
  }, []);

  console.log(coordinates, selectedDevices);

  return (
    <div className='simple-calculator'>
      {
        isLoaded ? 
          <ChoseLocation 
          center={ center } 
          isLoaded={ isLoaded } 
          onSelect={ onPlaceSelect }
          setCoordinates={ setCoordinates }
          isXs={isXs}
        /> 
        : <div>loading</div>
      }
      <ChoseDevices 
        isXs={isXs}
        onDeviceChange={(type, value) => {
          setSelectedDevices((prevState) => ({
            ...prevState,
            [type]: value,
          }));
        }}
      />
      <PositionStation 
        isXs={isXs}
      />
    </div>
  );
}
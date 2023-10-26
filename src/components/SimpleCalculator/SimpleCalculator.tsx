import React from 'react';
import './SimpleCalculator.scss';
import { useTranslation } from 'react-i18next';
import { ChoseLocation } from '../../shared/ChoseLocation/ChoseLocation';
import { useJsApiLoader } from '@react-google-maps/api';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const SimpleCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [center, setCenter] = React.useState({
    lat: +t('locations.lat'),
    lng: +t('locations.lng'),
  });
  const [coordinates, setCoordinates] = React.useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['places'],
  })

  const onPlaceSelect = React.useCallback((coordinates: React.SetStateAction<{ lat: number; lng: number; }>) => {
    setCenter(coordinates);
  }, []);

  console.log(coordinates);

  return (
    <div className='simple-calculator'>
      <div className='location-block'>
        {
          isLoaded ? 
            <ChoseLocation 
            center={ center } 
            isLoaded={ isLoaded } 
            onSelect={ onPlaceSelect }
            setCoordinates={ setCoordinates }
          /> 
          : <div>loading</div>
        }
      </div>
    </div>
  );
}
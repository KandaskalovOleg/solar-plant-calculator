import React from 'react';
import './ChoseLocation.scss';
import './../../styles/variables.scss';
import { useTranslation } from 'react-i18next';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { defaultTheme } from './Theme';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import List from '@mui/material/List';
import { TextField } from '@mui/material';

interface ChoseLocationProps {
  center: Location;
  isLoaded: unknown;
  onSelect: (coordinates: Location) => void;
  setCoordinates: (coordinates: Location) => void;
  isXs: boolean;
}

interface Location {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
}

export const ChoseLocation: React.FC<ChoseLocationProps> = ({ 
  center, 
  isLoaded, 
  onSelect,
  setCoordinates,
  isXs
}) => {
  const { t } = useTranslation();
  const [zoom, setZoom] = React.useState(6);
  const [showMarker, setShowMarker] = React.useState(false);
  const [markerPosition, setMarkerPosition] = React.useState(center);

  const mapRef = React.useRef<google.maps.Map | undefined>(undefined);

  const onLoad = React.useCallback(function callback(map: google.maps.Map | undefined) {
    mapRef.current = map;
  }, [])

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined;
  }, [])

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    init,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });
  
  const handleInput = (e: { target: { value: string; }; }) => {
    setValue(e.target.value);
  };
  
  const handleSelect = (suggestion: { description: string }) => () => {
    const { description } = suggestion;
    setValue(description, false);
    clearSuggestions();
  
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      onSelect({ lat, lng });
      setMarkerPosition({ lat, lng });
      setCoordinates({ lat, lng });
      setZoom(17);
      setShowMarker(true);
    });
  };
  
  const renderSuggestions = () =>
  data.map((suggestion) => {
    const {
      place_id,
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    return (
      <li className='li-autocomplete' key={place_id} onClick={handleSelect(suggestion)}>
        <strong>{main_text}</strong> <small>{secondary_text}</small>
      </li>
    );
  });

  React.useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded, init])

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newMarkerPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };

      setMarkerPosition(newMarkerPosition);
      setCoordinates(newMarkerPosition);
    }
  };

  return (
    <div className='chose-location'>
      <div className='autocomplete' ref={ref}>
        <h2>{t('location.title')}</h2>
        <h3>{t('location.heading')}</h3>
        <span>{t('location.description')}</span>
        <div className='autocomplete-wrapper'>
          <TextField
            id="outlined-basic" 
            label={t('location.heading')} 
            size={isXs ? 'small' : 'medium'}
            variant="outlined" 
            type="text" 
            value={value}
            onChange={handleInput}
            disabled={!ready}
            InputLabelProps={{
              style: { color: '#333333' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--border-color)',
                  color: 'var(--border-color)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--border-color)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--border-color)',
                },
              },
            }}
          />
          {status === "OK" && (
            <List className='place-list'>
              {renderSuggestions()}
            </List>
          )}
        </div>
      </div>
      <div className="google-map-wrapper">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={defaultOptions}
        >
          {showMarker && 
          <Marker 
            position={markerPosition} 
            onDragEnd={handleMarkerDragEnd}
            draggable={true}
          />
          }
        </GoogleMap>
      </div>
    </div>
  );
}

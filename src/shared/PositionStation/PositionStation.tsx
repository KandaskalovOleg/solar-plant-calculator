import React from 'react';
import { useTranslation } from 'react-i18next';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import './PositionStation.scss';
import { CustomRadio, CustomSlider } from '../../components/CustomMui/Custom';

interface PositionProps {
  isXs: boolean;
  position: {
    panelOrientation: 'portrait' | 'landscape';
    azimuth: number;
    panelTilt: number;
  };
  onPositionChange: (type: 'panelOrientation' | 'azimuth' | 'panelTilt', value: number | number[] | string) => void;
}

const azimutMarks = [
  {
    value: 0,
    label: '0°',
  },
  {
    value: 360,
    label: '360°',
  },
];

const tiltMarks = [
  {
    value: 0,
    label: '0°',
  },
  {
    value: 90,
    label: '90°',
  },
];

export const PositionStation: React.FC<PositionProps> = ({ isXs, position, onPositionChange }) => {
  const { t } = useTranslation();
  const [azimuth, setAzimuth] = React.useState(position.azimuth);
  const [panelTilt, setPanelTilt] = React.useState(position.panelTilt);
  const [customAzimuth, setCustomAzimuth] = React.useState<string>('');

  const handleCustomAzimuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAzimuth(event.target.value);
  };

  const handleOrientationChange = () => {
    onPositionChange('panelOrientation', 
      position.panelOrientation === 'landscape' ? 'portrait' : 'landscape');
  };

  const handleCommittedAzimuthChange = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    onPositionChange('azimuth', newValue);
  };

  const handleCommittedTiltChange = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    onPositionChange('panelTilt', newValue);
  };

  const handleAzimuthChange = (_event: Event, newValue: number | number[]) => {
    setAzimuth(newValue as number);
  };

  const handleTiltChange = (_event: Event, newValue: number | number[]) => {
    setPanelTilt(newValue as number);
  };

  const compassContainerStyle = {
    transform: `rotate(${azimuth - 180}deg)`,
  };

  const panelStyle = {
    transform: `rotateX(-${panelTilt*0.85}deg)`,
  };

  return (
    <div className='position-station'>
      <div className='parameters-station'>
        <div className='parameter-station'>
          <Typography component="p">{t('position.orientation')}</Typography>
          <RadioGroup
            aria-label="panel-orientation"
            name="panel-orientation"
            value={position.panelOrientation}
            onChange={handleOrientationChange}
            row
          >
            <FormControlLabel
              value="portrait"
              control={<CustomRadio />}
              label={t('position.portrait')}
            />
            <FormControlLabel
              value="landscape"
              control={<CustomRadio />}
              label={t('position.landscape')}
            />         
          </RadioGroup>
        </div>
        <div className='parameter-station'>
          <div>
            <Typography component="p">
              {t('position.angle')}
            </Typography>
            <TextField
              variant="standard"
              size='small'
              value={customAzimuth}
              onChange={handleCustomAzimuthChange}
            />
          </div>
          <CustomSlider
            value={azimuth}
            onChange={handleAzimuthChange}
            onChangeCommitted={handleCommittedAzimuthChange}
            size={isXs ? 'small' : 'medium'}
            min={0}
            max={360}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}°`}
            marks={azimutMarks}
            aria-label="azimut-range"
            sx={{
              color: 'var(--border-color)',
            }}
          />
        </div>
        <div className='parameter-station'>
          <Typography component="p">
            {t('position.tilt')}
          </Typography>
          <CustomSlider
            value={panelTilt}
            onChange={handleTiltChange}
            onChangeCommitted={handleCommittedTiltChange}
            size={isXs ? 'small' : 'medium'}
            min={0}
            max={90}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}°`}
            marks={tiltMarks}
            aria-label="tilt-range"
            sx={{
              color: 'var(--border-color)',
            }}
          />
        </div>      
      </div>
      <div className='visual-station'>
        <div className='compass-container' style={compassContainerStyle}>
          <img className='compass-img' src="/compass.svg" alt="compass" />          
          <div className="compass-label c-n"><b>N</b></div>
          <div className="compass-label c-w"><b>W</b></div>
          <div className="compass-label c-e"><b>E</b></div>
          <div className="compass-label c-s"><b>S</b></div>
          <div className="compass-label c-nw">NW</div>
          <div className="compass-label c-se">SE</div>
          <div className="compass-label c-sw">SW</div>
          <div className="compass-label c-ne">NE</div>
        </div>
        <div className='panels'>
          <img className='panel-img' style={panelStyle} src={`/solar-plant-${position.panelOrientation}.svg`} alt="panels" />
          <img className='panel-img' style={panelStyle} src={`/solar-plant-${position.panelOrientation}.svg`} alt="panels" />
          <img className='panel-img' style={panelStyle} src={`/solar-plant-${position.panelOrientation}.svg`} alt="panels" />
          <img className='sun-img' src="/sun.svg" alt="sun" />
        </div>
      </div>
    </div>
  );
};
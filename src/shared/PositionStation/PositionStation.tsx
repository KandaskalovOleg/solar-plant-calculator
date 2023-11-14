import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import './PositionStation.scss';
import { CustomRadio, CustomSlider } from '../../components/CustomMui/Custom';


interface PositionProps {
  isXs: boolean;
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

export const PositionStation: React.FC<PositionProps> = ({ isXs }) => {
  const { t } = useTranslation();
  const [panelOrientation, setPanelOrientation] = useState('portrait');
  const [azimuth, setAzimuth] = useState(180);
  const [panelTilt, setPanelTilt] = useState(30);

  const handleOrientationChange = () => {
    setPanelOrientation((prevOrientation) =>
      prevOrientation === 'landscape' ? 'portrait' : 'landscape'
    );
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
            value={panelOrientation}
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
          <Typography component="p">
            {t('position.angle')}
          </Typography>
          <CustomSlider
            value={azimuth}
            onChange={handleAzimuthChange}
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
          <img className='panel-img' style={panelStyle} src={`/solar-plant-${panelOrientation}.svg`} alt="panels" />
          <img className='panel-img' style={panelStyle} src={`/solar-plant-${panelOrientation}.svg`} alt="panels" />
          <img className='panel-img' style={panelStyle} src={`/solar-plant-${panelOrientation}.svg`} alt="panels" />
          <img className='sun-img' src="/sun.svg" alt="sun" />
        </div>
      </div>
    </div>
  );
};
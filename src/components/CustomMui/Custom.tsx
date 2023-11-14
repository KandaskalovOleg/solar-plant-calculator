import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

export const CustomSlider = styled(Slider)(() => ({
  '& .MuiSlider-thumb': {
    boxShadow: 'initial',

    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px #F6DE0128',
    },

    '&.Mui-active': {
      boxShadow: '0px 0px 0px 14px #F6DE0128',
    },
  },
})
);

export const CustomRadio = styled(Radio)(() => ({
  color: 'var(--border-color)',
  '&.Mui-checked': {
    color: 'var(--border-color)',
  },
  '&:hover, &.Mui-focusVisible': {
    backgroundColor: '#F6DE0128',
  },
  '&.Mui-active': {
    backgroundColor: '0px 0px 0px 8px #F6DE0128',
  },
})
);
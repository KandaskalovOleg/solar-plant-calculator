import { Autocomplete, TextField } from '@mui/material';

interface AutocompleteProps {
  type: 'inverter' | 'panel' | 'quantity';
  label: string;
  options: { label: string }[];
  isXs: boolean;
  onDeviceChange: (type: 'inverter' | 'panel' | 'quantity', value: string | null) => void;
}

export const renderAutocomplete = ({ type, label, options, isXs, onDeviceChange }: AutocompleteProps) => {
  return (
    <Autocomplete
      disablePortal={true}
      id={type}
      size={isXs ? 'small' : 'medium'}
      options={options}
      onChange={(_, newValue) => {
        onDeviceChange(type, newValue ? newValue.label : null);
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#F6DE01',
            color: '#F6DE01',
          },
          '&:hover fieldset': {
            borderColor: '#F6DE01',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#F6DE01',
          },
        },
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            InputLabelProps={{
              style: { color: '#333333' }
            }}
          />
        );
      }}
    />
  );
};
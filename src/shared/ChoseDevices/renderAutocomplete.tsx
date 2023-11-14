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
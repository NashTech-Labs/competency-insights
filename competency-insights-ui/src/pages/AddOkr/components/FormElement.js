import React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export const FormElement = ({ label, name, options, type, onChange }) => {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label text-lg font-bold mb-2">{label}</label>
      {type === 'text' ? (
        <TextField
          type={type}
          name={name}
          id={name}
          onChange={handleChange}
          placeholder={`Enter ${label}`}
          variant="filled"
          size="normal"
          fullWidth
          required
        />
      ) : type === 'date' ? (
        <TextField
          type={type}
          name={name}
          id={name}
          onChange={handleChange}
          variant="filled"
          fullWidth
          required
        />
      ) : type === 'textarea' ? (
        <TextField
          type={type}
          id={name}
          name={name}
          onChange={handleChange}
          multiline 
          rows={4}
          maxRows={6}
          placeholder={`Enter ${label}`}
          variant="filled"
          fullWidth
        />
      ) : (
        <Select
          id={name}
          name={name}
          onChange={handleChange}
          variant="filled"
          fullWidth
          required
          defaultValue=""
        >
          <MenuItem value="" disabled>
            -- Select {label} --
          </MenuItem>
          {options && options.length > 0 && options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
}

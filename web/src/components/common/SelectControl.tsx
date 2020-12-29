import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { Dispatch, SetStateAction } from 'react';
import { baseProps } from './BaseControl';

type SelectControlProps<T> = {
  label: string;
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  options: T[];
};

const SelectControl = <T extends string>(props: SelectControlProps<T>) => (
  <FormControl {...baseProps}>
    <InputLabel htmlFor={props.label.toLowerCase()}>{props.label}</InputLabel>
    <Select
      id={props.label.toLowerCase()}
      label={props.label}
      native
      fullWidth
      value={props.value}
      onChange={(e) => props.setValue(e.target.value as T)}
    >
      {Object.values(props.options).map((type) => (
        <option value={type}>{type}</option>
      ))}
    </Select>
  </FormControl>
);

export default SelectControl;

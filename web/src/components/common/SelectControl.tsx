import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { Dispatch, SetStateAction } from 'react';
import { baseProps } from './BaseControl';

export type Option = {
  value: string;
  label: string;
};

type SelectControlProps<T> = {
  label: string;
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  options: T[] | Option[];
};

const SelectControl = <T extends string | number>({
  label,
  value,
  setValue,
  options,
}: SelectControlProps<T>) => (
  <FormControl {...baseProps}>
    <InputLabel htmlFor={label.toLowerCase()}>{label}</InputLabel>
    <Select
      id={label.toLowerCase()}
      label={label}
      native
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value as T)}
    >
      <option key="empty" value="" />
      {Object.values(options).map((option) => (
        <option key={option.value ?? option} value={option.value ?? option}>
          {option.label ?? option}
        </option>
      ))}
    </Select>
  </FormControl>
);

export default SelectControl;

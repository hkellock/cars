import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { Dispatch, SetStateAction } from 'react';
import { baseProps } from './BaseControl';

export type Option = {
  value: string;
  label: string;
};

type SelectControlProps<T, TValue> = {
  label: string;
  multiple?: boolean;
  value: TValue;
  setValue: Dispatch<SetStateAction<TValue>>;
  options: T[] | Option[];
};

const SelectControl = <T extends string | number, TValue extends T | T[]>({
  label,
  multiple,
  value,
  setValue,
  options,
}: SelectControlProps<T, TValue>) => (
  <FormControl {...baseProps}>
    <InputLabel htmlFor={label.toLowerCase()}>{label}</InputLabel>
    <Select
      id={label.toLowerCase()}
      label={label}
      multiple={Boolean(multiple)}
      native={!multiple}
      fullWidth
      renderValue={(selected) =>
        multiple
          ? (selected as string[])
              .map((s) => {
                const match = Object.values(options).find(
                  (o) => (o.value ?? o) === s,
                );
                return match?.label ?? match;
              })
              .join(', ')
          : (selected as T)
      }
      value={value}
      onChange={(e) => setValue(e.target.value as TValue)}
    >
      <option key="empty" value="" />

      {multiple
        ? Object.values(options).map((option: Option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox
                checked={Boolean(
                  (value as T[]).find((t) => t === option.value),
                )}
              />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))
        : Object.values(options).map((option) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
    </Select>
  </FormControl>
);

export default SelectControl;

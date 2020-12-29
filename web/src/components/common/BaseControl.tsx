import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

export type BaseControlProps = TextFieldProps & {
  label: string;
};

export const baseProps = {
  variant: 'outlined',
  fullWidth: true,
  style: { marginTop: '0.5rem', marginBottom: '0.5rem' },
} as const;

const BaseControl: React.FC<BaseControlProps> = (props) => (
  <TextField id={props.label.toLowerCase()} {...{ ...baseProps, ...props }} />
);

export default BaseControl;

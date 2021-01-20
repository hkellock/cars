import React, { Dispatch, SetStateAction } from 'react';
import BaseControl, { BaseControlProps } from './BaseControl';

type TextControlProps = BaseControlProps & {
  setValue: Dispatch<SetStateAction<string>>;
};

const TextControl: React.FC<TextControlProps> = ({ setValue, ...props }) => (
  <BaseControl
    type="text"
    onChange={(e) => setValue(e.target.value)}
    {...props}
  />
);

export default TextControl;

import React, { Dispatch, SetStateAction } from 'react';
import BaseControl, { BaseControlProps } from './BaseControl';

type TextControlProps = BaseControlProps & {
  setValue: Dispatch<SetStateAction<string>>;
};

const TextControl: React.FC<TextControlProps> = (props) => (
  <BaseControl
    type="text"
    onChange={(e) => props.setValue(e.target.value)}
    {...props}
  />
);

export default TextControl;

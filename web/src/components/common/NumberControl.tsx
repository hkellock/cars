import React, { Dispatch, SetStateAction } from 'react';
import BaseControl, { BaseControlProps } from './BaseControl';

type NumberControlProps = BaseControlProps & {
  setValue: Dispatch<SetStateAction<number>>;
};

const NumberControl: React.FC<NumberControlProps> = (props) => (
  <BaseControl
    type="number"
    onChange={(e) => props.setValue(Number(e.target.value))}
    {...props}
  />
);

export default NumberControl;

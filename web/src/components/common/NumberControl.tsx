import React, { Dispatch, SetStateAction } from 'react';
import BaseControl, { BaseControlProps } from './BaseControl';

type NumberControlProps = BaseControlProps & {
  setValue: Dispatch<SetStateAction<number>>;
};

const NumberControl: React.FC<NumberControlProps> = ({
  setValue,
  ...props
}) => (
  <BaseControl
    type="number"
    onChange={(e) => setValue(Number(e.target.value))}
    {...props}
  />
);

export default NumberControl;

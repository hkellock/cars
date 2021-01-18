import React from 'react';
import GridItem from '../common/GridItem';

export type GridRowProps = {
  titleElement: JSX.Element;
  elements: JSX.Element[];
};

const GridRow = ({ titleElement, elements }: GridRowProps): JSX.Element[] => {
  return [
    <GridItem key="title" xs={4}>
      {titleElement}
    </GridItem>,
    ...elements.map((element, index) => (
      <GridItem key={index} xs={4}>
        {element}
      </GridItem>
    )),
  ];
};

export default GridRow;

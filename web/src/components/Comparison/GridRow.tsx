import { Grid } from '@material-ui/core';
import React from 'react';

export type GridRowProps = {
  titleElement: JSX.Element;
  elements: JSX.Element[];
};

const GridRow = ({ titleElement, elements }: GridRowProps): JSX.Element[] => {
  return [
    <Grid key="title" item xs={4}>
      {titleElement}
    </Grid>,
    ...elements.map((element, index) => (
      <Grid key={index} item xs={4}>
        {element}
      </Grid>
    )),
  ];
};

export default GridRow;

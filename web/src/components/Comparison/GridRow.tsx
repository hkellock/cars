import { Grid } from '@material-ui/core';
import React from 'react';

type GridRowProps = {
  titleElement: JSX.Element;
  elements: JSX.Element[];
};

const GridRow: React.FC<GridRowProps> = ({
  titleElement: descriptionElement,
  elements,
}) => {
  return (
    <>
      <Grid item xs={4}>
        {descriptionElement}
      </Grid>
      {elements.map((element) => (
        <Grid item xs={4}>
          {element}
        </Grid>
      ))}
    </>
  );
};

export default GridRow;

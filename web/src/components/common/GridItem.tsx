import { Container, Grid, GridProps } from '@material-ui/core';

type GridItemProps = GridProps & {
  children: JSX.Element;
};

const GridItem: React.FC<GridItemProps> = (props) => (
  <Grid item {...props}>
    <Container>{props.children}</Container>
  </Grid>
);

export default GridItem;
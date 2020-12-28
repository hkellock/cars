import React from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import CarAdd from './CarAdd';
import { Car, useListCarsQuery } from '../../types/generated-types-and-hooks';

const CarList: React.FC = () => {
  const { loading, error, data } = useListCarsQuery();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error!</p>;

  const handleToggle = (car: Car) => () => {
    console.log(`${car.id} toggled`);
  };

  const handleEdit = (car: Car) => () => {
    console.log(`${car.id} edit requested`);
  };

  return (
    <>
      <List>
        {data.cars.map((car) => (
          <ListItem key={car.id} button onClick={handleToggle(car)}>
            <ListItemText primary={car.brand} secondary={car.model} />
            <ListItemSecondaryAction onClick={handleEdit(car)}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <CarAdd />
    </>
  );
};

export default CarList;

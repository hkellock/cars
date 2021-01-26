import React, { useState } from 'react';
import {
  Container,
  Fab,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import EditDialog, { defaultCarInput } from './EditDialog';
import { CarInput } from '../../types/generated-types-and-hooks';
import useCars, { ListCar } from '../../hooks/useCars';

const CarList: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<
    ListCar | CarInput | undefined
  >(undefined);
  const { cars } = useCars();

  if (!cars) return <p>Loading...</p>;

  const handleAddStart = () => {
    setSelectedCar({ ...defaultCarInput });
  };

  const handleEditStart = (car: ListCar) => () => {
    setSelectedCar(car);
  };

  return (
    <Container maxWidth="sm">
      <List>
        {cars.map((car) => (
          <ListItem key={car.id} button onClick={handleEditStart(car)}>
            <ListItemText primary={car.brand} secondary={car.model} />
          </ListItem>
        ))}
      </List>
      <Fab color="primary" onClick={handleAddStart}>
        <Add />
      </Fab>
      <EditDialog car={selectedCar} setCar={setSelectedCar} />
    </Container>
  );
};

export default CarList;

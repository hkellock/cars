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
import {
  Car,
  CarInput,
  useListCarsQuery,
} from '../../types/generated-types-and-hooks';
import { useReactiveVar } from '@apollo/client';
import { carsVar } from '../../client';

const CarList: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<CarInput | undefined>(
    undefined,
  );
  const { loading, error, data } = useListCarsQuery({
    onCompleted: (query) => carsVar(query.cars),
  });
  const cars = useReactiveVar(carsVar);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error!</p>;

  const handleAddStart = () => {
    setSelectedCar({ ...defaultCarInput });
  };

  const handleEditStart = (car: Car) => () => {
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

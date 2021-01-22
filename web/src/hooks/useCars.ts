import { useEffect, useState } from 'react';
import { updateCachedCars } from '../client';
import {
  Car,
  useAddCarMutation,
  useListCarsQuery,
  useModifyCarMutation,
  useRemoveCarMutation,
  CarInput,
} from '../types/generated-types-and-hooks';

const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const { data } = useListCarsQuery();
  const [addMutation] = useAddCarMutation();
  const [editMutation] = useModifyCarMutation();
  const [removeMutation] = useRemoveCarMutation();

  useEffect(() => {
    if (data) {
      setCars(data.cars);
      return;
    }
    setCars([]);
  }, [data]);

  const addCar = async (car: CarInput) => {
    await addMutation({
      variables: { car },
      update: (_, result) =>
        result.data && updateCachedCars([...cars, result.data.createCar]),
    });
  };

  const editCar = async (id: string, car: CarInput) => {
    await editMutation({
      variables: { id, car },
      update: (_, result) =>
        result.data &&
        updateCachedCars([
          ...cars.filter((c) => c.id !== id),
          result.data.editCar,
        ]),
    });
  };

  const removeCar = async (car: Car) => {
    await removeMutation({ variables: { id: car.id } });
    updateCachedCars([...cars.filter((c) => c.id !== car.id)]);
  };

  return {
    cars,
    addCar,
    editCar,
    removeCar,
  };
};

export default useCars;

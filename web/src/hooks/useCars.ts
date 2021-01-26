import { useEffect, useState } from 'react';
import {
  useAddCarMutation,
  useListCarsQuery,
  useModifyCarMutation,
  useRemoveCarMutation,
  CarInput,
  ListCarsDocument,
  Car,
} from '../types/generated-types-and-hooks';

export type ListCar = Omit<Car, 'compareTo'> & {
  compareTo?: Pick<Car, 'id'>[] | null;
};

const useCars = () => {
  const [cars, setCars] = useState<ListCar[]>([]);
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

  const addCar = async (car: CarInput) =>
    await addMutation({
      variables: { car },
      refetchQueries: [{ query: ListCarsDocument }],
    });

  const editCar = async (id: string, car: CarInput) =>
    await editMutation({
      variables: { id, car },
      refetchQueries: [{ query: ListCarsDocument }],
    });

  const removeCar = async (car: ListCar) =>
    await removeMutation({
      variables: { id: car.id },
      refetchQueries: [{ query: ListCarsDocument }],
    });

  return {
    cars,
    addCar,
    editCar,
    removeCar,
  };
};

export default useCars;

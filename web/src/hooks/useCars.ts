import { useReactiveVar } from '@apollo/client';
import { carsVar } from '../client';
import { useListCarsQuery } from '../types/generated-types-and-hooks';

const useCars = () => {
  useListCarsQuery();
  return useReactiveVar(carsVar);
};

export default useCars;

import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { Car, TypedTypePolicies } from './types/generated-types-and-hooks';

export const carsVar = makeVar<Car[]>([]);

export const addLocalCar = (car: Car) => carsVar([...carsVar(), car]);

export const editLocalCar = (car: Car) =>
  carsVar([...carsVar().filter((c) => c.id !== car.id), car]);

export const removeLocalCar = (car: Car) =>
  carsVar([...carsVar().filter((c) => c.id !== car.id)]);

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      localCars: {
        read: carsVar,
      },
    },
  },
};

export const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache({
    typePolicies,
  }),
});

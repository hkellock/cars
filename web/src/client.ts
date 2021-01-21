import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { Car, TypedTypePolicies } from './types/generated-types-and-hooks';

export const carsVar = makeVar<Car[]>([]);

export const addLocalCar = (car: Car) => carsVar([...carsVar(), car]);

export const editLocalCar = (car: Car) =>
  carsVar([...carsVar().filter((c) => c.id !== car.id), car]);

export const removeLocalCar = (car: Car) =>
  carsVar([...carsVar().filter((c) => c.id !== car.id)]);

export type LocalUser = {
  username: string;
  carIds: string[];
  accessToken: string;
};

export const userVar = makeVar<LocalUser | null>(null);

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      localCars: {
        read: carsVar,
      },
      localUser: {
        read: userVar,
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

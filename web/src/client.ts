import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  Car,
  TypedTypePolicies,
  User,
} from './types/generated-types-and-hooks';

export const carsVar = makeVar<Car[]>([]);

export const addLocalCar = (car: Car) => carsVar([...carsVar(), car]);

export const editLocalCar = (car: Car) =>
  carsVar([...carsVar().filter((c) => c.id !== car.id), car]);

export const removeLocalCar = (car: Car) =>
  carsVar([...carsVar().filter((c) => c.id !== car.id)]);

type LocalUser = {
  username: string;
  carIds: string[];
};

export const userVar = makeVar<LocalUser | null>(null);

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      localCars: {
        read: carsVar,
      },
      profile: {
        read: userVar,
        merge: (_, incoming: User) =>
          userVar({
            username: incoming.username,
            carIds: incoming.cars.map((c) => c.id),
          }),
      },
    },
  },
};

const httpLink = createHttpLink({ uri: 'http://localhost:8000/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies,
  }),
});

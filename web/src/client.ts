import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  Reference,
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
      cars: {
        read: carsVar,
        merge: (_, incoming: Reference[], { readField }) => {
          // TODO: How should this really be done?
          const mapped = incoming.map(
            (carReference) =>
              ({
                id: readField('id', carReference),
                brand: readField('brand', carReference),
                model: readField('model', carReference),
                type: readField('type', carReference),
                price: readField('price', carReference),
                yearlyTax: readField('yearlyTax', carReference),
                wltpConsumption: readField('wltpConsumption', carReference),
              } as Car),
          );
          return carsVar(mapped);
        },
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
  connectToDevTools: true,
});

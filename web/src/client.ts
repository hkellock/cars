import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  Car,
  ListCarsDocument,
  TypedTypePolicies,
  User,
} from './types/generated-types-and-hooks';

type LocalUser = {
  username: string;
  carIds: string[];
};

export const userVar = makeVar<LocalUser | null>(null);

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      cars: {
        merge: false,
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

export const updateCachedCars = (cars: Car[]) =>
  client.writeQuery({
    query: ListCarsDocument,
    data: {
      cars,
    },
  });

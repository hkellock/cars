import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  Car,
  ListCarsDocument,
  TypedTypePolicies,
} from './types/generated-types-and-hooks';

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      cars: {
        merge: false,
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
    data: { cars },
  });

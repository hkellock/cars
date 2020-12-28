import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Car = {
  __typename?: 'Car';
  id: Scalars['String'];
  brand: Scalars['String'];
  model: Scalars['String'];
  type: Scalars['String'];
  price: Scalars['Float'];
  yearlyTax: Scalars['Float'];
  wltpConsumption: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  cars: Array<Car>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCar: Car;
  removeCar: Scalars['String'];
};


export type MutationCreateCarArgs = {
  input: CarInput;
};


export type MutationRemoveCarArgs = {
  id: Scalars['String'];
};

export type CarInput = {
  brand: Scalars['String'];
  model: Scalars['String'];
  type: CarType;
  price: Scalars['Float'];
  yearlyTax: Scalars['Float'];
  wltpConsumption: Scalars['Float'];
};

export enum CarType {
  Electric = 'Electric',
  Petrol = 'Petrol',
  Diesel = 'Diesel'
}

export type ListCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCarsQuery = (
  { __typename?: 'Query' }
  & { cars: Array<(
    { __typename?: 'Car' }
    & Pick<Car, 'id' | 'brand' | 'model' | 'type' | 'price' | 'yearlyTax' | 'wltpConsumption'>
  )> }
);

export type SaveCarMutationVariables = Exact<{
  car: CarInput;
}>;


export type SaveCarMutation = (
  { __typename?: 'Mutation' }
  & { createCar: (
    { __typename?: 'Car' }
    & Pick<Car, 'brand' | 'model' | 'type' | 'price' | 'yearlyTax' | 'wltpConsumption'>
  ) }
);


export const ListCarsDocument = gql`
    query listCars {
  cars {
    id
    brand
    model
    type
    price
    yearlyTax
    wltpConsumption
  }
}
    `;

/**
 * __useListCarsQuery__
 *
 * To run a query within a React component, call `useListCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCarsQuery(baseOptions?: Apollo.QueryHookOptions<ListCarsQuery, ListCarsQueryVariables>) {
        return Apollo.useQuery<ListCarsQuery, ListCarsQueryVariables>(ListCarsDocument, baseOptions);
      }
export function useListCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCarsQuery, ListCarsQueryVariables>) {
          return Apollo.useLazyQuery<ListCarsQuery, ListCarsQueryVariables>(ListCarsDocument, baseOptions);
        }
export type ListCarsQueryHookResult = ReturnType<typeof useListCarsQuery>;
export type ListCarsLazyQueryHookResult = ReturnType<typeof useListCarsLazyQuery>;
export type ListCarsQueryResult = Apollo.QueryResult<ListCarsQuery, ListCarsQueryVariables>;
export const SaveCarDocument = gql`
    mutation saveCar($car: CarInput!) {
  createCar(input: $car) {
    brand
    model
    type
    price
    yearlyTax
    wltpConsumption
  }
}
    `;
export type SaveCarMutationFn = Apollo.MutationFunction<SaveCarMutation, SaveCarMutationVariables>;

/**
 * __useSaveCarMutation__
 *
 * To run a mutation, you first call `useSaveCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCarMutation, { data, loading, error }] = useSaveCarMutation({
 *   variables: {
 *      car: // value for 'car'
 *   },
 * });
 */
export function useSaveCarMutation(baseOptions?: Apollo.MutationHookOptions<SaveCarMutation, SaveCarMutationVariables>) {
        return Apollo.useMutation<SaveCarMutation, SaveCarMutationVariables>(SaveCarDocument, baseOptions);
      }
export type SaveCarMutationHookResult = ReturnType<typeof useSaveCarMutation>;
export type SaveCarMutationResult = Apollo.MutationResult<SaveCarMutation>;
export type SaveCarMutationOptions = Apollo.BaseMutationOptions<SaveCarMutation, SaveCarMutationVariables>;
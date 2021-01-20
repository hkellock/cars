import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
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

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  cars: Array<Car>;
};

export type AuthLogin = {
  __typename?: 'AuthLogin';
  access_token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  profile: User;
  cars: Array<Car>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCar: Car;
  editCar: Car;
  removeCar: Scalars['String'];
  login: AuthLogin;
};


export type MutationCreateCarArgs = {
  input: CarInput;
};


export type MutationEditCarArgs = {
  input: CarInput;
  id: Scalars['String'];
};


export type MutationRemoveCarArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  credentials: LoginCredentials;
};

export type CarInput = {
  brand: Scalars['String'];
  model: Scalars['String'];
  type: CarType;
  price: Scalars['Float'];
  yearlyTax: Scalars['Float'];
  wltpConsumption: Scalars['Float'];
};

export type LoginCredentials = {
  username: Scalars['String'];
  idToken: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  credentials: LoginCredentials;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthLogin' }
    & Pick<AuthLogin, 'access_token'>
  ) }
);

export type ListCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCarsQuery = (
  { __typename?: 'Query' }
  & { cars: Array<(
    { __typename?: 'Car' }
    & Pick<Car, 'id' | 'brand' | 'model' | 'type' | 'price' | 'yearlyTax' | 'wltpConsumption'>
  )> }
);

export type RemoveCarMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveCarMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCar'>
);

export type AddCarMutationVariables = Exact<{
  car: CarInput;
}>;


export type AddCarMutation = (
  { __typename?: 'Mutation' }
  & { createCar: (
    { __typename?: 'Car' }
    & Pick<Car, 'id' | 'brand' | 'model' | 'type' | 'price' | 'yearlyTax' | 'wltpConsumption'>
  ) }
);

export type ModifyCarMutationVariables = Exact<{
  id: Scalars['String'];
  car: CarInput;
}>;


export type ModifyCarMutation = (
  { __typename?: 'Mutation' }
  & { editCar: (
    { __typename?: 'Car' }
    & Pick<Car, 'id' | 'brand' | 'model' | 'type' | 'price' | 'yearlyTax' | 'wltpConsumption'>
  ) }
);


export const LoginDocument = gql`
    mutation Login($credentials: LoginCredentials!) {
  login(credentials: $credentials) {
    access_token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ListCarsDocument = gql`
    query ListCars {
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
export const RemoveCarDocument = gql`
    mutation RemoveCar($id: String!) {
  removeCar(id: $id)
}
    `;
export type RemoveCarMutationFn = Apollo.MutationFunction<RemoveCarMutation, RemoveCarMutationVariables>;

/**
 * __useRemoveCarMutation__
 *
 * To run a mutation, you first call `useRemoveCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCarMutation, { data, loading, error }] = useRemoveCarMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCarMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCarMutation, RemoveCarMutationVariables>) {
        return Apollo.useMutation<RemoveCarMutation, RemoveCarMutationVariables>(RemoveCarDocument, baseOptions);
      }
export type RemoveCarMutationHookResult = ReturnType<typeof useRemoveCarMutation>;
export type RemoveCarMutationResult = Apollo.MutationResult<RemoveCarMutation>;
export type RemoveCarMutationOptions = Apollo.BaseMutationOptions<RemoveCarMutation, RemoveCarMutationVariables>;
export const AddCarDocument = gql`
    mutation AddCar($car: CarInput!) {
  createCar(input: $car) {
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
export type AddCarMutationFn = Apollo.MutationFunction<AddCarMutation, AddCarMutationVariables>;

/**
 * __useAddCarMutation__
 *
 * To run a mutation, you first call `useAddCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCarMutation, { data, loading, error }] = useAddCarMutation({
 *   variables: {
 *      car: // value for 'car'
 *   },
 * });
 */
export function useAddCarMutation(baseOptions?: Apollo.MutationHookOptions<AddCarMutation, AddCarMutationVariables>) {
        return Apollo.useMutation<AddCarMutation, AddCarMutationVariables>(AddCarDocument, baseOptions);
      }
export type AddCarMutationHookResult = ReturnType<typeof useAddCarMutation>;
export type AddCarMutationResult = Apollo.MutationResult<AddCarMutation>;
export type AddCarMutationOptions = Apollo.BaseMutationOptions<AddCarMutation, AddCarMutationVariables>;
export const ModifyCarDocument = gql`
    mutation ModifyCar($id: String!, $car: CarInput!) {
  editCar(id: $id, input: $car) {
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
export type ModifyCarMutationFn = Apollo.MutationFunction<ModifyCarMutation, ModifyCarMutationVariables>;

/**
 * __useModifyCarMutation__
 *
 * To run a mutation, you first call `useModifyCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyCarMutation, { data, loading, error }] = useModifyCarMutation({
 *   variables: {
 *      id: // value for 'id'
 *      car: // value for 'car'
 *   },
 * });
 */
export function useModifyCarMutation(baseOptions?: Apollo.MutationHookOptions<ModifyCarMutation, ModifyCarMutationVariables>) {
        return Apollo.useMutation<ModifyCarMutation, ModifyCarMutationVariables>(ModifyCarDocument, baseOptions);
      }
export type ModifyCarMutationHookResult = ReturnType<typeof useModifyCarMutation>;
export type ModifyCarMutationResult = Apollo.MutationResult<ModifyCarMutation>;
export type ModifyCarMutationOptions = Apollo.BaseMutationOptions<ModifyCarMutation, ModifyCarMutationVariables>;
export type CarKeySpecifier = ('id' | 'brand' | 'model' | 'type' | 'price' | 'yearlyTax' | 'wltpConsumption' | CarKeySpecifier)[];
export type CarFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	brand?: FieldPolicy<any> | FieldReadFunction<any>,
	model?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	yearlyTax?: FieldPolicy<any> | FieldReadFunction<any>,
	wltpConsumption?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('username' | 'cars' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	cars?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuthLoginKeySpecifier = ('access_token' | AuthLoginKeySpecifier)[];
export type AuthLoginFieldPolicy = {
	access_token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('profile' | 'cars' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	profile?: FieldPolicy<any> | FieldReadFunction<any>,
	cars?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createCar' | 'editCar' | 'removeCar' | 'login' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createCar?: FieldPolicy<any> | FieldReadFunction<any>,
	editCar?: FieldPolicy<any> | FieldReadFunction<any>,
	removeCar?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Car?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CarKeySpecifier | (() => undefined | CarKeySpecifier),
		fields?: CarFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	AuthLogin?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthLoginKeySpecifier | (() => undefined | AuthLoginKeySpecifier),
		fields?: AuthLoginFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	}
};
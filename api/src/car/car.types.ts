import { registerEnumType } from '@nestjs/graphql';

export enum CarType {
  Electric = 'Electric',
  Petrol = 'Petrol',
  Diesel = 'Diesel',
}

registerEnumType(CarType, {
  name: 'CarType',
});

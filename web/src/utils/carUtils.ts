import { CarType } from '../types/generated-types-and-hooks';
import { Option } from '../components/common/SelectControl';
import type { ListCar } from '../hooks/useCars';

// Mappers

export const mapCarToOption = (car: ListCar): Option => ({
  value: car.id,
  label: `${car.brand} ${car.model}`,
});

// Filters

export const filterForElectric = (car: ListCar): boolean =>
  car.type === CarType.Electric;
export const filterOutElectric = (car: ListCar): boolean =>
  car.type !== CarType.Electric;

// Component utils

export const priceToString = (price?: number) =>
  price?.toLocaleString('fi-FI', {
    style: 'currency',
    currency: 'EUR',
  });

export const carToConsumptionString = (car?: ListCar) =>
  car
    ? `${car.wltpConsumption.toLocaleString('fi-FI')} ${
        car.type === CarType.Electric ? 'kWh/100km' : 'l/100km'
      }`
    : '';

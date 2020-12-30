import { Divider } from '@material-ui/core';
import React, { Dispatch, SetStateAction } from 'react';
import { Car } from '../../types/generated-types-and-hooks';
import {
  mapCarToOption,
  priceToString,
  carToConsumptionString,
} from '../../utils/carUtils';
import SelectControl from '../common/SelectControl';

export type EnrichedCar = Car & {
  priceAfterSubsidies?: number;
  drivePrice?: number;
};

type CarColumnsProps = {
  cars: EnrichedCar[];
  yearlyDrive: number;
  setCar: Dispatch<SetStateAction<EnrichedCar | undefined>>;
  car?: EnrichedCar;
  comparisonCar?: EnrichedCar;
};

const CarColumns = ({
  cars,
  yearlyDrive,
  car,
  setCar,
  comparisonCar,
}: CarColumnsProps) => {
  const carToPricePerYear = (car?: EnrichedCar) =>
    (car?.yearlyTax ?? 0) + ((car?.drivePrice ?? 0) * yearlyDrive) / 100;

  return [
    <SelectControl
      key="selectcar"
      label="Select car"
      value={car?.id ?? ''}
      setValue={(id) => setCar(cars.find((car) => car.id === id))}
      options={cars.map(mapCarToOption)}
    />,
    <p key="price">{priceToString(car?.price)}</p>,
    <p key="priceAfterSubs">{priceToString(car?.priceAfterSubsidies)}</p>,
    <p key="tax">{priceToString(car?.yearlyTax)}/vuosi</p>,
    <p key="consumption">{carToConsumptionString(car)}</p>,
    <p key="drivePrice">{priceToString(car?.drivePrice)}/100km</p>,
    <p key="yearlyPrice">{priceToString(carToPricePerYear(car))}</p>,
    <Divider variant="fullWidth" style={{ width: '100%' }} />,
    <p key="priceDifference">
      {comparisonCar
        ? priceToString(
            (car?.priceAfterSubsidies ?? 0) -
              (comparisonCar.priceAfterSubsidies ?? 0),
          )
        : ''}
    </p>,
    <p key="yearlyDifference">
      {comparisonCar
        ? `${priceToString(
            carToPricePerYear(comparisonCar) - (carToPricePerYear(car) ?? 0),
          )}/vuosi`
        : ''}
    </p>,
  ];
};

export default CarColumns;

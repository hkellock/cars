import { useReactiveVar } from '@apollo/client';
import { Divider, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { carsVar } from '../../client';
import {
  Car,
  CarType,
  useListCarsQuery,
} from '../../types/generated-types-and-hooks';
import {
  filterOutElectric,
  mapCarToOption,
  filterForElectric,
  priceToString,
  carToConsumptionString,
} from '../../utils/carUtils';
import SelectControl from '../common/SelectControl';

const Comparison: React.FC = () => {
  const [firstCar, setFirstCar] = useState<
    Car & { priceAfterSubsidies?: number; drivePrice?: number }
  >();
  const [secondCar, setSecondCar] = useState<
    Car & { priceAfterSubsidies?: number; drivePrice?: number }
  >();
  const [yearlyDrive, setYearlyDrive] = useState(10000);

  const { loading, error, data } = useListCarsQuery({
    onCompleted: (query) => carsVar(query.cars),
  });

  const reactiveCars = useReactiveVar(carsVar) ?? [];

  const cars = reactiveCars.map((car) => ({
    ...car,
    priceAfterSubsidies: car.price - (car.type === CarType.Electric ? 2000 : 0),
    drivePrice:
      car.wltpConsumption * (car.type === CarType.Electric ? 0.14 : 1.4),
  }));
  const firstCarPricePerYear =
    (firstCar?.yearlyTax ?? 0) +
    ((firstCar?.drivePrice ?? 0) * yearlyDrive) / 100;
  const secondCarPricePerYear =
    (secondCar?.yearlyTax ?? 0) +
    ((secondCar?.drivePrice ?? 0) * yearlyDrive) / 100;

  return (
    <Grid container>
      <Grid item xs={12}>
        <p></p>
      </Grid>

      <Grid item xs={4}>
        <p></p>
      </Grid>
      <Grid item xs={4}>
        <SelectControl
          label="First car"
          value={firstCar?.id ?? ''}
          setValue={(id) => setFirstCar(cars.find((car) => car.id === id))}
          options={cars.filter(filterOutElectric).map(mapCarToOption)}
        />
      </Grid>
      <Grid item xs={4}>
        <SelectControl
          label="Second car"
          value={secondCar?.id ?? ''}
          setValue={(id) => setSecondCar(cars.find((car) => car.id === id))}
          options={cars.filter(filterForElectric).map(mapCarToOption)}
        />
      </Grid>

      <Grid item xs={4}>
        <p>Hinta</p>
      </Grid>
      <Grid item xs={4}>
        <p>{priceToString(firstCar?.price)}</p>
      </Grid>
      <Grid item xs={4}>
        <p>{priceToString(secondCar?.price)}</p>
      </Grid>

      <Grid item xs={4}>
        <p>Hinta tukien jälkeen</p>
      </Grid>
      <Grid item xs={4}>
        <p>{priceToString(firstCar?.priceAfterSubsidies)}</p>
      </Grid>
      <Grid item xs={4}>
        <p>{priceToString(secondCar?.priceAfterSubsidies)}</p>
      </Grid>

      <Grid item xs={4}>
        <p>Vero (per vuosi)</p>
      </Grid>
      <Grid item xs={4}>
        <p>{priceToString(firstCar?.yearlyTax)}</p>
      </Grid>
      <Grid item xs={4}>
        <p>{priceToString(secondCar?.yearlyTax)}</p>
      </Grid>

      <Grid item xs={4}>
        <p>Kulutus (per 100km)</p>
      </Grid>
      <Grid item xs={4}>
        <p>{carToConsumptionString(firstCar)}</p>
      </Grid>
      <Grid item xs={4}>
        <p>{carToConsumptionString(secondCar)}</p>
      </Grid>

      <Grid item xs={4}>
        <p>Kulutuksen hinta (per 100km)</p>
      </Grid>
      <Grid item xs={4}>
        <p>{priceToString(firstCar?.drivePrice)}/100km</p>
      </Grid>
      <Grid item xs={4}>
        <p>{priceToString(secondCar?.drivePrice)}/100km</p>
      </Grid>

      <Grid item xs={4}>
        <p>Vuosikilometrit</p>
      </Grid>
      <Grid item xs={8}>
        <p>{yearlyDrive.toLocaleString('fi-Fi')} km</p>
      </Grid>

      <Grid item xs={4}>
        <p>Vuotuiset kustannukset</p>
      </Grid>
      <Grid item xs={4}>
        <p>{priceToString(firstCarPricePerYear)}</p>
      </Grid>
      <Grid item xs={4}>
        <p>{priceToString(secondCarPricePerYear)}</p>
      </Grid>

      <Divider variant="fullWidth" style={{ width: '100%' }} />

      <Grid item xs={8}>
        <p>Sijoitus</p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {priceToString(
            (secondCar?.priceAfterSubsidies ?? 0) -
              (firstCar?.priceAfterSubsidies ?? 0),
          )}
        </p>
      </Grid>

      <Grid item xs={8}>
        <p>Tuotto-odotus (per vuosi)</p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {priceToString(
            (firstCarPricePerYear ?? 0) - (secondCarPricePerYear ?? 0),
          )}
        </p>
      </Grid>
    </Grid>
  );
};

export default Comparison;

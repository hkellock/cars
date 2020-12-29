import { useReactiveVar } from '@apollo/client';
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from '@material-ui/core';
import React, { useState } from 'react';
import { carsVar } from '../../client';
import {
  Car,
  CarType,
  useListCarsQuery,
} from '../../types/generated-types-and-hooks';

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

  const reactiveCars = useReactiveVar(carsVar);

  const cars = reactiveCars?.map((car) => ({
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
        <p> </p>
      </Grid>
      <Grid item xs={4}>
        <p></p>
      </Grid>
      <Grid item xs={4}>
        <FormControl variant="outlined" color="primary">
          <InputLabel htmlFor="firstCar">First car</InputLabel>
          <Select
            id="firstCar"
            native
            fullWidth
            label="First car"
            value={firstCar?.id}
            onChange={(e) =>
              setFirstCar(
                cars?.find((car) => car.id === (e.target.value as string)),
              )
            }
          >
            {cars
              ?.filter((car) => car.type !== CarType.Electric)
              .map((car) => (
                <option value={car.id}>{`${car.brand} ${car.model}`}</option>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl variant="outlined" color="primary">
          <InputLabel htmlFor="secondCar">Second car</InputLabel>
          <Select
            id="secondCar"
            native
            fullWidth
            label="Second car"
            value={secondCar?.id}
            onChange={(e) =>
              setSecondCar(
                cars?.find((car) => car.id === (e.target.value as string)),
              )
            }
          >
            {cars
              ?.filter((car) => car.type === CarType.Electric)
              .map((car) => (
                <option value={car.id}>{`${car.brand} ${car.model}`}</option>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <p>Hinta</p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {firstCar?.price.toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {secondCar?.price.toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>
      </Grid>
      <Grid item xs={4}>
        <p>Hinta tukien jälkeen</p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {firstCar?.priceAfterSubsidies?.toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {secondCar?.priceAfterSubsidies?.toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>
      </Grid>

      <Grid item xs={4}>
        <p>Vero (per vuosi)</p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {firstCar?.yearlyTax?.toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {secondCar?.yearlyTax?.toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>
      </Grid>
      <Grid item xs={4}>
        <p>Kulutus (per 100km)</p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {`${firstCar?.wltpConsumption?.toLocaleString('fi-FI')} ${
            firstCar?.type === CarType.Electric ? 'kWh/100km' : 'l/100km'
          }`}
        </p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {`${secondCar?.wltpConsumption?.toLocaleString('fi-FI')} ${
            secondCar?.type === CarType.Electric ? 'kWh/100km' : 'l/100km'
          }`}
        </p>
      </Grid>
      <Grid item xs={4}>
        <p>Kulutuksen hinta (per 100km)</p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {firstCar?.drivePrice?.toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
          /100km
        </p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {secondCar?.drivePrice?.toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
          /100km
        </p>
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
        <p>
          {firstCarPricePerYear?.toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {secondCarPricePerYear?.toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>
      </Grid>
      <Divider variant="fullWidth" style={{ width: '100%' }} />

      <Grid item xs={8}>
        <p>Sijoitus</p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {(
            (secondCar?.priceAfterSubsidies ?? 0) -
            (firstCar?.priceAfterSubsidies ?? 0)
          ).toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>
      </Grid>
      <Grid item xs={8}>
        <p>Tuotto-odotus (per vuosi)</p>
      </Grid>
      <Grid item xs={4}>
        <p>
          {(
            (firstCarPricePerYear ?? 0) - (secondCarPricePerYear ?? 0)
          ).toLocaleString('fi-FI', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>
      </Grid>
    </Grid>
  );
};

export default Comparison;

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
import { transpose } from '../../utils/generalUtils';
import SelectControl from '../common/SelectControl';
import GridRow, { GridRowProps } from './GridRow';

type EnrichedCar = Car & {
  priceAfterSubsidies?: number;
  drivePrice?: number;
};

const Comparison: React.FC = () => {
  const [firstCar, setFirstCar] = useState<EnrichedCar>();
  const [secondCar, setSecondCar] = useState<EnrichedCar>();
  const [yearlyDrive, setYearlyDrive] = useState(10000);

  const { loading, error, data } = useListCarsQuery({
    onCompleted: (query) => carsVar(query.cars),
  });

  const reactiveCars = useReactiveVar(carsVar) ?? [];

  const cars: EnrichedCar[] = reactiveCars.map((car) => ({
    ...car,
    priceAfterSubsidies: car.price - (car.type === CarType.Electric ? 2000 : 0),
    drivePrice:
      car.wltpConsumption * (car.type === CarType.Electric ? 0.14 : 1.4),
  }));
  const carToPricePerYear = (car?: EnrichedCar) =>
    (car?.yearlyTax ?? 0) + ((car?.drivePrice ?? 0) * yearlyDrive) / 100;

  const titleElements = [
    <p>Hinta</p>,
    <p>Hinta tukien jälkeen</p>,
    <p>Vero (per vuosi)</p>,
    <p>Kulutus (per 100km)</p>,
    <p>Kulutuksen hinta (per 100km)</p>,
    <p>Vuotuiset kustannukset</p>,
  ];
  const carToElements = (car?: EnrichedCar) => [
    <p>{priceToString(car?.price)}</p>,
    <p>{priceToString(car?.priceAfterSubsidies)}</p>,
    <p>{priceToString(car?.yearlyTax)}</p>,
    <p>{carToConsumptionString(car)}</p>,
    <p>{priceToString(car?.drivePrice)}/100km</p>,
    <p>{priceToString(carToPricePerYear(car))}</p>,
  ];
  const firstCarElements = carToElements(firstCar);
  const secondCarElements = carToElements(secondCar);

  const columns = [titleElements, firstCarElements, secondCarElements];
  const rows = transpose(columns);
  const rowData: GridRowProps[] = [...rows].map((row) => ({
    titleElement: row.shift() as JSX.Element,
    elements: [...row],
  }));

  return (
    <Grid container>
      <Grid item xs={12}>
        <p></p>
      </Grid>

      <Grid item xs={4}>
        <p>Vuosittainen ajo</p>
      </Grid>
      <Grid item xs={8}>
        <SelectControl
          label="Vuosikilometrit"
          value={yearlyDrive}
          setValue={setYearlyDrive}
          options={[10000, 20000]}
        />
      </Grid>

      <GridRow
        titleElement={<p></p>}
        elements={[
          <SelectControl
            label="First car"
            value={firstCar?.id ?? ''}
            setValue={(id) => setFirstCar(cars.find((car) => car.id === id))}
            options={cars.filter(filterOutElectric).map(mapCarToOption)}
          />,
          <SelectControl
            label="Second car"
            value={secondCar?.id ?? ''}
            setValue={(id) => setSecondCar(cars.find((car) => car.id === id))}
            options={cars.filter(filterForElectric).map(mapCarToOption)}
          />,
        ]}
      />

      {rowData.map((row) => (
        <GridRow titleElement={row.titleElement} elements={row.elements} />
      ))}

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
            (carToPricePerYear(firstCar) ?? 0) -
              (carToPricePerYear(secondCar) ?? 0),
          )}
        </p>
      </Grid>
    </Grid>
  );
};

export default Comparison;

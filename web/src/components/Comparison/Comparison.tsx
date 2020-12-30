import { useReactiveVar } from '@apollo/client';
import { Divider, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { carsVar } from '../../client';
import {
  CarType,
  useListCarsQuery,
} from '../../types/generated-types-and-hooks';
import { filterOutElectric, filterForElectric } from '../../utils/carUtils';
import { transpose } from '../../utils/generalUtils';
import SelectControl from '../common/SelectControl';
import CarColumns, { EnrichedCar } from './CarColumns';
import GridRow, { GridRowProps } from './GridRow';

const Comparison: React.FC = () => {
  const [firstCar, setFirstCar] = useState<EnrichedCar>();
  const [secondCar, setSecondCar] = useState<EnrichedCar>();
  const [yearlyDrive, setYearlyDrive] = useState(10000);

  useListCarsQuery({
    onCompleted: (query) => carsVar(query.cars),
  });

  const reactiveCars = useReactiveVar(carsVar) ?? [];

  const cars: EnrichedCar[] = reactiveCars.map((car) => ({
    ...car,
    priceAfterSubsidies: car.price - (car.type === CarType.Electric ? 2000 : 0),
    drivePrice:
      car.wltpConsumption * (car.type === CarType.Electric ? 0.14 : 1.4),
  }));

  const titleElements = [
    ' ',
    'Hinta',
    'Hinta tukien jälkeen',
    'Vero',
    'Kulutus',
    'Kulutuksen hinta',
    'Vuotuiset kustannukset',
    null,
    'Sijoitus',
    'Tuotto-odotus',
  ].map((title) =>
    title ? (
      <p>{title}</p>
    ) : (
      <Divider variant="fullWidth" style={{ width: '100%' }} />
    ),
  );

  const firstCarElements: JSX.Element[] = CarColumns({
    cars: cars.filter(filterOutElectric),
    yearlyDrive,
    setCar: setFirstCar,
    car: firstCar,
  });

  const secondCarElements: JSX.Element[] = CarColumns({
    cars: cars.filter(filterForElectric),
    yearlyDrive,
    setCar: setSecondCar,
    car: secondCar,
    comparisonCar: firstCar,
  });

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
          options={[10000, 15000, 20000, 30000, 40000]}
        />
      </Grid>

      {rowData.map((row) => GridRow({ ...row }))}
    </Grid>
  );
};

export default Comparison;

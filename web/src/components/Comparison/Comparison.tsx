import { Divider, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import useCars from '../../hooks/useCars';
import { CarType } from '../../types/generated-types-and-hooks';
import {
  filterOutElectric,
  filterForElectric,
  createFilterByIds,
} from '../../utils/carUtils';
import { transpose } from '../../utils/generalUtils';
import GridItem from '../common/GridItem';
import SelectControl from '../common/SelectControl';
import CarColumns, { EnrichedCar } from './CarColumns';
import GridRow, { GridRowProps } from './GridRow';

const YEARLY_DRIVE_OPTIONS = [5000, 10000, 15000, 20000, 30000, 40000];

const Comparison: React.FC = () => {
  const [firstCar, setFirstCar] = useState<EnrichedCar>();
  const [secondCar, setSecondCar] = useState<EnrichedCar>();
  const [yearlyDrive, setYearlyDrive] = useState(10000);

  const reactiveCars = useCars().cars;

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
    cars: cars
      .filter(filterOutElectric)
      .filter(createFilterByIds(secondCar?.compareTo?.map((ct) => ct.id))),
    yearlyDrive,
    setCar: setFirstCar,
    car: firstCar,
  });

  const secondCarElements: JSX.Element[] = CarColumns({
    cars: cars
      .filter(filterForElectric)
      .filter(createFilterByIds(firstCar?.compareTo?.map((ct) => ct.id))),
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
      <GridItem xs={12}>
        <p></p>
      </GridItem>

      <GridItem xs={4}>
        <p>Vuosittainen ajo</p>
      </GridItem>
      <GridItem xs={8}>
        <SelectControl
          label="Vuosikilometrit"
          value={yearlyDrive}
          setValue={setYearlyDrive}
          options={YEARLY_DRIVE_OPTIONS}
        />
      </GridItem>

      {rowData.map((row) => GridRow({ ...row }))}
    </Grid>
  );
};

export default Comparison;

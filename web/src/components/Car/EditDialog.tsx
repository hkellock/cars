import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { Car, CarInput, CarType } from '../../types/generated-types-and-hooks';
import useCars from '../../hooks/useCars';
import TextControl from '../common/TextControl';
import SelectControl from '../common/SelectControl';
import NumberControl from '../common/NumberControl';
import useNotifications from '../../hooks/useNotifications';

export const defaultCarInput: CarInput = {
  brand: '',
  model: '',
  type: CarType.Electric,
  price: 10000.0,
  yearlyTax: 100.0,
  wltpConsumption: 10.0,
};

type EditDialogProps = {
  car?: Car | CarInput;
  setCar: Dispatch<SetStateAction<Car | CarInput | undefined>>;
};

const isExistingCar = (car?: Car | CarInput): car is Car =>
  Boolean((car as Car)?.id);

const EditDialog: React.FC<EditDialogProps> = ({ car, setCar }) => {
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [type, setType] = React.useState(CarType.Electric);
  const [price, setPrice] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [wltpConsumption, setWltpConsumption] = React.useState(0);

  const {
    closeSnackbar,
    enqueueInfo,
    enqueueSuccess,
    enqueueError,
  } = useNotifications();

  const { addCar, editCar, removeCar } = useCars();

  useEffect(() => {
    const newInput = car ?? { ...defaultCarInput };
    setBrand(newInput.brand);
    setModel(newInput.model);
    setType(newInput.type);
    setPrice(newInput.price);
    setTax(newInput.yearlyTax);
    setWltpConsumption(newInput.wltpConsumption);
  }, [car]);

  const handleClose = () => {
    setCar(undefined);
  };

  const handleSave = async () => {
    const carInput: CarInput = {
      brand,
      model,
      type,
      price,
      yearlyTax: tax,
      wltpConsumption,
    };

    const infoKey = enqueueInfo(`Saving ${carInput.brand} ${carInput.model}`);
    try {
      isExistingCar(car)
        ? await editCar(car.id, carInput)
        : await addCar(carInput);
      enqueueSuccess(`${carInput.brand} ${carInput.model} saved.`);
      setCar(undefined);
    } catch (error) {
      enqueueError(
        `Failed to save ${carInput.brand} ${carInput.model}: ${error.message}`,
      );
    }
    closeSnackbar(infoKey);
  };

  const handleRemove = async () => {
    if (!isExistingCar(car)) return;
    const infoKey = enqueueInfo(`Removing ${car.brand} ${car.model}`);
    try {
      await removeCar(car);
      enqueueSuccess(`${car.brand} ${car.model} removed.`);
      setCar(undefined);
    } catch (error) {
      enqueueError(
        `Failed to remove ${car.brand} ${car.model}: ${error.message}`,
      );
    }
    closeSnackbar(infoKey);
  };

  return (
    <Dialog open={Boolean(car)} onClose={handleClose}>
      <DialogContent>
        <TextControl
          autoFocus
          label="Brand"
          value={brand}
          setValue={setBrand}
        />
        <TextControl label="Model" value={model} setValue={setModel} />
        <SelectControl
          label="Type"
          value={type}
          setValue={setType}
          options={Object.values(CarType)}
        />
        <NumberControl label="Price (€)" value={price} setValue={setPrice} />
        <NumberControl label="Yearly tax (€)" value={tax} setValue={setTax} />
        <NumberControl
          id="wltpConsumption"
          label={`WLTP consumption (${
            type === CarType.Electric ? 'kWh' : 'l'
          }/100km)`}
          value={wltpConsumption}
          setValue={setWltpConsumption}
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleRemove}>
          Remove
        </Button>
        <div style={{ flex: '1 0 0' }} />
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;

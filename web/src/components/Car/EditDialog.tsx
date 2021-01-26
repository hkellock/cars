import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { CarInput, CarType } from '../../types/generated-types-and-hooks';
import useCars, { ListCar } from '../../hooks/useCars';
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
  compareToIds: [],
};

type EditDialogProps = {
  car?: ListCar | CarInput;
  setCar: Dispatch<SetStateAction<ListCar | CarInput | undefined>>;
};

const isExistingCar = (car?: ListCar | CarInput): car is ListCar =>
  Boolean((car as ListCar)?.id);

const EditDialog: React.FC<EditDialogProps> = ({ car, setCar }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState(CarType.Electric);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [wltpConsumption, setWltpConsumption] = useState(0);
  const [compareTo, setCompareTo] = useState<string[]>([]);

  const {
    closeSnackbar,
    enqueueInfo,
    enqueueSuccess,
    enqueueError,
  } = useNotifications();

  const { addCar, editCar, removeCar, cars } = useCars();

  useEffect(() => {
    const newInput = isExistingCar(car)
      ? { ...car, compareToIds: car.compareTo?.map((c) => c.id) ?? [] }
      : { ...defaultCarInput };
    setBrand(newInput.brand);
    setModel(newInput.model);
    setType(newInput.type);
    setPrice(newInput.price);
    setTax(newInput.yearlyTax);
    setWltpConsumption(newInput.wltpConsumption);
    setCompareTo(newInput.compareToIds);
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
      compareToIds: compareTo,
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
        <SelectControl
          label="Compare to"
          multiple
          value={compareTo}
          setValue={setCompareTo}
          options={cars
            .filter((c) => c.type !== type)
            .map((c) => ({
              value: c.id,
              label: `${c.brand} ${c.model}`,
            }))}
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

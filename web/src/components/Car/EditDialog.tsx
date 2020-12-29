import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import {
  Car,
  CarInput,
  CarType,
  useAddCarMutation,
  useModifyCarMutation,
  useRemoveCarMutation,
} from '../../types/generated-types-and-hooks';
import { addLocalCar, editLocalCar, removeLocalCar } from '../../client';
import TextControl from '../common/TextControl';
import SelectControl from '../common/SelectControl';
import NumberControl from '../common/NumberControl';

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

const isCar = (car?: Car | CarInput): car is Car => Boolean((car as Car)?.id);

const EditDialog: React.FC<EditDialogProps> = ({ car, setCar }) => {
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [type, setType] = React.useState(CarType.Electric);
  const [price, setPrice] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [wltpConsumption, setWltpConsumption] = React.useState(0);

  useEffect(() => {
    const newInput = car ?? { ...defaultCarInput };
    setBrand(newInput.brand);
    setModel(newInput.model);
    setType(newInput.type);
    setPrice(newInput.price);
    setTax(newInput.yearlyTax);
    setWltpConsumption(newInput.wltpConsumption);
  }, [car]);

  const [addMutation, { loading, error }] = useAddCarMutation();
  const [editMutation] = useModifyCarMutation();
  const [removeMutation] = useRemoveCarMutation();

  const handleClose = () => {
    setCar(undefined);
  };

  const handleSave = () => {
    const carInput: CarInput = {
      brand,
      model,
      type,
      price,
      yearlyTax: tax,
      wltpConsumption,
    };
    isCar(car)
      ? editMutation({
          variables: { id: car.id, car: carInput },
          update: (_, result) =>
            result.data && editLocalCar(result.data.editCar),
        })
      : addMutation({
          variables: { car: carInput },
          update: (_, result) =>
            result.data && addLocalCar(result.data.createCar),
        });
    setCar(undefined);
  };

  const handleRemove = () => {
    if (!isCar(car)) return;
    removeMutation({ variables: { id: car.id } });
    removeLocalCar(car);
    setCar(undefined);
  };

  if (loading) return <p>Saving car...</p>;
  if (error) return <p>Error while saving car: {error.message}</p>;

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
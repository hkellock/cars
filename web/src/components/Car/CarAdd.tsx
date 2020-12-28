import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  Select,
  TextField,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  Send as SendIcon,
} from '@material-ui/icons';
import {
  CarInput,
  CarType,
  useSaveCarMutation,
} from '../../types/generated-types-and-hooks';

const CarAdd: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [type, setType] = React.useState(CarType.Electric);
  const [price, setPrice] = React.useState(0);
  const [yearlyTax, setYearlyTax] = React.useState(0);
  const [wltpConsumption, setWltpConsumption] = React.useState(0);

  const [saveCar, { loading, error }] = useSaveCarMutation();

  const handleAddStart = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const car: CarInput = {
      brand,
      model,
      type,
      price,
      yearlyTax,
      wltpConsumption,
    };
    saveCar({ variables: { car } });
    setOpen(false);
  };

  if (loading) return <p>Saving car...</p>;
  if (error) return <p>Error while saving car: {error.message}</p>;

  return (
    <>
      <Fab color="primary" onClick={handleAddStart}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            id="brand"
            type="text"
            fullWidth
            label="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <TextField
            id="model"
            type="text"
            fullWidth
            label="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <Select
            id="type"
            native
            fullWidth
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value as CarType)}
          >
            {Object.values(CarType).map((carType) => (
              <option value={carType}>{carType}</option>
            ))}
          </Select>
          <TextField
            id="price"
            type="number"
            fullWidth
            label="Price (€)"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <TextField
            id="yearlyTax"
            type="number"
            fullWidth
            label="Yearly tax (€)"
            value={yearlyTax}
            onChange={(e) => setYearlyTax(Number(e.target.value))}
          />
          <TextField
            id="wltpConsumption"
            type="number"
            fullWidth
            label={`"WLTP consumption (${
              type === CarType.Electric ? 'kWh' : 'l'
            }/100km)`}
            value={wltpConsumption}
            onChange={(e) => setWltpConsumption(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            <CancelIcon />
          </Button>
          <Button color="primary" onClick={handleAdd}>
            <SendIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CarAdd;

// EditCustomerModal.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Select, MenuItem } from '@mui/material';

const EditCustomerModal = ({ open, handleClose, formData, handleInputChange, handleSubmit, products }) => {
  const getProductOptions = () => {
    return products.map((product) => (
      <MenuItem key={product.id} value={product.id}>
        {product.name}
      </MenuItem>
    ));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '16px 24px', fontSize: 16 }}>Edit Customer</DialogTitle>
      <DialogContent style={{ padding: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Customer Name"
              name="name"
              value={formData.customerName}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              labelId="products-label"
              id="products"
              multiple
              fullWidth
              value={formData.products} // Ensure formData.products is always an array
              onChange={handleInputChange}
              name="products"
              renderValue={(selected) => selected.map((id) => products.find((p) => p.id === id)?.name).join(', ')}
            >
              {getProductOptions()}
            </Select>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Cost"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Incentive Percentage"
              name="incPer"
              value={formData.incPer}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Incentive Value"
              name="incValue"
              value={formData.incValue}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ backgroundColor: '#f0f0f0', padding: '8px 24px' }}>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomerModal;

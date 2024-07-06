// CreateCustomerModal.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Select, MenuItem } from '@mui/material';

const CreateCustomerModal = ({ open, handleClose, formData, handleInputChange, handleSubmit, products }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '16px 24px', fontSize: 16 }}>Create Customer</DialogTitle>
      <DialogContent style={{ padding: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Customer Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              labelId="product-label"
              id="product"
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '8px' }}
            >
              {products?.map((product) => (
                <MenuItem key={product.id} value={product.name}>
                  {product.name}
                </MenuItem>
              ))}
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
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCustomerModal;

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, InputLabel, Select, MenuItem } from '@mui/material';

export default function EditUserModal({ open, handleClose, formData, handleInputChange, handleSubmit, products }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '16px 24px', fontSize: 16 }}>Edit User</DialogTitle>
      <DialogContent style={{ padding: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              labelId="products-label"
              id="products"
              width={200}
              multiple
              fullWidth
              value={formData.products}
              onChange={handleInputChange}
              name="products"
              renderValue={(selected) => selected.join(', ')}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
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
}

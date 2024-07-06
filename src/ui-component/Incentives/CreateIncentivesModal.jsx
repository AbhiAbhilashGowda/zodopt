import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

export default function CreateIncentiveModal({ open, handleClose, formData, setFormData, handleInputChange, handleSubmit, products }) {
  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      products: selectedProductId
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '16px 24px', fontSize: 16 }}>Create Incentive</DialogTitle>
      <DialogContent style={{ padding: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth style={{ minWidth: 200, maxWidth: 400, marginBottom: '8px' }}>
              <InputLabel id="products-label">Products</InputLabel>
              <Select
                labelId="products-label"
                id="products"
                fullWidth
                value={formData.products}
                onChange={handleProductChange}
                name="products"
                renderValue={(selected) => products.find((product) => product.id === selected)?.name}
              >
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
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
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
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
}

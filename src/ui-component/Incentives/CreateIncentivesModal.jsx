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
  const getProductOptions = () => {
    return products.map((product) => (
      <MenuItem key={product.id} value={product.id}>
        {product.name}
      </MenuItem>
    ));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '16px 24px', fontSize: 16 }}>Create Incentive</DialogTitle>
      <DialogContent style={{ padding: '30px' }}>
        <Grid container spacing={2}>
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

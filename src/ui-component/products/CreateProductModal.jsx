import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';

export default function CreateProductModal({ open, handleClose, formData, handleInputChange, handleSubmit }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '16px 24px', fontSize: 16 }}>Create Product</DialogTitle>
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
              label="Description"
              name="description"
              value={formData.phone}
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

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';

const EditProductModal = ({ open, formData, handleInputChange, handleClose, handleUpdateProduct }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '16px 24px', fontSize: 16 }}>Edit Product</DialogTitle>
      <DialogContent style={{ padding: 30 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              fullWidth
              value={formData.name}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              name="description"
              label="Description"
              fullWidth
              value={formData.description}
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
        <Button onClick={handleUpdateProduct} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;

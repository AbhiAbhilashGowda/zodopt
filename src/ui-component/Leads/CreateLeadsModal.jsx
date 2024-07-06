import React from 'react';
import { Modal, Backdrop, Fade, Button, TextField, Grid, Typography, Select, MenuItem, InputLabel } from '@mui/material';

const CreateLeadsModal = ({ open, handleClose, formData, handleInputChange, handleSubmit, products, users }) => {
  const getProductOptions = () => {
    return products.map((product) => (
      <MenuItem key={product.id} value={product.id}>
        {product.name}
      </MenuItem>
    ));
  };

  const getUserOptions = () => {
    return users.map((user) => (
      <MenuItem key={user.id} value={user.id}>
        {user.name}
      </MenuItem>
    ));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-leads-modal"
      aria-describedby="modal-to-create-leads"
      closeAfterTransition
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          padding: '30px',
          borderRadius: '10px',
          width: '60%' // Adjusted width to fit two columns
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create Lead
        </Typography>
        <Grid container spacing={2}>
          {/* First Column */}
          <Grid item xs={6}>
            <InputLabel id="username-label">Select user</InputLabel>
            <Select labelId="username-label" id="username" fullWidth value={formData.username} onChange={handleInputChange} name="username">
              {getUserOptions()}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="products-label">Products</InputLabel>
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
            <InputLabel id="customer-name-label">Customer Name</InputLabel>
            <TextField fullWidth variant="outlined" name="customer_name" value={formData.customer_name} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={6}>
            <InputLabel id="customer-email-label">Customer Email</InputLabel>
            <TextField fullWidth variant="outlined" name="customer_email" value={formData.customer_email} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={6}>
            <InputLabel id="customer-company-label">Customer Company</InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              name="customer_company"
              value={formData.customer_company}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <InputLabel id="customer-phone-label">Customer Phone</InputLabel>
            <TextField fullWidth variant="outlined" name="customer_phone" value={formData.customer_phone} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={6}>
            <InputLabel id="lead-source-label">Lead Source</InputLabel>
            <TextField fullWidth variant="outlined" name="lead_source" value={formData.lead_source} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={6}>
            <InputLabel id="lead-value-label">Lead Value</InputLabel>
            <TextField fullWidth variant="outlined" name="lead_value" value={formData.lead_value} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="lead-description-label">Lead Description</InputLabel>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              name="lead_description"
              value={formData.lead_description}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <Button variant="contained" onClick={handleClose} style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateLeadsModal;

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';

const CreateCustomerModal = ({
  open,
  handleClose,
  formData,
  handleInputChange,
  handleConvertCustomer,
  products,
  handleUpdateLead,
  editLeadId
}) => {
  const getProductNames = (productId) => {
    const product = products?.find((prod) => prod.id === productId);
    return product ? product.name : '';
  };

  const getIncentiveValue = (cost, percentage) => {
    // Ensure cost and percentage are numbers
    const costNumber = parseFloat(cost) || 0;
    const percentageNumber = parseFloat(percentage) || 0;

    // Calculate the incentive value
    const incentiveValue = (percentageNumber / 100) * costNumber;

    // Return the result, formatted to two decimal places for better readability
    return incentiveValue.toFixed(2);
  };
  const handleSubmit = async () => {
    // Convert customer
    let customer_body = {
      cost: formData.lead_value,
      customerName: formData.customer_name,
      incPer: formData.incPer,
      incValue: getIncentiveValue(formData?.lead_value, formData?.incPer),
      products: formData.products,
      username: formData.username
    };
    await handleConvertCustomer(customer_body);

    // Update lead
    let lead_body = {
      ...formData,
      lead_status: 'closed'
    };
    await handleUpdateLead(editLeadId, lead_body);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle style={{ backgroundColor: '#f0f0f0', padding: '16px 24px', fontSize: 16 }}>Create Customer</DialogTitle>
      <DialogContent style={{ padding: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Customer Name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Product"
              name="products"
              value={getProductNames(formData?.products)}
              onChange={handleInputChange}
              style={{ marginBottom: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Cost"
              name="lead_value"
              value={formData.lead_value}
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
              value={getIncentiveValue(formData?.lead_value, formData?.incPer)}
              // Disabled to prevent manual input
              InputProps={{ readOnly: true }}
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

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import EditCustomerModal from './EditCustomerModal'; // Import your edit customer modal
import CreateCustomerModal from './CreateCustomerModal'; // Import your create customer modal
import PageHeader from 'ui-component/common/PageHeader';

const CustomersTable = ({ customers, products, fetchCustomers, createCustomer, updateCustomer, deleteCustomer }) => {
  const initialFormData = {
    customerName: '',
    productName: '',
    cost: '',
    incPer: '',
    incValue: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [openCreateModal, setOpenCreateModal] = useState(false); // State for Create modal
  const [openEditModal, setOpenEditModal] = useState(false); // State for Edit modal
  const [editCustomerId, setEditCustomerId] = useState(null); // State for editing customer ID

  const handleEditModalOpen = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setFormData({
        customerName: customer.customerName,
        productName: customer.productName,
        cost: customer.cost,
        incPer: customer.incPer,
        incValue: customer.incValue
      });
      setOpenEditModal(true);
      setEditCustomerId(customerId);
    }
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setEditCustomerId(null);
    setFormData(initialFormData); // Reset formData
  };

  const handleCreateModalOpen = () => {
    setOpenCreateModal(true);
    setFormData(initialFormData); // Reset formData
  };

  const handleCreateModalClose = () => {
    setOpenCreateModal(false);
    setFormData(initialFormData); // Reset formData
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreateSubmit = async () => {
    try {
      await createCustomer(formData);
      await fetchCustomers(); // Refresh customers data
      handleCreateModalClose(); // Close create modal
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await updateCustomer(editCustomerId, formData);
      await fetchCustomers(); // Refresh customers data
      handleEditModalClose(); // Close edit modal
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      await fetchCustomers(); // Refresh customers data
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', paddingTop: 10 }}>
        <span style={{ width: '100%' }}>
          <PageHeader title="Customers" />
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0' }}>
        <span>
          <input placeholder="search" style={{ height: 30, width: 250, borderRadius: 3 }} />
        </span>
        <span>
          <Button variant="contained" style={{ backgroundColor: '#111936', padding: '5px 25px' }} onClick={handleCreateModalOpen}>
            Create
          </Button>
        </span>
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Cost (₹)</TableCell>
              <TableCell>INC Per</TableCell>
              <TableCell>INC Value (₹)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell>{row.incPer}</TableCell>
                <TableCell>{row.incValue}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditModalOpen(row.id)} variant="outlined" color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteCustomer(row.id)} variant="outlined" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit customer modal */}
      <EditCustomerModal
        open={openEditModal} // Pass state to conditionally render the modal
        handleClose={handleEditModalClose} // Pass close function to modal
        formData={formData} // Pass formData to manage state in modal
        handleInputChange={handleInputChange} // Pass input change handler to update formData
        handleSubmit={handleEditSubmit} // Pass submit handler to handle form submission
        products={products} // Pass products to the modal
      />

      {/* Create customer modal */}
      <CreateCustomerModal
        open={openCreateModal} // Pass state to conditionally render the modal
        handleClose={handleCreateModalClose} // Pass close function to modal
        formData={formData} // Pass formData to manage state in modal
        handleInputChange={handleInputChange} // Pass input change handler to update formData
        handleSubmit={handleCreateSubmit} // Pass submit handler to handle form submission
        products={products} // Pass products to the modal
      />
    </React.Fragment>
  );
};

export default CustomersTable;

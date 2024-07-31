import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TablePagination } from '@mui/material';
import EditCustomerModal from './EditCustomerModal';
import CreateCustomerModal from './CreateCustomerModal';
import PageHeader from 'ui-component/common/PageHeader';
import { StyledTableCell } from './util';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomersTable = ({ customers, products, userRole, fetchCustomers, createCustomer, updateCustomer, deleteCustomer }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const initialFormData = {
    customerName: '',
    products: [],
    cost: '',
    incPer: '',
    incValue: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState(null);

  const handleEditModalOpen = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setFormData({
        customerName: customer.customerName,
        products: customer.products,
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
    setFormData(initialFormData);
  };

  const handleCreateModalOpen = () => {
    setOpenCreateModal(true);
    setFormData(initialFormData);
  };

  const handleCreateModalClose = () => {
    setOpenCreateModal(false);
    setFormData(initialFormData);
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
      await fetchCustomers();
      handleCreateModalClose();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await updateCustomer(editCustomerId, formData);
      await fetchCustomers();
      handleEditModalClose();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      await fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const getProductNames = (productId) => {
    const product = products?.find((prod) => prod.id === productId);
    return product ? product?.name : '';
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(customers.length / rowsPerPage)) {
      setPage(newPage);
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
          {userRole === 'admin' && (
            <Button variant="contained" style={{ backgroundColor: '#111936', padding: '5px 25px' }} onClick={handleCreateModalOpen}>
              Create
            </Button>
          )}
        </span>
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Cost (₹)</StyledTableCell>
              <StyledTableCell>INC Per</StyledTableCell>
              <StyledTableCell>INC Value (₹)</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : customers).map((row) => (
              <TableRow key={row.id}>
                <StyledTableCell>{row.customerName}</StyledTableCell>
                <StyledTableCell>{getProductNames(row.products)}</StyledTableCell>
                <StyledTableCell>{row.cost}</StyledTableCell>
                <StyledTableCell>{row.incPer}</StyledTableCell>
                <StyledTableCell>{row.incValue}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleEditModalOpen(row.id)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCustomer(row.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={customers.length} // Fix: use customers.length here
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <EditCustomerModal
        open={openEditModal}
        handleClose={handleEditModalClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleEditSubmit}
        products={products}
      />

      <CreateCustomerModal
        open={openCreateModal}
        handleClose={handleCreateModalClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleCreateSubmit}
        products={products}
      />
    </React.Fragment>
  );
};

export default CustomersTable;

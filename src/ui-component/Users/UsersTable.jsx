import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, IconButton } from '@mui/material';
import PageHeader from 'ui-component/common/PageHeader';
import { StyledTableCell, StyledTableRow } from '../Leads/util';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal'; // Import EditUserModal
import { EditOutlined } from '@mui/icons-material';
import { firestore } from 'firebase';
import { addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UsersTable({ users, products, getUsers }) {
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page set to 5
  const [page, setPage] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false); // State for Create modal
  const [openEditModal, setOpenEditModal] = useState(false); // State for Edit modal
  const [editUserId, setEditUserId] = useState(null); // State for editing user ID

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update page when pagination changes
  };

  const visibleRows = React.useMemo(() => users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [page, rowsPerPage]);

  // Modal state and handlers
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    resetFormData();
  };

  const handleOpenEditModal = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setEditUserId(userId);
      setFormData({
        name: user.name,
        phone: user.phone,
        company: user.company,
        products: user.Products // Assuming formData.products is an array of product IDs
      });
      setOpenEditModal(true);
    }
  };

  const handleCloseEditModal = () => {
    setEditUserId(null);
    resetFormData();
    setOpenEditModal(false);
  };

  // Form state and handlers
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    products: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      phone: '',
      company: '',
      products: []
    });
  };

  const handleSubmit = async () => {
    try {
      // Create a new user object with form data
      const newUser = {
        name: formData.name,
        phone: formData.phone,
        company_name: formData.company,
        Products: formData.products // Assuming formData.products is an array of product IDs
      };

      // Add the new user document to the Firestore 'users' collection
      const docRef = await addDoc(collection(firestore, 'users'), newUser);
      console.log('Document written with ID: ', docRef.id);

      // Reset form data and close modal
      resetFormData();
      handleCloseCreateModal();
      getUsers();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  // Function to handle updating a user
  const handleUpdateUser = async () => {
    try {
      if (!editUserId) {
        console.error('Edit user ID not set.');
        return;
      }

      // Construct the document reference for the user to update
      const userDocRef = doc(firestore, 'users', editUserId);

      // Construct the updated user data
      const updatedUserData = {
        name: formData.name,
        phone: formData.phone,
        company_name: formData.company,
        Products: formData.products // Assuming formData.products is an array of product IDs
      };

      // Update the user document in Firestore
      await updateDoc(userDocRef, updatedUserData);

      // Log success message or handle UI updates as needed
      console.log('User updated successfully:', editUserId);

      // Close the edit modal after update
      handleCloseEditModal();
      getUsers(); // Refresh users data
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Function to handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      // Construct the document reference for the user to delete
      const userDocRef = doc(firestore, 'users', userId);

      // Delete the user document from Firestore
      await deleteDoc(userDocRef);

      console.log('User deleted successfully:', userId);
      getUsers(); // Refresh users data after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Function to get product names based on IDs
  const getProductNames = (productIds) => {
    return productIds?.map((productId) => {
      const product = products.find((prod) => prod.id === productId);
      return product ? product.name : '';
    });
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', paddingTop: 10 }}>
        <span style={{ width: '100%' }}>
          <PageHeader title="Users" />
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0' }}>
        <span>
          <input placeholder="search" style={{ height: 30, width: 250, borderRadius: 3 }} />
        </span>
        <span>
          <Button variant="contained" style={{ backgroundColor: '#111936', padding: '5px 25px' }} onClick={handleOpenCreateModal}>
            Create
          </Button>
        </span>
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.phone}</StyledTableCell>
                <StyledTableCell>{user.company}</StyledTableCell>
                <StyledTableCell>{getProductNames(user?.Products)?.join(', ')}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleOpenEditModal(user.id)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={users.length} // Total number of rows
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CreateUserModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        products={products}
      />

      <EditUserModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handleSubmit={handleUpdateUser}
        products={products}
      />
    </React.Fragment>
  );
}

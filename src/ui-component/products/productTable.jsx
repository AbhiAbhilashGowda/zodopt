import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  IconButton
} from '@mui/material';
import PageHeader from 'ui-component/common/PageHeader';
import { StyledTableCell, StyledTableRow } from '../Leads/util';
import CreateProductModal from './CreateProductModal';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { firestore } from 'firebase';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProductModal from './EditProductModal';

export default function ProductsTable({ products, getAllProducts, deleteProduct }) {
  const [rowsPerPage, setRowsPerPage] = useState(5); // Initialize rowsPerPage state to 5
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'products'), {
        name: formData.name,
        description: formData.description
      });
      console.log('Document written with ID: ', docRef.id);

      // Reset form data and close modal
      setFormData({ name: '', description: '' });
      getAllProducts();
      handleClose();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when products per page changes
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId);
    }
  };

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const handleOpenEditModal = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setEditProductId(productId);
      setFormData({
        name: product.name,
        description: product.description
      });
      setOpenEditModal(true);
    }
  };

  const handleCloseEditModal = () => {
    setEditProductId(null);
    setFormData({
      name: '',
      description: ''
    });
    setOpenEditModal(false);
  };

  const handleUpdateProduct = async () => {
    try {
      const productDoc = doc(firestore, 'products', editProductId);
      await updateDoc(productDoc, {
        name: formData.name,
        description: formData.description
      });
      console.log('Product updated successfully!');
      getAllProducts();
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  };
  return (
    <React.Fragment>
      {/* Header and Create Button */}
      <PageHeader title="Products" />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0' }}>
        <span>
          <input placeholder="search" style={{ height: 30, width: 250, borderRadius: 3 }} />
        </span>
        <span>
          <Button variant="contained" style={{ backgroundColor: '#111936', padding: '5px 25px' }} onClick={handleOpen}>
            Create
          </Button>
        </span>
      </div>

      {/* Table Component */}
      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : products).map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell>{product.description}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleOpenEditModal(product.id)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Create Product Modal */}
      <CreateProductModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      {/* Create Product Modal */}
      <EditProductModal
        open={openEditModal}
        formData={formData}
        handleClose={handleCloseEditModal}
        handleInputChange={handleInputChange}
        handleUpdateProduct={handleUpdateProduct}
      />
    </React.Fragment>
  );
}

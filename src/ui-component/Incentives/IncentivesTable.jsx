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
import CreateIncentiveModal from './CreateIncentivesModal';
import { StyledTableCell } from 'ui-component/Leads/util';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIncentivesModal from './EditIncentivesModal';

export default function IncentivesTable({
  incentives,
  products,
  userRole,
  fetchIncentives,
  addIncentive,
  updateIncentive,
  deleteIncentive
}) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [currentIncentive, setCurrentIncentive] = useState(null);
  const [formData, setFormData] = useState({
    products: '',
    incPer: '',
    startDate: '',
    endDate: '',
    status: ''
  });

  const initialFormData = {
    products: [],
    incPer: '',
    startDate: '',
    endDate: '',
    status: ''
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const visibleRows = React.useMemo(() => incentives.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [page, rowsPerPage]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentIncentive(null);
    setFormData({
      products: '',
      incPer: '',
      startDate: '',
      endDate: '',
      status: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (currentIncentive) {
      updateIncentive(currentIncentive.id, formData);
    } else {
      addIncentive(formData);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    deleteIncentive(id);
  };

  const getProductNames = (productId) => {
    const product = products?.find((prod) => prod.id === productId);
    return product ? product.name : '';
  };

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editIncentiveId, setEditIncentiveId] = useState(null);

  const handleEditModalOpen = (incentiveId) => {
    const incentive = incentives?.find((c) => c.id === incentiveId);
    if (incentive) {
      setFormData({
        products: incentive.products,
        incPer: incentive.incPer,
        startDate: incentive.startDate,
        endDate: incentive.endDate,
        status: incentive.status
      });
      setOpenEditModal(true);
      setEditIncentiveId(incentiveId);
    }
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setEditIncentiveId(null);
    setFormData(initialFormData);
  };

  const handleEditSubmit = async () => {
    try {
      await updateIncentive(editIncentiveId, formData);
      await fetchIncentives();
      handleEditModalClose();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', paddingTop: 10 }}>
        <span style={{ width: '100%' }}>
          <PageHeader title="Incentives" />
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0' }}>
        <span>
          <input placeholder="search" style={{ height: 30, width: 250, borderRadius: 3 }} />
        </span>
        <span>
          {userRole === 'admin' && (
            <Button variant="contained" style={{ backgroundColor: '#111936', padding: '5px 25px' }} onClick={handleOpen}>
              Create
            </Button>
          )}
        </span>
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>INC Per</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows?.map((incentive) => (
              <TableRow key={incentive.id}>
                <StyledTableCell>{getProductNames(incentive?.products)}</StyledTableCell>
                <StyledTableCell>{incentive.incPer}</StyledTableCell>
                <StyledTableCell>{incentive.startDate}</StyledTableCell>
                <StyledTableCell>{incentive.endDate}</StyledTableCell>
                <StyledTableCell>{incentive.status}</StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label="edit" onClick={() => handleEditModalOpen(incentive.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(incentive.id)}>
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
        count={incentives.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CreateIncentiveModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        products={products}
      />

      <EditIncentivesModal
        open={openEditModal}
        handleClose={handleEditModalClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleEditSubmit}
        products={products}
      />
    </React.Fragment>
  );
}

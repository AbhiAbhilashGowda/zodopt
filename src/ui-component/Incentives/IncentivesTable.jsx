import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import PageHeader from 'ui-component/common/PageHeader';
import CreateIncentiveModal from './CreateIncentivesModal';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { firestore } from 'firebase';
import { StyledTableCell } from 'ui-component/Leads/util';

export default function IncentivesTable({ incentives, products, getIncentives }) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  // Initialize formData state
  const [formData, setFormData] = useState({
    productName: '',
    incPer: '',
    startDate: '',
    endDate: '',
    status: ''
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const visibleRows = React.useMemo(() => incentives.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [page, rowsPerPage]);

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
      // Add a new document with generated ID to "incentives" collection
      const docRef = await addDoc(collection(firestore, 'incentives'), {
        productName: formData.productName,
        incPer: formData.incPer,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status
      });
      console.log('Document written with ID: ', docRef.id);
      getIncentives(); // Fetch incentives again to update the list
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error adding document: ', error);
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
          <Button variant="contained" style={{ backgroundColor: '#111936', padding: '5px 25px' }} onClick={handleOpen}>
            Create
          </Button>
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
            {visibleRows.map((incentive) => (
              <TableRow key={incentive.productName}>
                <StyledTableCell>{incentive.productName}</StyledTableCell>
                <StyledTableCell>{incentive.incPer}</StyledTableCell>
                <StyledTableCell>{incentive.startDate}</StyledTableCell>
                <StyledTableCell>{incentive.endDate}</StyledTableCell>
                <StyledTableCell>{incentive.status}</StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => console.log(`Edit ${incentive.productName}`)} variant="outlined" color="primary">
                    Edit
                  </Button>
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
    </React.Fragment>
  );
}

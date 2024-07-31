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
import { StyledTableCell, StyledTableRow, assignedStatusColors, statusColors } from './util';
import CreateLeads from './CreateLeadsModal';
import EditLeadsModal from './EditLeadsModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import AssignUserModal from './AssignUserModal';
import CreateCustomerModal from 'ui-component/customers/CreateCustomerModal';

const AllLeads = ({
  leads,
  products,
  users,
  userRole,
  incentives,
  handleCreateLead,
  handleUpdateLead,
  handleDeleteLead,
  handleConvertCustomer
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false); // State for Create modal
  const [openEditModal, setOpenEditModal] = useState(false); // State for Edit modal
  const [editLeadId, setEditLeadId] = useState(null); // State for editing lead ID
  const [openAssignModal, setOpenAssignModal] = useState(false); // State for assign user modal
  const [openCustomerModal, setOpenCustomerModal] = useState(false); // State for assign user modal

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    customer_company: '',
    products: '',
    username: '',
    lead_source: '',
    lead_status: 'new',
    lead_value: '',
    lead_description: '',
    assigned_status: 'unassigned'
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenCreateModal = () => setOpenCreateModal(true);

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    resetFormData();
  };

  const handleOpenAssignModal = (leadId) => {
    const lead = leads.find((lead) => lead.id === leadId);
    if (lead) {
      setEditLeadId(leadId);
      setFormData({
        customer_name: lead.customer_name,
        customer_phone: lead.customer_phone,
        customer_email: lead.customer_email,
        customer_company: lead.customer_company,
        products: lead.products,
        username: lead.username,
        lead_source: lead.lead_source,
        lead_status: lead.lead_status,
        lead_value: lead.lead_value,
        lead_description: lead.lead_description,
        assigned_status: lead.assigned_status
      });
      setOpenAssignModal(true);
    }
  };

  const handleCloseAssignModal = () => {
    setOpenAssignModal(false);
    resetFormData();
  };

  const handleOpenEditModal = (leadId) => {
    const lead = leads.find((lead) => lead.id === leadId);
    if (lead) {
      setEditLeadId(leadId);
      setFormData({
        customer_name: lead.customer_name,
        customer_phone: lead.customer_phone,
        customer_email: lead.customer_email,
        customer_company: lead.customer_company,
        products: lead.products,
        username: lead.username,
        lead_source: lead.lead_source,
        lead_status: lead.lead_status,
        lead_value: lead.lead_value,
        lead_description: lead.lead_description,
        assigned_status: lead.assigned_status
      });
      setOpenEditModal(true);
    }
  };

  const handleCloseEditModal = () => {
    setEditLeadId(null);
    resetFormData();
    setOpenEditModal(false);
  };

  // Customer modal
  console.log('incentives', incentives);
  const handleOpenCustomerModal = (leadId) => {
    const lead = leads.find((lead) => lead.id === leadId);

    if (lead) {
      const incentive = incentives.find((inc) => inc.products === lead.products) ?? '';

      // Set form data
      setEditLeadId(leadId);
      setFormData({
        customer_name: lead.customer_name,
        customer_phone: lead.customer_phone,
        customer_email: lead.customer_email,
        customer_company: lead.customer_company,
        products: lead.products,
        username: lead.username,
        lead_source: lead.lead_source,
        lead_status: lead.lead_status,
        lead_value: lead.lead_value,
        lead_description: lead.lead_description,
        assigned_status: lead.assigned_status,
        incPer: incentive?.incPer || '' // Default to empty string if not found
      });
      setOpenCustomerModal(true);
    }
  };

  const handleCloseCustomerModal = () => {
    setEditLeadId(null);
    resetFormData();
    setOpenCustomerModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetFormData = () => {
    setFormData({
      customer_name: '',
      customer_phone: '',
      customer_email: '',
      customer_company: '',
      products: '',
      username: '',
      lead_source: '',
      lead_status: 'new',
      lead_value: '',
      lead_description: '',
      assigned_status: 'unassigned'
    });
  };

  const handleCreateLeadSubmit = () => {
    handleCreateLead(formData);
    handleCloseCreateModal();
  };

  const handleUpdateLeadSubmit = () => {
    handleUpdateLead(editLeadId, formData);
    handleCloseEditModal();
  };

  const getProductNames = (productId) => {
    const product = products?.find((prod) => prod.id === productId);
    return product ? product.name : '';
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : '';
  };

  if (!leads || leads.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex', paddingTop: 10 }}>
        <span style={{ width: '100%' }}>
          <PageHeader title="Leads" />
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
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell>Lead Status</StyledTableCell>
              <StyledTableCell>Assigned Status</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((lead) => (
              <StyledTableRow key={lead.id}>
                <StyledTableCell>{getUserName(lead.username)}</StyledTableCell>
                <StyledTableCell>{getProductNames(lead.products)}</StyledTableCell>
                <StyledTableCell style={{ color: statusColors[lead.lead_status?.toLowerCase()] }}>{lead.lead_status}</StyledTableCell>
                <StyledTableCell style={{ color: assignedStatusColors[lead.assigned_status?.toLowerCase()] }}>
                  {lead.assigned_status}
                </StyledTableCell>
                <StyledTableCell>{lead.customer_name}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleOpenEditModal(lead.id)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  {userRole === 'admin' && (
                    <>
                      <IconButton onClick={() => handleDeleteLead(lead.id)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleOpenAssignModal(lead.id)} aria-label="assign">
                        <PersonIcon />
                      </IconButton>
                    </>
                  )}
                  {lead?.lead_status !== 'closed' && (
                    <Button variant="text" color="primary" style={{ paddingLeft: 10 }} onClick={() => handleOpenCustomerModal(lead.id)}>
                      Convert
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={leads.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CreateLeads
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        handleInputChange={handleInputChange}
        handleSubmit={handleCreateLeadSubmit}
        formData={formData}
        products={products}
        users={users}
      />

      <EditLeadsModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        handleInputChange={handleInputChange}
        handleSubmit={handleUpdateLeadSubmit}
        formData={formData}
        products={products}
        users={users}
      />
      <AssignUserModal
        open={openAssignModal}
        handleClose={handleCloseAssignModal}
        handleInputChange={handleInputChange}
        handleSubmit={handleUpdateLead}
        formData={formData}
        users={users}
        leadId={editLeadId}
      />

      <CreateCustomerModal
        open={openCustomerModal}
        handleClose={handleCloseCustomerModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleConvertCustomer={handleConvertCustomer}
        handleUpdateLead={handleUpdateLead}
        products={products}
        editLeadId={editLeadId}
      />
    </React.Fragment>
  );
};

export default AllLeads;

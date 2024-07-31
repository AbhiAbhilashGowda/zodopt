import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AssignUserModal = ({ open, handleClose, handleInputChange, handleSubmit, formData, users, leadId }) => {
  const handleAssignUser = () => {
    let body = {
      ...formData,
      assigned_status: 'assigned'
    };
    handleSubmit(leadId, body);
    handleClose();
  };

  console.log('formData', formData);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Assign User</DialogTitle>
      <DialogContent style={{ padding: 20 }}>
        <FormControl style={{ width: 300 }}>
          <InputLabel id="user-select-label">Select User</InputLabel>
          <Select labelId="user-select-label" value={formData.username} onChange={handleInputChange} name="username">
            {users?.map((user) => (
              <MenuItem key={user?.id} value={user?.id}>
                {user?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleAssignUser} variant="contained" color="primary">
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignUserModal;

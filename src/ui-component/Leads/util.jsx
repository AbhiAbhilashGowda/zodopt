import { TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const statusColors = {
  new: '#FFC107',
  attempted_to_contact: '#03A9F4',
  contact_in_failure: '#4CAF50',
  contacted: '#F44336',
  junk_lead: '#9C27B0',
  lost_lead: '#673AB7',
  not_contacted: '#2196F3',
  pre_qualified: '#009688',
  disqualified: '#FF5722'
};

export const assignedStatusColors = {
  assigned: '#4CAF50',
  unassigned: '#F44336' 
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

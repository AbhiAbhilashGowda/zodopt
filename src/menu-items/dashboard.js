// assets
import { IconDashboard } from '@tabler/icons-react';
import DashboardIcon from '@mui/icons-material/Dashboard';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: DashboardIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

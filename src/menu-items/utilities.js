import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DashboardIcon from '@mui/icons-material/Dashboard';

const utilities = {
  id: 'list',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: DashboardIcon,
      breadcrumbs: false
    },
    {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: 'products',
      icon: InventoryIcon,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: 'users',
      icon: PeopleIcon,
      breadcrumbs: false
    },
    {
      id: 'leads',
      title: 'Leads',
      type: 'item',
      url: 'leads',
      icon: LeaderboardIcon,
      breadcrumbs: false
    },
    {
      id: 'customers',
      title: 'Customers',
      type: 'item',
      url: 'customers',
      icon: PeopleIcon,
      breadcrumbs: false
    },
    {
      id: 'incentives',
      title: 'Incentives',
      type: 'item',
      url: 'incentives',
      icon: CurrencyRupeeIcon,
      breadcrumbs: false
    }
  ]
};

export default utilities;

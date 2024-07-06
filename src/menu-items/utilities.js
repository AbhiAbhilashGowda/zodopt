// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  type: 'group',
  children: [
    {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/utils/products',
      icon: InventoryIcon,
      breadcrumbs: false
    },
    {
      id: 'Users',
      title: 'Users',
      type: 'item',
      url: '/utils/users',
      icon: PeopleIcon,
      breadcrumbs: false
    },
    {
      id: 'Leads',
      title: 'Leads',
      type: 'item',
      url: '/utils/leads',
      icon: LeaderboardIcon,
      breadcrumbs: false
    },
    {
      id: 'customers',
      title: 'Customers',
      type: 'item',
      url: '/utils/customers',
      icon: PeopleIcon,
      breadcrumbs: false
    },
    {
      id: 'incentives',
      title: 'Incentives',
      type: 'item',
      url: '/utils/incentives',
      icon: CurrencyRupeeIcon,
      breadcrumbs: false
    }
  ]
};

export default utilities;

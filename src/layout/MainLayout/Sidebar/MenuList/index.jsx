import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const roleDetails = useSelector((state) => state.authReducer.userDetails?.roleDetails);

  // Function to filter menu items based on user roles
  const filterMenuItems = (items) => {
    const userModules = roleDetails?.modules || [];
    return items
      .map((item) => {
        if (item.type === 'group') {
          return {
            ...item,
            children: item.children.filter(child => userModules.includes(child.id) || (child.children && child.children.some(subChild => userModules.includes(subChild.id))))
          };
        } else {
          return userModules.includes(item.id) ? item : null;
        }
      })
      .filter(item => item !== null && (item.type !== 'group' || (item.children && item.children.length > 0)));
  };

  const navItems = filterMenuItems(menuItem.items).map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;

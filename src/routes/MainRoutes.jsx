import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import LeadsContainer from 'container/LeadsContainer';
import UsersContainer from 'container/UsersContainer';
import ProductsContainer from 'container/ProductsContainer';
import CustomersContainer from 'container/CustomersContainer';
import IncentivesContainer from 'container/IncentivesContainer';
import PrivateRoute from 'privateRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element:<PrivateRoute element={<DashboardDefault />} />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'leads',
          element: <LeadsContainer />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'users',
          element: <UsersContainer />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'products',
          element: <ProductsContainer />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'customers',
          element: <CustomersContainer />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'incentives',
          element: <IncentivesContainer />
        }
      ]
    },
  ]
};

export default MainRoutes;

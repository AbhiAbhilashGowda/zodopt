// src/App.jsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import themes from './themes'; // Adjust the path if necessary
import MainLayout from './layout/MainLayout'; // Adjust the path if necessary

// Import your page components
import Dashboard from 'views/dashboard';
import LeadsContainer from 'container/LeadsContainer';
import UsersContainer from 'container/UsersContainer';
import ProductsContainer from 'container/ProductsContainer';
import CustomersContainer from 'container/CustomersContainer';
import IncentivesContainer from 'container/IncentivesContainer';
import Login from 'views/pages/authentication3/Login3';
import Register from 'views/pages/authentication3/Register3';
import PrivateRoute from 'ui-component/PrivateRoute';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes()}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="leads" element={<LeadsContainer />} />
                <Route path="users" element={<UsersContainer />} />
                <Route path="products" element={<ProductsContainer />} />
                <Route path="incentives" element={<IncentivesContainer />} />
                <Route path="customers" element={<CustomersContainer />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

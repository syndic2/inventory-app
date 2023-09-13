import { createBrowserRouter, Navigate } from 'react-router-dom';

import DefaultLayout from './layouts/default-layout/DefaultLayout';
import AuthLayout from './layouts/auth-layout/AuthLayout';

import Login from './views/login/Login';
import SignUp from './views/sign-up/SignUp';
import Dashboard from './views/dashboard/Dashboard';
import Product from './views/product/Product';
import NotFound from './views/not-found/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      }
    ]
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/product',
        element: <Product />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;

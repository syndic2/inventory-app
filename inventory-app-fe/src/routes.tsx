import { createBrowserRouter, Navigate } from 'react-router-dom';

import DefaultLayout from './layouts/default-layout/DefaultLayout';
import AuthLayout from './layouts/auth-layout/AuthLayout';

import Login from './views/login/Login';
import SignUp from './views/sign-up/SignUp';
import Dashboard from './views/dashboard/Dashboard';
import Product from './views/product/Product';
import AddEditProduct from './views/product/add-edit-product/AddEditProduct';
import Purchase from './views/purchase/Purchase';
import AddPurchase from './views/purchase/add-purchase/AddPurchase';
import DetailPurchase from './views/purchase/detail-purchase/DetailPurchase';
import Sale from './views/sale/Sale';
import AddSale from './views/sale/add-sale/AddSale';
import HistoryTransaction from './views/history-transaction/HistoryTransaction';
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
      },
      {
        path: '/product/add',
        element: <AddEditProduct />
      },
      {
        path: '/product/edit/:product_id',
        element: <AddEditProduct />
      },
      {
        path: '/purchase',
        element: <Purchase />
      },
      {
        path: '/purchase/add',
        element: <AddPurchase />
      },
      {
        path: '/purchase/detail/:purchase_id',
        element: <DetailPurchase />
      },
      {
        path: '/sale',
        element: <Sale />
      },
      {
        path: '/sale/add',
        element: <AddSale />
      },
      {
        path: '/history-transaction',
        element: <HistoryTransaction />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;

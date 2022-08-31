import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import NotFound from './pages/Page404';
import Warehouse from './pages/Warehouse';
import WarehouseDetail from './pages/WarehouseDetail';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/warehouse',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Warehouse /> },
        { path: ':warehouseId', element: <WarehouseDetail /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/warehouse" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}

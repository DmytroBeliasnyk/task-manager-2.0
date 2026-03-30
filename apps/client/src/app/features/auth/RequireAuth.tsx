import { useAppSelector } from '@store/redux';
import { Navigate, Outlet, useLocation } from 'react-router';
import { authSelectors } from './slice/authSlice';

export const RequireAuth = () => {
  const token = useAppSelector(authSelectors.selectToken);
  const location = useLocation();

  return token ? <Outlet /> : <Navigate to="auth" state={{ from: location }} replace />;
};

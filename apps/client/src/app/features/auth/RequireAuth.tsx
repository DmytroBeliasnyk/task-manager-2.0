import { useRefreshQuery } from '@api/auth/auth';
import { useAppSelector } from '@store/redux';
import { Navigate, Outlet, useLocation } from 'react-router';
import { authSelectors } from './slice/authSlice';

export const RequireAuth = () => {
  const token = useAppSelector(authSelectors.selectToken);
  const location = useLocation();
  const { isSuccess, isLoading } = useRefreshQuery(undefined, { skip: !!token });

  if (isLoading) {
    return <h1>Loading.</h1>;
  }

  if (isSuccess || token) {
    return <Outlet />;
  }

  return <Navigate to="/auth" state={{ from: location }} replace />;
};

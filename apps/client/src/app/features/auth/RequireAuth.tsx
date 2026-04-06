import { useRefreshQuery } from '@api/auth/auth';
import { useAppSelector } from '@store/redux';
import { Navigate, Outlet, useLocation } from 'react-router';
import { authSelectors } from './slice/authSlice';

export const RequireAuth = () => {
  console.log('auth');

  const token = useAppSelector(authSelectors.selectToken);
  const location = useLocation();
  const { isLoading, isSuccess } = useRefreshQuery(undefined, { skip: !!token });

  if (isLoading && !token) {
    console.log('loading');
    return <h1>Is loading...</h1>;
  }

  if (isSuccess || token) {
    console.log('success');
    return <Outlet />;
  }

  console.log('unauthorized');

  return <Navigate to="/auth" state={{ from: location }} replace />;
};

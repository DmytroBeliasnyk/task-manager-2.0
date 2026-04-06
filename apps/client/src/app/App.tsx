import { AuthPage } from '@features/auth/AuthPage';
import { RequireAuth } from '@features/auth/RequireAuth';
import { Route, Routes } from 'react-router';
import { Dashboard } from './ui/dashboard/Dashboard';

export const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<RequireAuth />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

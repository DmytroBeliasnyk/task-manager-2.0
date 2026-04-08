import { AuthPage } from '@features/auth/AuthPage';
import { RequireAuth } from '@features/auth/RequireAuth';
import { Dashboard } from '@features/Dashboard';
import { Settings } from '@features/Settings';
import { Route, Routes } from 'react-router';
import { Layout } from './ui/layout/Layout';

export const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

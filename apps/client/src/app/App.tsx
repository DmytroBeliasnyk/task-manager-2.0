import { AuthPage } from '@features/auth/AuthPage';
import { RequireAuth } from '@features/auth/RequireAuth';
import { Route, Routes } from 'react-router';
import { Dashboard } from './features/dashboard/Dashboard';
import { Settings } from './features/settings/Settings';
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

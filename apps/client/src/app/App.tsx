import { AuthPage } from '@features/auth/AuthPage';
import { RequireAuth } from '@features/auth/RequireAuth';
import { Layout } from '@ui/layout/Layout';
import { Route, Routes } from 'react-router';

export const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Layout />} />
      </Route>
    </Routes>
  );
};

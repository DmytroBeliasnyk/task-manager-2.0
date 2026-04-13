import { PanelLayout } from '@ui/panelLayout/PanelLayout';
import { SetNewDataForm } from './components/SetNewDataForm';
import { UpdatePasswordForm } from './components/UpdatePasswordForm';

export const Settings = () => {
  return (
    <PanelLayout header={'Settings'}>
      <SetNewDataForm />
      <UpdatePasswordForm />
    </PanelLayout>
  );
};

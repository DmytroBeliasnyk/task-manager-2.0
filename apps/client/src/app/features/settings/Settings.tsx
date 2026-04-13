import { PanelLayout } from '@ui/panelLayout/PanelLayout';
import { SetNewDataForm } from './components/SetNewDataForm';

export const Settings = () => {
  return (
    <PanelLayout header={'Settings'}>
      <SetNewDataForm />
    </PanelLayout>
  );
};

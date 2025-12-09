import type { ReactNode } from 'react';
import { Button } from '@ui/Button/Button';

export const PanelLayout = ({
  children,
  buttonHandler,
  buttonText,
}: {
  children: ReactNode;
  buttonHandler: () => void;
  buttonText: string;
}) => {
  return (
    <>
      <section className="flex flex-col flex-1 justify-between gap-2 bg-secondary-bg rounded-md p-4">
        {children}
        <div className="flex justify-end">
          <Button type={'button'} onClick={buttonHandler}>
            {buttonText}
          </Button>
        </div>
      </section>
    </>
  );
};

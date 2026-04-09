export const PanelLayout = ({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <main className="flex overflow-hidden">
      <section className="bg-secondary-bg flex flex-1 flex-col justify-between gap-2 rounded-md p-4">
        <header className="border-border flex items-center justify-between gap-4 border-b pb-2 text-2xl font-semibold">
          {header}
        </header>
        <div className="scrollbar-thin scrollbar-theme size-full min-h-0 overflow-y-auto overscroll-contain pr-2">
          {children}
        </div>
      </section>
    </main>
  );
};

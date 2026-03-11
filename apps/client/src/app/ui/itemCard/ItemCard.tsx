export const ItemCard = ({
  title,
  description,
  clickHandler,
  children,
}: {
  title: string;
  description: string;
  clickHandler: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="group bg-highlite-bg flex cursor-pointer justify-between rounded-md p-2 hover:shadow-sm"
      onClick={clickHandler}
    >
      <div className="flex max-w-3/4 flex-col">
        <h3 className="text-primary-text line-clamp-1 font-semibold break-all">{title}</h3>
        <span className="text-secondary-text line-clamp-2 text-sm break-all">{description}</span>
      </div>
      <div className="flex items-center gap-4 text-xl">{children}</div>
    </div>
  );
};

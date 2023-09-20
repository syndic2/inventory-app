import { PropsWithChildren } from 'react';
import PaginatorMemo, { PaginatorProps } from './paginator/Paginator';

interface TableProps {
  isLoading?: boolean;
  titles: string[];
  paginator?: PaginatorProps;
}

const Table: React.FC<PropsWithChildren<TableProps>> = (props: PropsWithChildren<TableProps>) => {
  const {
    isLoading,
    titles,
    children,
    paginator
  } = props;

  return (
    <table className="rounded-md shadow-md w-full">
      <thead className="bg-cyan-500">
        <tr>
          {titles.map((title, index) => (
            <th
              key={index}
              className="text-white text-sm text-center font-semibold p-3"
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      {isLoading ? (
        <tbody>
          <tr>
            <td
              colSpan={titles.length}
              className="
                animate-pulse
                bg-slate-200
                w-full
                h-96
              "
            >
              <div className="flex justify-center items-center font-semibold">
                Loading...
              </div>
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody className="bg-slate-100">
          {children}
          <tr>
            <td
              colSpan={titles.length}
              className="p-6">
              <div className="flex justify-end">
                {paginator ? <PaginatorMemo {...paginator} /> : null}
              </div>
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default Table;

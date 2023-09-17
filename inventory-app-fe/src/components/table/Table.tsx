import { PropsWithChildren } from 'react';

interface TableProps {
  isLoading?: boolean;
  titles: string[];
}

const Table: React.FC<PropsWithChildren<TableProps>> = (props: PropsWithChildren<TableProps>) => {
  const {
    isLoading,
    titles,
    children
  } = props;

  return (
    <table className="rounded-md shadow-md">
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
          <td
            colSpan={100}
            className="
              animate-pulse
              bg-slate-200
              w-full
              h-96
            ">
            <div className="flex justify-center items-center font-semibold">
              Loading...
            </div>
          </td>
        </tbody>
      ) : (
        <tbody className="bg-slate-100">
          {children}
        </tbody>
      )}
    </table>
  );
};

export default Table;

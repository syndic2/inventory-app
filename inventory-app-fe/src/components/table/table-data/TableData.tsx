import React, { PropsWithChildren } from 'react';

interface TableDataProps {
  className?: string;
  style?: React.CSSProperties;
}

const TableData: React.FC<PropsWithChildren<TableDataProps>> = (props: PropsWithChildren<TableDataProps>) => {
  const {
    children,
    className,
    style
  } = props;

  return (
    <td
      className={className}
      style={style}
    >
      {children}
    </td>
  );
};

const TableDataMemo = React.memo(TableData);

export default TableDataMemo;

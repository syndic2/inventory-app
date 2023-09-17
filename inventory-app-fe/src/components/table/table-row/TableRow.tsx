import React, { PropsWithChildren } from 'react';

interface TableRowProps {
  className?: string;
  style?: React.CSSProperties;
}

const TableRow: React.FC<PropsWithChildren<TableRowProps>> = (props: PropsWithChildren<TableRowProps>) => {
  const {
    children,
    className,
    style
  } = props;

  return (
    <tr
      className={className}
      style={style}
    >
      {children}
    </tr>
  );
};

const TableRowMemo = React.memo(TableRow);

export default TableRowMemo;

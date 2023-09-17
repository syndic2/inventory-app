import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AxiosClient from '../../libs/axios-client';
import useApiIndicator from '../../hooks/api-indicator';
import { BaseResponse } from '../../api/commons/base-response';
import { GetSalesResponse } from '../../api/contracts/get-sale/get-sales.res';
import { ISale } from '../../interfaces/sale.interface';
import { toDateTime } from '../../helpers/moment';
import { toRupiahID } from '../../helpers/number-format';

import Table from '../../components/table/Table';
import TableRowMemo from '../../components/table/table-row/TableRow';
import TableDataMemo from '../../components/table/table-data/TableData';

const tableTitles = [
  'Sale Date & Time',
  'Buyer Name',
  'Total Product',
  'Total Quantity',
  'Grand Total',
  'Created At'
];

const Sale: React.FC = () => {
  const { isFetch, setIsFetch } = useApiIndicator();
  const [sales, setSales] = useState<ISale[]>([]);

  const fetchSales = useCallback(async () => {
    try {
      setIsFetch(true);

      const { data: { data } } = await AxiosClient.get<BaseResponse<GetSalesResponse>>('/sales');
      if (data) {
        setSales(data.data);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsFetch(false);
    }
  }, []);

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">
          Sales
        </span>
        <Link
          to="/sale/add"
          className="
            bg-green-500
            text-white
            text-sm
            rounded
            hover:bg-green-600
            transition
            duration-200
            p-2
          ">
          Add Sale
        </Link>
      </div>
      <Table
        isLoading={isFetch}
        titles={tableTitles}
      >
        {sales.map(sale => (
          <TableRowMemo
            key={`sale-table-item-${sale.sale_id}`}
            className="border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <TableDataMemo className="text-center p-3">
              {toDateTime(sale.sale_date_time, 'DD MMM YYYY hh:mm:ss')}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {sale.buyer_name || '-'}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {sale.total_product || '-'}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {sale.total_qty || '-'}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {toRupiahID(sale.grand_total || 0) || '-'}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {toDateTime(sale.created_at, 'DD MMM YYYY hh:mm:ss')}
            </TableDataMemo>
          </TableRowMemo>
        ))}
      </Table>
    </div>
  );
};

export default Sale;

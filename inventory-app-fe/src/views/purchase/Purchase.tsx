import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AxiosClient from '../../libs/axios-client';
import useApiIndicator from '../../hooks/api-indicator';
import { BaseResponse } from '../../api/commons/base-response';
import { GetPurchasesResponse } from '../../api/get-purchases/get-purchases.res';
import { IPurchase } from '../../interfaces/purchase.interface';
import { toDateTime } from '../../helpers/moment';
import { toRupiahID } from '../../helpers/number-format';

import Table from '../../components/table/Table';
import TableRowMemo from '../../components/table/table-row/TableRow';
import TableDataMemo from '../../components/table/table-data/TableData';

const tableTitles = [
  'Purchase Date & Time',
  'Supplier Name',
  'Total Product',
  'Total Quantity',
  'Grand Total',
  'Created At'
];

const Purchase: React.FC = () => {
  const { isFetch, setIsFetch } = useApiIndicator();
  const [purchases, setPurchases] = useState<IPurchase[]>([]);

  const fetchPurchases = useCallback(async () => {
    try {
      setIsFetch(true);

      const { data: { data } } = await AxiosClient.get<BaseResponse<GetPurchasesResponse>>('/purchases');
      if (data) {
        setPurchases(data.data);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsFetch(false);
    }
  }, []);

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">
          Products
        </span>
        <Link
          to="/purchase/add"
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
          Add Purchase
        </Link>
      </div>
      <Table
        isLoading={isFetch}
        titles={tableTitles}
      >
        {purchases.map(purchase => (
          <TableRowMemo
            key={`purchase-table-item-${purchase.purchase_id}`}
            className="border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <TableDataMemo className="text-center p-3">
              {toDateTime(purchase.purchase_date_time, 'DD MMM YYYY hh:mm:ss')}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {purchase.supplier_name || '-'}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {purchase.total_product || '-'}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {purchase.total_qty || '-'}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {toRupiahID(purchase.grand_total || 0) || '-'}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {toDateTime(purchase.created_at, 'DD MMM YYYY hh:mm:ss')}
            </TableDataMemo>
          </TableRowMemo>
        ))}
      </Table>
    </div>
  );
};

export default Purchase;

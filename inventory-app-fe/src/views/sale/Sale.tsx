import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

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
import { PaginatorProps } from '../../components/table/paginator/Paginator';

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
  const [paginationData, setPaginationData] = useState<PaginatorProps>({ currentPage: 0 });

  const fetchSales = useCallback(async (url: string = '/sales') => {
    try {
      setIsFetch(true);

      const { data: { data } } = await AxiosClient.get<BaseResponse<GetSalesResponse>>(url);
      if (data) {
        setSales(data.data);
        setPaginationData({
          currentPage: data.current_page,
          ...Math.floor(data.total / data.per_page) > 0 && {
            totalPage: data.total / data.per_page
          },
          ...data.prev_page_url && { prevUrl: data.prev_page_url },
          ...data.next_page_url && { nextUrl: data.next_page_url },
        });
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

  const onPrevNextPaginatorClick = useCallback((url: string) => {
    fetchSales(url);
  }, []);

  const onPagePaginatorClick = useCallback((page: number) => {
    fetchSales(`/sales?page=${page}`);
  }, []);

  const paginator = useMemo((): PaginatorProps => {
    return {
      ...paginationData,
      onPrevNextClick: onPrevNextPaginatorClick,
      onPageClick: onPagePaginatorClick
    };
  }, [paginationData]);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">
          Sales
        </span>
        <Link to="/sale/add">
          <div className="
            flex 
            items-center 
            gap-x-2
            bg-green-500
            rounded
            hover:bg-green-600
            transition
            duration-200
            p-3
          ">
            <AiOutlinePlus
              size={18}
              className="text-white"
            />
            <span className="text-white text-sm">
              Add Sale
            </span>
          </div>
        </Link>
      </div>
      <Table
        isLoading={isFetch}
        titles={tableTitles}
        paginator={paginator}
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

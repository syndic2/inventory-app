import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlinePlus, AiFillEye } from 'react-icons/ai';

import AxiosClient from '../../libs/axios-client';
import useApiIndicator from '../../hooks/api-indicator';
import { BaseResponse } from '../../api/commons/base-response';
import { GetPurchasesResponse } from '../../api/contracts/get-purchases/get-purchases.res';
import { IPurchase } from '../../interfaces/purchase.interface';
import { toDateTime } from '../../helpers/moment';
import { toRupiahID } from '../../helpers/number-format';

import Table from '../../components/table/Table';
import TableRowMemo from '../../components/table/table-row/TableRow';
import TableDataMemo from '../../components/table/table-data/TableData';
import { PaginatorProps } from '../../components/table/paginator/Paginator';

const tableTitles = [
  'Purchase Date & Time',
  'Supplier Name',
  'Total Product',
  'Total Quantity',
  'Grand Total',
  'Created At',
  'Action'
];

const Purchase: React.FC = () => {
  const navigate = useNavigate();
  const { isFetch, setIsFetch } = useApiIndicator();

  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const [paginationData, setPaginationData] = useState<PaginatorProps>({ currentPage: 0 });

  const fetchPurchases = useCallback(async (url: string = '/purchases') => {
    try {
      setIsFetch(true);

      const { data: { data } } = await AxiosClient.get<BaseResponse<GetPurchasesResponse>>(url);
      if (data) {
        setPurchases(data.data);
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
    fetchPurchases();
  }, []);

  const onPurchaseDetailClick = useCallback((purchaseId?: string) => {
    if (!purchaseId) return;
    navigate(`/purchase/detail/${purchaseId}`);
  }, []);

  const onPrevNextPaginatorClick = useCallback((url: string) => {
    fetchPurchases(url);
  }, []);

  const onPagePaginatorClick = useCallback((page: number) => {
    fetchPurchases(`/purchases?page=${page}`);
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
          Purchases
        </span>
        <Link to="/purchase/add">
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
              Add Purchase
            </span>
          </div>
        </Link>
      </div>
      <Table
        isLoading={isFetch}
        titles={tableTitles}
        paginator={paginator}
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
            <TableDataMemo>
              <AiFillEye
                onClick={() => onPurchaseDetailClick(purchase.purchase_id)}
                size={24}
                className="text-cyan-500 cursor-pointer hover:text-cyan-600 m-auto"
              />
            </TableDataMemo>
          </TableRowMemo>
        ))}
      </Table>
    </div>
  );
};

export default Purchase;

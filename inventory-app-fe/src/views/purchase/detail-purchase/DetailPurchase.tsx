import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import AxiosClient from '../../../libs/axios-client';
import useApiIndicator from '../../../hooks/api-indicator';
import { toDateTime } from '../../../helpers/moment';
import { toRupiahID } from '../../../helpers/number-format';
import { BaseResponse } from '../../../api/commons/base-response';
import { GetPurchaseResponse } from '../../../api/contracts/get-purchase/get-purchase.res';

import LabelMemo from '../../../components/label/Label';
import Table from '../../../components/table/Table';
import TableRowMemo from '../../../components/table/table-row/TableRow';
import TableDataMemo from '../../../components/table/table-data/TableData';

const tableTitles = [
  'Product Name',
  'Product SKU',
  'Quantity',
  'Buy Price',
  'Total'
];

const DetailPurchase: React.FC = () => {
  const { purchase_id } = useParams<{ purchase_id: string }>();
  const navigate = useNavigate();

  const { isFetch, setIsFetch } = useApiIndicator();
  const [purchase, setPurchase] = useState<GetPurchaseResponse | undefined>(undefined);

  const fetchPurchase = useCallback(async (purchaseId: String) => {
    try {
      setIsFetch(true);

      const { data: { data } } = await AxiosClient.get<BaseResponse>(`/purchases/${purchaseId}`);
      if (data) setPurchase(data);
    } catch (error: any) {
      navigate('/not-found');
    } finally {
      setIsFetch(false);
    }
  }, []);

  useEffect(() => {
    if (purchase_id) fetchPurchase(purchase_id);
  }, [purchase_id]);

  const onBackClick = useCallback(() => {
    navigate('/purchase');
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-x-4">
        <AiOutlineArrowLeft
          onClick={onBackClick}
          size={20}
          className="text-cyan-500 cursor-pointer"
        />
        <span className="text-2xl font-bold">
          Detail Purchase from {purchase?.supplier_name || '-'}
        </span>
      </div>
      <div className="flex flex-col gap-y-4 bg-white rounded-md w-full p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Purchase Date Time */}
          <div className="flex flex-col gap-y-2">
            <LabelMemo
              isLoading={isFetch}
              text={'Purchased At'}
            />
            {toDateTime(purchase?.purchase_date_time, 'DD MMM YYYY H:m:s')}
          </div>

          {/* Supplier Name */}
          <div className="flex flex-col gap-y-2">
            <LabelMemo
              isLoading={isFetch}
              text={'Supplier'}
            />
            {purchase?.supplier_name || '-'}
          </div>

          {/* Purchase Note */}
          <div className="flex flex-col gap-y-2">
            <LabelMemo
              isLoading={isFetch}
              text={'Supplier'}
            />
            {purchase?.purchase_note || '-'}
          </div>

          {/* Purchase Invoice Image */}
          <div className="flex flex-col gap-y-2">
            <LabelMemo
              isLoading={isFetch}
              text={'Purchase Invoice'}
            />
            <img
              src={purchase?.purchase_invoice_image_path}
              className="object-contain rounded-md w-64"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <LabelMemo
            isLoading={isFetch}
            text={`Products (Total: ${purchase?.total_product || 0})`}
          />
          {!purchase?.products || !purchase.products.length ? (
            <span className="text-lg text-gray-400 m-auto">
              -No Product-
            </span>
          ) : (
            <Table
              isLoading={isFetch}
              titles={tableTitles}
            >
              {purchase?.products.map(product => (
                <TableRowMemo
                  key={`purchase-product-table-item-${product.product_id}`}
                  className="border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <TableDataMemo className="text-center p-3">
                    {product.product_name || '-'}
                  </TableDataMemo>
                  <TableDataMemo className="text-center p-3">
                    {product.product_sku || '-'}
                  </TableDataMemo>
                  <TableDataMemo className="text-center p-3">
                    {product.qty || '-'}
                  </TableDataMemo>
                  <TableDataMemo className="text-center p-3">
                    {toRupiahID(product.buy_price || 0) || '-'}
                  </TableDataMemo>
                  <TableDataMemo className="text-center p-3">
                    {toRupiahID(product.total || 0) || '-'}
                  </TableDataMemo>
                </TableRowMemo>
              ))}
            </Table>
          )}
          <span className="text-lg text-gray-600 font-semibold">
            Grand Total: {toRupiahID(purchase?.grand_total || 0) || '-'}
          </span>
        </div>
      </div>
    </div >
  );
};

export default DetailPurchase;


import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from 'react-icons/ai';

import AxiosClient from '../../libs/axios-client';
import SweetAlert from '../../libs/sweet-alert';
import useApiIndicator from '../../hooks/api-indicator';
import { BaseResponse } from '../../api/commons/base-response';
import { GetProductsResponse } from '../../api/contracts/get-products/GetProducts.res';
import { IProduct } from '../../interfaces/product.interface';
import { toDateTime } from '../../helpers/moment';

import Table from '../../components/table/Table';
import TableRowMemo from '../../components/table/table-row/TableRow';
import TableDataMemo from '../../components/table/table-data/TableData';
import { PaginatorProps } from '../../components/table/paginator/Paginator';

const tableTitles = [
  'Product Name',
  'Product SKU',
  'Quantity',
  'Created At',
  'Last Updated At',
  'Action'
];

const Product: React.FC = () => {
  const navigate = useNavigate();
  const {
    isFetch,
    setIsFetch,
    isSubmit,
    setIsSubmit
  } = useApiIndicator();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [paginationData, setPaginationData] = useState<PaginatorProps>({ currentPage: 0 });

  const fetchProducts = useCallback(async (url: string = '/products') => {
    try {
      setIsFetch(true);

      const { data: { data } } = await AxiosClient.get<BaseResponse<GetProductsResponse>>(url);
      if (data) {
        setProducts(data.data);
        setPaginationData({
          currentPage: data.current_page,
          totalPage: data.total / data.per_page,
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
    fetchProducts();
  }, []);

  const onPrevNextPaginatorClick = useCallback((url: string) => {
    fetchProducts(url);
  }, []);

  const onPagePaginatorClick = useCallback((page: number) => {
    fetchProducts(`/products?page=${page}`);
  }, []);

  const paginator = useMemo((): PaginatorProps => {
    return {
      ...paginationData,
      onPrevNextClick: onPrevNextPaginatorClick,
      onPageClick: onPagePaginatorClick
    };
  }, [paginationData]);

  const onEditProductClick = useCallback(async (productId?: string) => {
    if (!productId) SweetAlert.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong. Please report this to admin'
    });
    navigate(`/product/edit/${productId}`);
  }, []);

  const onDeleteProductClick = useCallback(async (productId?: string) => {
    if (!productId) SweetAlert.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong. Please report this to admin'
    });

    try {
      setIsSubmit(true);

      const { data: { status, message } } = await AxiosClient.delete<BaseResponse>(`/products/${productId}`);
      if (status) {
        setProducts(prevState => prevState.filter(product => product.product_id !== productId));
        SweetAlert.fire({
          icon: 'success',
          text: message || ''
        });
      }
    } catch (error: any) {
      const err = error as AxiosError<BaseResponse>;
      if (err.response) {
        const { message } = err.response.data;
        SweetAlert.fire({
          icon: 'error',
          title: 'Oops...',
          text: message || 'Something went wrong. Please report this to admin'
        });
      }
    } finally {
      setIsSubmit(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">
          Products
        </span>
        <Link to="/product/add">
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
              Add Product
            </span>
          </div>
        </Link>
      </div>
      <Table
        isLoading={isFetch || isSubmit}
        titles={tableTitles}
        paginator={paginator}
      >
        {products.map(product => (
          <TableRowMemo
            key={`product-table-item-${product.product_id}`}
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
              {toDateTime(product.created_at, 'DD MMM YYYY hh:mm:ss')}
            </TableDataMemo>
            <TableDataMemo className="text-center p-3">
              {toDateTime(product.updated_at, 'DD MMM YYYY hh:mm:ss')}
            </TableDataMemo>
            <TableDataMemo className="flex justify-center items-center gap-x-4 p-3">
              <AiFillEdit
                onClick={() => onEditProductClick(product.product_id)}
                size={20}
                className="text-green-500 cursor-pointer hover:text-green-600"
              />
              <AiFillDelete
                onClick={() => onDeleteProductClick(product.product_id)}
                size={20}
                className="text-red-500 cursor-pointer hover:text-red-600"
              />
            </TableDataMemo>
          </TableRowMemo>
        ))}
      </Table>
    </div>
  );
};

export default Product;

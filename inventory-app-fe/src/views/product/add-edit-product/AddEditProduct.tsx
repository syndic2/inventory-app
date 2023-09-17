import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import AxiosClient from '../../../libs/axios-client';
import SweetAlert from '../../../libs/sweet-alert';
import useApiIndicator from '../../../hooks/api-indicator';
import { BaseResponse } from '../../../api/commons/base-response';
import { GetProductResponse } from '../../../api/contracts/get-product/get-product.res';
import { AddProductError } from '../../../api/contracts/add-product/add-product.error';

import InputMemo from '../../../components/input/Input';
import InputTextAreaMemo from '../../../components/input-text-area/InputTextArea';
import ButtonMemo from '../../../components/button/Button';
import UploadImageMemo from '../../../components/upload-image/UploadImage';

interface AddEditProductDataProps {
  product_name?: string;
  product_sku?: string;
  product_desc?: string;
  product_image?: File;
  product_image_preview_path?: string;
  qty?: number;
  sell_price?: number;
}

const AddEditProduct: React.FC = () => {
  const { product_id } = useParams<{ product_id: string }>();
  const {
    isFetch,
    setIsFetch,
    isSubmit,
    setIsSubmit
  } = useApiIndicator();

  const [addEditProductData, setAddEditProductData] = useState<AddEditProductDataProps | undefined>({
    product_name: '',
    product_sku: '',
    product_desc: '',
    qty: 1,
    sell_price: 1
  });
  const [addEditProductErrors, setAddEditProductErrors] = useState<AddProductError | undefined>();
  const [isResetPreviewImage, setIsResetPreviewImage] = useState<boolean>(false);

  const fetchProduct = useCallback(async (productId: string) => {
    try {
      setIsFetch(true);

      const { data: { data } } = await AxiosClient.get<BaseResponse<GetProductResponse>>(`/products/${productId}`);
      if (data) setAddEditProductData({
        product_name: data.product_name,
        product_sku: data.product_sku,
        product_desc: data.product_desc,
        product_image_preview_path: data.product_image_path,
        qty: data.qty,
        sell_price: data.sell_price
      });
    } catch (error: any) {
      const err = error as AxiosError<BaseResponse>;
      if (err.response) {
        const { message } = err.response.data;
        SweetAlert({
          icon: 'error',
          title: 'Oops...',
          text: message || 'Something went wrong. Try to refresh page or report to admin'
        });
      }
    } finally {
      setIsFetch(false);
    }
  }, []);

  useEffect(() => {
    if (product_id) fetchProduct(product_id);
  }, [product_id]);

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddEditProductData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }, []);

  const onUploadImage = useCallback((image: File) => {
    setAddEditProductData(prevState => ({
      ...prevState,
      product_image: image
    }))
  }, []);

  const onSubmitProduct = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmit(true);

      const formData = new FormData();
      product_id && formData.append('_method', 'PUT');
      formData.append('product_name', addEditProductData?.product_name || '');
      formData.append('product_sku', addEditProductData?.product_sku || '');
      formData.append('product_desc', addEditProductData?.product_desc || '');
      addEditProductData?.product_image && formData.append('product_image', addEditProductData?.product_image);
      formData.append('qty', addEditProductData?.qty?.toString() || '');
      formData.append('sell_price', addEditProductData?.sell_price?.toString() || '');

      const { data: { status, message } } = await AxiosClient.post<BaseResponse>(`${product_id ? `/products/${product_id}` : '/products'}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (status) {
        SweetAlert.fire({
          icon: 'success',
          text: message || ''
        });

        if (!product_id) {
          setAddEditProductData(undefined);
          setAddEditProductErrors(undefined);
          setIsResetPreviewImage(true);
        }
      }
    } catch (error: any) {
      const errors = error as AxiosError<{ message: string, errors: any }>;
      const { response } = errors;

      if (response) {
        const { message, errors } = response.data;

        if (response.status === 422) {
          setAddEditProductErrors(prevState => ({
            ...prevState,
            ...errors.product_name && { product_name: errors.product_name[0] },
            ...errors.product_sku && { product_sku: errors.product_sku[0] },
            ...errors.product_desc && { product_desc: errors.product_desc[0] },
            ...errors.qty && { qty: errors.qty[0] },
            ...errors.sell_price && { sell_price: errors.sell_price[0] }
          }));
        }

        SweetAlert.fire({
          icon: 'error',
          title: 'Oops...',
          text: message || 'Something went wrong. Please report this to admin'
        });
      }
    } finally {
      setIsSubmit(false);
    }
  }, [product_id, addEditProductData]);

  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-2xl font-bold">
        {product_id ? 'Edit Product' : 'New Product'}
      </span>
      <form
        onSubmit={onSubmitProduct}
        className="bg-white flex flex-col gap-y-4 rounded-md w-full p-6"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Product Name */}
          <InputMemo
            isLoading={isFetch || isSubmit}
            isDisabled={isFetch || isSubmit}
            isAutoFocus={true}
            labelText={'Product Name'}
            type={'text'}
            name={'product_name'}
            placeholder={'Fill product name'}
            value={addEditProductData?.product_name}
            onChange={onInputChange}
            error={addEditProductErrors?.product_name}
          />

          {/* Product SKU */}
          <InputMemo
            isLoading={isFetch || isSubmit}
            isDisabled={isFetch || isSubmit}
            labelText={'Product SKU'}
            type={'text'}
            name={'product_sku'}
            placeholder={'Fill product SKU'}
            value={addEditProductData?.product_sku}
            onChange={onInputChange}
            error={addEditProductErrors?.product_sku}
          />

          {/* Quantity */}
          <InputMemo
            isLoading={isFetch || isSubmit}
            isDisabled={isFetch || isSubmit}
            labelText={'Quantity'}
            type={'number'}
            name={'qty'}
            placeholder={'Fill product quantity'}
            min={1}
            value={addEditProductData?.qty}
            onChange={onInputChange}
            error={addEditProductErrors?.qty}
          />

          {/* Sell Price */}
          <InputMemo
            isLoading={isFetch || isSubmit}
            isDisabled={isFetch || isSubmit}
            labelText={'Sell Price'}
            type={'number'}
            name={'sell_price'}
            placeholder={'Fill product sell price'}
            min={1}
            value={addEditProductData?.sell_price}
            onChange={onInputChange}
            error={addEditProductErrors?.sell_price}
          />

          {/* Product Description */}
          <InputTextAreaMemo
            isLoading={isFetch || isSubmit}
            isDisabled={isFetch || isSubmit}
            labelText={'Product Description'}
            name={'product_desc'}
            placeholder={'Fill product description'}
            value={addEditProductData?.product_desc}
            onChange={onInputChange}
            error={addEditProductErrors?.product_desc}
          />

          {/* Product Image */}
          <UploadImageMemo
            isLoading={isFetch || isSubmit}
            isResetPreviewImage={isResetPreviewImage}
            setIsResetPreviewImage={setIsResetPreviewImage}
            labelText={'Product Image'}
            value={addEditProductData?.product_image_preview_path}
            placeholder={'Please upload your product image'}
            onUploadImageCallback={onUploadImage}
            error={addEditProductErrors?.product_image_path}
          />
        </div>
        <ButtonMemo
          isLoading={isFetch || isSubmit}
          isDisabled={isFetch || isSubmit}
          type={'submit'}
          label={'Save'}
          className="ml-auto px-4 py-2"
        />
      </form>
    </div>
  );
};

export default AddEditProduct;

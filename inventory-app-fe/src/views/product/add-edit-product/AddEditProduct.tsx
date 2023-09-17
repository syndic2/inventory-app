import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

import AxiosClient from '../../../libs/axios-client';
import SweetAlert from '../../../libs/sweet-alert';
import useApiIndicator from '../../../hooks/api-indicator';
import { BaseResponse } from '../../../api/commons/base-response';
import { AddProductError } from '../../../api/contracts/add-product/add-product.error';

import InputMemo from '../../../components/input/Input';
import InputTextAreaMemo from '../../../components/input-text-area/InputTextArea';
import UploadImageMemo from '../../../components/upload-image/UploadImage';

interface AddEditProductDataProps {
  product_name?: string;
  product_sku?: string;
  product_desc?: string;
  product_image?: File;
  qty?: number;
  sell_price?: number;
}

const AddEditProduct: React.FC = () => {
  const { isSubmit, setIsSubmit } = useApiIndicator();

  const [addEditProductData, setAddEditProductData] = useState<AddEditProductDataProps | undefined>({
    product_name: '',
    product_sku: '',
    product_desc: '',
    qty: 1,
    sell_price: 1
  });
  const [addEditProductErrors, setAddEditProductErrors] = useState<AddProductError | undefined>();
  const [isResetPreviewImage, setIsResetPreviewImage] = useState<boolean>(false);

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
      formData.append('product_name', addEditProductData?.product_name || '');
      formData.append('product_sku', addEditProductData?.product_sku || '');
      formData.append('product_desc', addEditProductData?.product_desc || '');
      addEditProductData?.product_image && formData.append('product_image', addEditProductData?.product_image);
      formData.append('qty', addEditProductData?.qty?.toString() || '');
      formData.append('sell_price', addEditProductData?.sell_price?.toString() || '');

      const { data: { status, message } } = await AxiosClient.post<BaseResponse>('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (status) {
        setAddEditProductData(undefined);
        setAddEditProductErrors(undefined);
        setIsResetPreviewImage(true);
        SweetAlert.fire({
          icon: 'success',
          text: message || ''
        });
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
  }, [addEditProductData]);

  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-2xl font-bold">
        New Product
      </span>
      <form
        onSubmit={onSubmitProduct}
        className="bg-white flex flex-col gap-y-4 rounded-md w-full p-6"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Product Name */}
          <InputMemo
            isLoading={isSubmit}
            isDisabled={isSubmit}
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
            isLoading={isSubmit}
            isDisabled={isSubmit}
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
            isLoading={isSubmit}
            isDisabled={isSubmit}
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
            isLoading={isSubmit}
            isDisabled={isSubmit}
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
            isLoading={isSubmit}
            isDisabled={isSubmit}
            labelText={'Product Description'}
            name={'product_desc'}
            placeholder={'Fill product description'}
            value={addEditProductData?.product_desc}
            onChange={onInputChange}
            error={addEditProductErrors?.product_desc}
          />

          {/* Product Image */}
          <UploadImageMemo
            isLoading={isSubmit}
            isResetPreviewImage={isResetPreviewImage}
            setIsResetPreviewImage={setIsResetPreviewImage}
            labelText={'Product Image'}
            placeholder={'Please upload your product image'}
            onUploadImageCallback={onUploadImage}
            error={addEditProductErrors?.product_image_path}
          />
        </div>
        <input
          type="submit"
          value="Save"
          className="
            bg-cyan-500
            text-white
            rounded
            outline-none
            cursor-pointer
            hover:bg-cyan-600
            transition
            duration-200
            w-fit
            ml-auto
            px-4 py-2
          "
        />
      </form>
    </div>
  );
};

export default AddEditProduct;

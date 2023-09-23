import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import { AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';

import AxiosClient from '../../../../../libs/axios-client';
import useApiIndicator from '../../../../../hooks/api-indicator';
import { IPurchaseProduct } from '../../../../../interfaces/purchase.interface';
import { BaseResponse } from '../../../../../api/commons/base-response';
import { GetProductsSelectResponse } from '../../../../../api/contracts/get-products-select/get-products-select.res';

import { AddPurchaseDataProps } from '../../AddPurchase';
import LabelMemo from '../../../../../components/label/Label';
import InputMemo from '../../../../../components/input/Input';

interface AddPurchaseProductProps {
  setAddPurchaseData: React.Dispatch<React.SetStateAction<AddPurchaseDataProps>>;
}

const AddPurchaseProduct: React.FC<AddPurchaseProductProps> = (props: AddPurchaseProductProps) => {
  const {
    setAddPurchaseData
  } = props;
  const { isFetch, setIsFetch } = useApiIndicator();

  const [addPurchaseProductsData, setAddPurchaseProductsData] = useState<IPurchaseProduct[]>([]);
  const [productsSelect, setProductsSelect] = useState<GetProductsSelectResponse[]>([]);

  const onFetchProductsSelect = useCallback(async () => {
    try {
      setIsFetch(true);

      const { data: { data } } = await AxiosClient.get<BaseResponse<GetProductsSelectResponse[]>>('/products/select');
      if (data) setProductsSelect(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsFetch(false);
    }
  }, []);

  useEffect(() => {
    onFetchProductsSelect();
  }, []);

  useEffect(() => {
    setAddPurchaseData(prevState => ({
      ...prevState,
      products: addPurchaseProductsData
    }));
  }, [addPurchaseProductsData]);

  const onAddPurchaseProductClick = useCallback(() => {
    setAddPurchaseProductsData(prevState => [...prevState, {
      qty: 0,
      buy_price: 0,
    }]);
  }, []);

  const onDeletePurchaseProductClick = useCallback((index: number) => {
    setAddPurchaseProductsData(prevState => prevState.filter((_, itemIndex) => itemIndex !== index));
  }, []);

  const AddPurchaseProductButton = useMemo((): JSX.Element => (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <AiFillPlusCircle
        onClick={onAddPurchaseProductClick}
        size={42}
        className="text-cyan-500 cursor-pointer hover:text-cyan-600"
      />
      <span className="text-lg text-gray-400 font-semibold">
        Add Product
      </span>
    </div>
  ), [onAddPurchaseProductClick]);

  const onProductSelectChange = useCallback((value: SingleValue<GetProductsSelectResponse>, index: number) => {
    setAddPurchaseProductsData(prevState => prevState.map((purchaseProduct, itemIndex) => {
      if (itemIndex !== index) return purchaseProduct;
      return {
        ...purchaseProduct,
        product_id: value?.value
      };
    }));
  }, []);

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setAddPurchaseProductsData(prevState => prevState.map((purchaseProduct, itemIndex) => {
      if (itemIndex !== index) return purchaseProduct;
      return {
        ...purchaseProduct,
        [event.target.name]: event.target.value
      };
    }));
  }, []);

  return (
    <div className="border-2 border-gray-300 rounded-md p-8">
      {addPurchaseProductsData.length === 0 ? (
        AddPurchaseProductButton
      ) : (
        <div className="flex flex-col gap-y-6">
          {addPurchaseProductsData.map((purchaseProduct, index) => (
            <div
              key={`add-purchase-product-${index}`}
              className="inline-grid grid-cols-3 gap-x-10"
            >
              {/* Products */}
              <div className="flex flex-col gap-y-2">
                <LabelMemo
                  isLoading={isFetch}
                  text={'Product'}
                />
                <Select
                  isLoading={isFetch}
                  isDisabled={isFetch}
                  options={productsSelect}
                  onChange={(value) => onProductSelectChange(value, index)}
                  className="basic-single h-full"
                  classNamePrefix="select"
                />
              </div>

              {/* Quantity */}
              <InputMemo
                isLoading={isFetch}
                isDisabled={isFetch}
                labelText={'Quantity'}
                type={'number'}
                name={'qty'}
                placeholder={'Fill product quantity'}
                value={purchaseProduct.qty}
                onChange={(event) => onInputChange(event, index)}
              />

              <div className="flex items-center gap-x-4">
                {/* Buy Price */}
                <InputMemo
                  isLoading={isFetch}
                  isDisabled={isFetch}
                  labelText={'Buy Price'}
                  type={'number'}
                  name={'buy_price'}
                  placeholder={'Fill product buy price'}
                  containerClassName="flex-1"
                  value={purchaseProduct.buy_price}
                  onChange={(event) => onInputChange(event, index)}
                />
                <AiFillDelete
                  onClick={() => onDeletePurchaseProductClick(index)}
                  size={20}
                  className="text-red-500 cursor-pointer hover:text-red-600"
                />
              </div>
            </div>
          ))}
          {AddPurchaseProductButton}
        </div>
      )}
    </div>
  );
};

const AddPurchaseProductMemo = React.memo(AddPurchaseProduct);

export default AddPurchaseProductMemo;
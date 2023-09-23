import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import AxiosClient from '../../../libs/axios-client';
import SweetAlert from '../../../libs/sweet-alert';
import useApiIndicator from '../../../hooks/api-indicator';
import { AddPurchaseError } from '../../../api/contracts/add-purchase/add-purchase.error';
import { IPurchaseProduct } from '../../../interfaces/purchase.interface';

import InputMemo from '../../../components/input/Input';
import InputTextAreaMemo from '../../../components/input-text-area/InputTextArea';
import UploadImageMemo from '../../../components/upload-image/UploadImage';
import ButtonMemo from '../../../components/button/Button';
import AddPurchaseProductMemo from './components/add-purchase-product/AddPurchaseProduct';

export interface AddPurchaseDataProps {
  purchase_date_time?: Date;
  supplier_name?: string;
  purchase_note?: string;
  purchase_invoice_image_path?: string;
  purchase_invoice_image_preview?: File;
  products?: IPurchaseProduct[];
}

const AddPurchase: React.FC = () => {
  const navigate = useNavigate();
  const { isSubmit, setIsSubmit } = useApiIndicator();

  const [addPurchaseData, setAddPurchaseData] = useState<AddPurchaseDataProps>({
    supplier_name: '',
    purchase_note: '',
    purchase_invoice_image_path: '',
    products: []
  });
  const [addPurchaseErrors, setAddPurchaseErrors] = useState<AddPurchaseError | undefined>(undefined);

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAddPurchaseData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }, []);

  const onInputAreaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddPurchaseData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }, []);

  const onPurchaseDateTimePickerChange = useCallback((value: Date | null) => {
    if (!value) return;
    setAddPurchaseData(prevState => ({
      ...prevState,
      purchase_date_time: value
    }));
  }, []);

  const onUploadImage = useCallback((image: File) => {
    setAddPurchaseData(prevState => ({
      ...prevState,
      purchase_invoice_image_preview: image
    }))
  }, []);

  const onSubmitPurchase = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmit(true);
      console.log('payload', addPurchaseData);
    } catch (error: any) {
      const errors = error as AxiosError<{ message: string, errors: any }>;
    } finally {
      setIsSubmit(false);
    }
  }, [addPurchaseData]);

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
          New Purchase
        </span>
      </div>
      <form
        onSubmit={onSubmitPurchase}
        className="flex flex-col gap-y-6 bg-white rounded-md w-full p-6"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Purchase Date Time */}
          <div className="flex flex-col gap-y-2">
            <label className="text-lg text-gray-600 font-semibold">
              Purchase At
            </label>
            <DateTimePicker
              disabled={isSubmit}
              clearIcon={null}
              calendarIcon={null}
              value={addPurchaseData.purchase_date_time}
              onChange={onPurchaseDateTimePickerChange}
              className="w-fit"
            />
          </div>

          {/* Supplier Name */}
          <InputMemo
            labelText={'Supplier'}
            type={'text'}
            name='supplier_name'
            placeholder={'Fill supplier name'}
            value={addPurchaseData.supplier_name}
            error={addPurchaseErrors?.supplier_name}
            onChange={onInputChange}
          />

          {/* Purchase Note */}
          <InputTextAreaMemo
            labelText={'Note'}
            name='supplier_name'
            placeholder={'Fill supplier name'}
            value={addPurchaseData.supplier_name}
            error={addPurchaseErrors?.supplier_name}
            onChange={onInputAreaChange}
          />

          {/* Purchase Invoice Image */}
          <UploadImageMemo
            isLoading={isSubmit}
            labelText={'Purchase Invoice Image'}
            placeholder={'Please upload your purchase invoice image'}
            value={addPurchaseData?.purchase_invoice_image_path}
            error={addPurchaseErrors?.purchase_invoice_image_path}
            onUploadImageCallback={onUploadImage}
          />
        </div>

        {/* Products */}
        <div className="flex flex-col gap-y-2">
          <label className="text-lg text-gray-600 font-semibold">
            Products
          </label>
          <AddPurchaseProductMemo
            setAddPurchaseData={setAddPurchaseData}
          />
        </div>

        <ButtonMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          type={'submit'}
          label={'Save'}
          className="ml-auto"
        />
      </form>
    </div>
  );
};

export default AddPurchase;

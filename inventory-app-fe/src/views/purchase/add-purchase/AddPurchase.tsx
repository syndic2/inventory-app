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
import { BaseResponse } from '../../../api/commons/base-response';
import { AddPurchaseBody } from '../../../api/contracts/add-purchase/add-purchase.body';
import { AddPurchaseError, AddPurchaseProductsErrors } from '../../../api/contracts/add-purchase/add-purchase.error';
import { IPurchaseProduct } from '../../../interfaces/purchase.interface';

import ErrorLabelMemo from '../../../components/error-label/ErrorLabel';
import InputMemo from '../../../components/input/Input';
import InputTextAreaMemo from '../../../components/input-text-area/InputTextArea';
import UploadImageMemo from '../../../components/upload-image/UploadImage';
import ButtonMemo from '../../../components/button/Button';
import AddPurchaseProductMemo from './components/add-purchase-product/AddPurchaseProduct';

export interface AddPurchaseDataProps {
	purchase_date_time?: Date | string;
	supplier_name?: string;
	purchase_note?: string;
	purchase_invoice_image?: File;
	purchase_invoice_image_preview_path?: string;
	products?: IPurchaseProduct[];
}

const AddPurchase: React.FC = () => {
	const navigate = useNavigate();
	const { isSubmit, setIsSubmit } = useApiIndicator();

	const [addPurchaseData, setAddPurchaseData] = useState<AddPurchaseDataProps>({
		purchase_date_time: '',
		supplier_name: '',
		purchase_note: '',
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
			purchase_invoice_image: image
		}))
	}, []);

	const onSubmitPurchase = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setIsSubmit(true);
			setAddPurchaseErrors(undefined);

			const payload: AddPurchaseBody = {
				purchase_date_time: addPurchaseData.purchase_date_time?.toString(),
				supplier_name: addPurchaseData.supplier_name,
				purchase_note: addPurchaseData.purchase_note,
				purchase_invoice_image: addPurchaseData.purchase_invoice_image,
				products: addPurchaseData.products
			};
			const { data: { status, message } } = await AxiosClient.post<BaseResponse>('/purchases', payload, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			if (status) {
				SweetAlert.fire({
					icon: 'success',
					text: message || ''
				});
				setAddPurchaseData({
					purchase_date_time: '',
					supplier_name: '',
					purchase_note: '',
					products: []
				});
			}
		} catch (error: any) {
			const err = error as AxiosError<{ message: string, errors: any }>;
			const { response } = err;

			if (response) {
				const { message, errors } = response.data;

				if (response.status === 422) {
					setAddPurchaseErrors({
						...errors.purchase_date_time && { purchase_date_time: errors.purchase_date_time[0] },
						...errors.supplier_name && { supplier_name: errors.supplier_name[0] },
						...errors.purchase_note && { purchase_note: errors.purchase_note[0] },
						...errors.purchase_invoice_image && { purchase_invoice_image: errors.purchase_invoice_image[0] },
						...errors.products && { products_array: errors.products[0] },
						products: addPurchaseData.products?.map((_, index): AddPurchaseProductsErrors => {
							return {
								...errors[`products.${index}.product_id`] && { product_id: errors[`products.${index}.product_id`][0] },
								...errors[`products.${index}.qty`] && { qty: errors[`products.${index}.qty`][0] },
								...errors[`products.${index}.buy_price`] && { buy_price: errors[`products.${index}.buy_price`][0] }
							};
						})
					});
				}
				if (response.status === 404) {
					setAddPurchaseErrors({
						products: addPurchaseData.products?.map((_, index): AddPurchaseProductsErrors => {
							return {
								...errors[`products.${index}.product_id`] && { product_id: errors[`products.${index}.product_id`][0] }
							};
						})
					});
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
						{addPurchaseErrors?.purchase_date_time ? (
							<ErrorLabelMemo
								error={addPurchaseErrors.purchase_date_time}
							/>
						) : null}
					</div>

					{/* Supplier Name */}
					<InputMemo
						isLoading={isSubmit}
						isDisabled={isSubmit}
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
						isLoading={isSubmit}
						isDisabled={isSubmit}
						labelText={'Note'}
						name='purchase_note'
						placeholder={'Fill supplier name'}
						value={addPurchaseData.purchase_note}
						error={addPurchaseErrors?.purchase_note}
						onChange={onInputAreaChange}
					/>

					{/* Purchase Invoice Image */}
					<UploadImageMemo
						isLoading={isSubmit}
						labelText={'Purchase Invoice Image'}
						placeholder={'Please upload your purchase invoice image'}
						value={addPurchaseData?.purchase_invoice_image_preview_path}
						error={addPurchaseErrors?.purchase_invoice_image}
						onUploadImageCallback={onUploadImage}
					/>
				</div>

				{/* Products */}
				<div className="flex flex-col gap-y-2">
					<label className="text-lg text-gray-600 font-semibold">
						Products
					</label>
					<AddPurchaseProductMemo
						isSubmit={isSubmit}
						setAddPurchaseData={setAddPurchaseData}
						errors={addPurchaseErrors?.products}
					/>
					<ErrorLabelMemo
						error={addPurchaseErrors?.products_array}
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

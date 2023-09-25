<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InsertPurchaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'purchase_date_time' => 'string|required',
            'purchase_note' => 'string|sometimes|nullable',
            'purchase_invoice_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2096',
            'supplier_name' => 'string|required',
            'products' => 'required|array',
            'products.*.product_id' => 'string|required|distinct',
            'products.*.qty' => 'numeric|required|min:1',
            'products.*.buy_price' => 'numeric|required|min:1'
        ];
    }

    public function attributes(): array
    {
        return [
            'purchase_date_time' => 'purchase date and time',
            'purchase_note' => 'purchase note',
            'purchase_invoice_image' => 'purchase invoice image',
            'supplier_name' => 'supplier name',
            'products' => 'products',
            'products.*.product_id' => 'product',
            'products.*.qty' => 'quantity',
            'products.*.buy_price' => 'buy price'
        ];
    }
}

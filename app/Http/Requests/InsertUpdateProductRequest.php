<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InsertUpdateProductRequest extends FormRequest
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
            'product_name' => 'required',
            'product_sku' => 'required',
            'product_desc' => 'sometimes|nullable',
            'product_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2096',
            'qty' => 'required|numeric',
            'sell_price' => 'required|numeric'
        ];
    }
}

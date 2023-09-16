<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InsertUpdateProductRequest;

class ProductController extends Controller
{
    public function insertProduct(InsertUpdateProductRequest $request)
    {
        $data = $request->validated();

        return response([
            'status' => true,
            'message' => 'Product has been saved successfully',
            'data' => null
        ]);
    }
}

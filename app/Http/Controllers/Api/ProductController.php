<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Str;
use Exception;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Helper\CloudinaryStorage;
use App\Http\Requests\InsertUpdateProductRequest;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return response([
            'status' => true,
            'message' => null,
            'data' => Product::paginate(10)
        ]);
    }

    public function insert(InsertUpdateProductRequest $request)
    {
        try {
            $data = $request->validated();

            $product = new Product;
            $product->product_id =  Str::uuid()->toString();
            $product->product_name = $data['product_name'];
            $product->product_sku = $data['product_sku'];
            $product->product_desc = $data['product_desc'];
            $product->qty = $data['qty'];
            $product->buy_price = 0;
            $product->sell_price = $data['sell_price'];
            $product->save();

            $productImage  = $request->file('product_image');
            $productImagePath = CloudinaryStorage::upload($productImage->getRealPath(), $productImage->getClientOriginalName());

            $lastInsertedProduct = Product::findOrFail($product->product_id);
            $lastInsertedProduct->product_image_path =  $productImagePath;
            $lastInsertedProduct->save();
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }

        return response([
            'status' => true,
            'message' => 'Product has been saved successfully',
            'data' => null
        ]);
    }

    public function delete($productId)
    {
        try {
            $product = Product::findOrFail($productId);
            $product->delete();
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null
            ]);
        }

        return response([
            'status' => true,
            'message' => 'Product has been deleted successfully',
            'data' => null
        ]);
    }
}

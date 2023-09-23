<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
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
        try {
            $result = Product::orderBy('product_name', 'asc')->paginate(10);
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }

        return response([
            'status' => true,
            'message' => null,
            'data' => $result
        ]);
    }

    public function select()
    {
        try {
            $products = Product::orderBy('product_name', 'asc')->get();
            $products = $products->map(function ($product) {
                return [
                    'label' => $product->product_name,
                    'value' => $product->product_id
                ];
            });
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }

        return response([
            'status' => true,
            'message' => null,
            'data' => $products
        ]);
    }

    public function detail($id)
    {
        try {
            $product = Product::findOrFail($id);
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }

        return response([
            'status' => true,
            'message' => null,
            'data' => $product
        ]);
    }

    private function insertOrUpdate(InsertUpdateProductRequest $request, $productId = null)
    {
        try {
            $data = $request->validated();
            $user = Auth::user();

            $product = is_null($productId) ? new Product : Product::findOrFail($productId);
            if (is_null($productId)) {
                $product->product_id =  Str::uuid()->toString();
                $product->buy_price = 0;
            }
            $product->product_name = $data['product_name'];
            $product->product_sku = $data['product_sku'];
            $product->product_desc = $data['product_desc'];
            $product->qty = $data['qty'];
            $product->sell_price = $data['sell_price'];
            $product->created_by = is_null($productId) ? $user->user_id : $product->created_by;
            $product->updated_by = $user->user_id;
            $product->save();

            if ($request->hasFile('product_image')) {
                $productImage  = $request->file('product_image');
                $productImagePath = is_null($productId) ?
                    CloudinaryStorage::upload($productImage->getRealPath(), $productImage->getClientOriginalName()) :
                    CloudinaryStorage::replace($product->image, $productImage->getRealPath(), $productImage->getClientOriginalName());;
                $lastInsertedProduct = Product::findOrFail($product->product_id);
                $lastInsertedProduct->product_image_path =  $productImagePath;
                $lastInsertedProduct->save();
            }
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

    public function insert(InsertUpdateProductRequest $request)
    {
        $insertOrUpdateResult = $this->insertOrUpdate($request);
        return $insertOrUpdateResult;
    }

    public function update(InsertUpdateProductRequest $request, $productId)
    {
        $insertOrUpdateResult = $this->insertOrUpdate($request, $productId);
        return $insertOrUpdateResult;
    }

    public function delete($productId)
    {
        try {
            $user = Auth::user();
            $product = Product::findOrFail($productId);
            $product->deleted_by = $user->user_id;
            $product->delete();

            if (!is_null($product->image)) CloudinaryStorage::delete($product->image);
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

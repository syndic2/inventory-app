<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseProduct;
use App\Http\Controllers\Controller;
use App\Http\Requests\InsertPurchaseRequest;
use App\Http\Controllers\Helper\CloudinaryStorage;

class PurchaseController extends Controller
{
    public function index()
    {
        try {
            $result = Purchase::orderBy('purchase_date_time', 'asc')->paginate(10);
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

    public function detail($purchaseId)
    {
        try {
            $purchase = Purchase::with('products')->findOrFail($purchaseId);
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
            'data' => $purchase
        ]);
    }

    public function insert(InsertPurchaseRequest $request)
    {
        try {
            DB::beginTransaction();

            $user = Auth::user();
            $data = $request->validated();

            $purchaseId = Str::uuid()->toString();
            $purchaseProducts = [];
            foreach ($data['products'] as $key => $product) {
                $isProductExist = Product::find($product['product_id']);
                if (!$isProductExist) return response([
                    'status' => false,
                    'message' => 'Product not found',
                    'data' => null,
                    'errors' => [
                        "products.{$key}.product_id" => ['Product not found']
                    ]
                ], 404);

                $purchaseProducts[] = [
                    'purchase_product_id' => Str::uuid()->toString(),
                    'purchase_id' => $purchaseId,
                    'product_id' => $isProductExist->product_id,
                    'product_name' => $isProductExist->product_name,
                    'product_sku' => $isProductExist->product_sku,
                    'product_image_path' => $isProductExist->product_image_path,
                    'qty' => $product['qty'],
                    'buy_price' => $product['buy_price'],
                    'total' => $product['qty'] * $product['buy_price'],
                    'created_by' => $user->user_id,
                    'updated_by' => $user->user_id
                ];
            }

            $purchase = new Purchase;
            $purchase->purchase_id = $purchaseId;
            $purchase->purchase_date_time = Carbon::createFromTimestamp($data['purchase_date_time']);
            $purchase->purchase_note = $data['purchase_note'] ? $data['purchase_note'] : null;
            $purchase->supplier_name = $data['supplier_name'];
            $purchase->total_product = count($data['products']);
            $purchase->total_qty = array_sum(array_column($data['products'], 'qty'));

            $grandTotal = 0;

            foreach ($purchaseProducts as $key => $purchaseProduct) {
                $grandTotal += $purchaseProduct['total'];
            }

            $purchase->grand_total = $grandTotal;
            $purchase->created_by = $user->user_id;
            $purchase->updated_by = $user->user_id;
            $purchase->save();

            PurchaseProduct::insert($purchaseProducts);

            $purchaseInvoiceImage  = $request->file('purchase_invoice_image');
            $purchaseInvoiceImagePath = CloudinaryStorage::upload($purchaseInvoiceImage->getRealPath(), $purchaseInvoiceImage->getClientOriginalName());
            $lastInsertedPurchase = Purchase::findOrFail($purchase->purchase_id);
            $lastInsertedPurchase->purchase_invoice_image_path =  $purchaseInvoiceImagePath;
            $lastInsertedPurchase->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }

        return response([
            'status' => true,
            'message' => 'Purchase has been saved successfully',
            'data' => null
        ]);
    }
}

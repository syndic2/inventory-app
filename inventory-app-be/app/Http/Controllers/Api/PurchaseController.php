<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use App\Models\Purchase;

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
}
